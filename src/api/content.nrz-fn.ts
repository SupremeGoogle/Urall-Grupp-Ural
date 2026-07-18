// ONREZA Function — content storage backed by GitHub.
// GET  /api/content         → returns the site content JSON (read from GitHub server-side)
// POST /api/content         → commits new content JSON to GitHub (admin only)
//
// The GitHub token lives ONLY in this server-side function's env (ctx.env),
// never in the browser bundle. Configure these project env vars in ONREZA:
//   GH_TOKEN       — GitHub Personal Access Token (Contents: read+write on the repo)
//   GH_REPO        — "owner/repo", e.g. "SupremeGoogle/Urall-Grupp-Ural"
//   GH_BRANCH      — branch to store content in, e.g. "content-data"
//   GH_PATH        — file path, e.g. "site-content.json"
//   ADMIN_PASSWORD — password the admin panel must send to authorize saves

export const config = { name: "content" } as const;

interface FnContext {
  env: Record<string, string | undefined>;
  log: { info: (m: string, d?: unknown) => Promise<void> | void; error: (m: string, d?: unknown) => Promise<void> | void };
  invocation: { id: string; workspaceId?: string };
}

const GH_API = "https://api.github.com";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

// UTF-8 safe base64 (handles Cyrillic) without relying on Buffer
function b64encode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
function b64decode(b64: string): string {
  const bin = atob(b64.replace(/\s/g, ""));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function ghHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "onreza-content-fn",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function getFile(repo: string, path: string, branch: string, token: string) {
  const url = `${GH_API}/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: ghHeaders(token) });
  if (res.status === 404) return { exists: false as const };
  if (!res.ok) throw new Error(`GitHub GET ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { content: string; sha: string };
  return { exists: true as const, sha: data.sha, text: b64decode(data.content) };
}

export default {
  async fetch(request: Request, ctx: FnContext): Promise<Response> {
    const { GH_TOKEN, GH_REPO, GH_BRANCH, GH_PATH, ADMIN_PASSWORD } = ctx.env;
    const branch = GH_BRANCH || "content-data";
    const path = GH_PATH || "site-content.json";

    if (!GH_TOKEN || !GH_REPO) {
      return jsonResponse({ error: "not_configured", detail: "GH_TOKEN/GH_REPO env vars are missing" }, 500);
    }

    try {
      // ── READ ──────────────────────────────────────────────
      if (request.method === "GET") {
        const file = await getFile(GH_REPO, path, branch, GH_TOKEN);
        if (!file.exists) return jsonResponse(null, 404); // no content yet → client uses defaults
        return new Response(file.text, {
          status: 200,
          headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
        });
      }

      // ── WRITE ─────────────────────────────────────────────
      if (request.method === "POST") {
        if (!ADMIN_PASSWORD) return jsonResponse({ error: "not_configured", detail: "ADMIN_PASSWORD env var is missing" }, 500);
        const given = request.headers.get("x-admin-password") || "";
        if (given !== ADMIN_PASSWORD) return jsonResponse({ error: "unauthorized" }, 401);

        const bodyText = await request.text();
        try { JSON.parse(bodyText); } catch { return jsonResponse({ error: "invalid_json" }, 400); }

        const existing = await getFile(GH_REPO, path, branch, GH_TOKEN);
        const putBody: Record<string, unknown> = {
          message: `Update site content (${new Date().toISOString()})`,
          content: b64encode(bodyText),
          branch,
        };
        if (existing.exists) putBody.sha = existing.sha;

        const putRes = await fetch(`${GH_API}/repos/${GH_REPO}/contents/${path}`, {
          method: "PUT",
          headers: { ...ghHeaders(GH_TOKEN), "content-type": "application/json" },
          body: JSON.stringify(putBody),
        });
        if (!putRes.ok) {
          const detail = await putRes.text();
          await ctx.log.error("github_put_failed", { status: putRes.status, detail });
          return jsonResponse({ error: "github_put_failed", status: putRes.status }, 502);
        }
        return jsonResponse({ ok: true });
      }

      return jsonResponse({ error: "method_not_allowed" }, 405);
    } catch (e) {
      await ctx.log.error("content_fn_error", { message: String(e) });
      return jsonResponse({ error: "server_error", detail: String(e) }, 500);
    }
  },
};
