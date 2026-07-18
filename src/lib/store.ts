import type { SiteContent } from '../data/content'
import { CONTENT_VERSION } from '../data/content'

// Talks to the ONREZA content function (/api/content).
// The GitHub token lives server-side in the function — never here.

const API = '/api/content'

function isValidRemote(data: unknown): data is SiteContent {
  if (!data || typeof data !== 'object') return false
  const c = data as Record<string, unknown>
  if (c.version !== CONTENT_VERSION) return false
  return !!(
    c.company && c.hero && c.services && c.about && c.portfolio && c.contact &&
    c.promo && c.production && c.keyAdvantages && c.guarantees &&
    c.fiveAdvantages && c.pricing && c.faq
  )
}

// Read content from GitHub via the server function. Returns null when the
// function is unavailable (e.g. local dev) or the stored data is stale.
export async function fetchRemoteContent(): Promise<SiteContent | null> {
  try {
    const res = await fetch(API, { headers: { accept: 'application/json' } })
    if (!res.ok) return null
    const data = await res.json()
    return isValidRemote(data) ? (data as SiteContent) : null
  } catch {
    return null
  }
}

// Save content: the function commits it to GitHub. `password` authorizes the write.
export async function saveRemoteContent(content: SiteContent, password: string): Promise<boolean> {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify(content),
    })
    if (!res.ok) return false
    // Require a real JSON { ok: true } from the function — guards against the
    // SPA fallback rewriting POST /api/content to index.html and returning 200.
    const data = await res.json().catch(() => null)
    return !!(data && typeof data === 'object' && (data as { ok?: boolean }).ok === true)
  } catch {
    return false
  }
}
