# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Corporate single-page website for **Urall-Grupp Ural** (Krasnodar) — production/installation of screw-pile foundations and wooden house kits.
VK: [vk.ru/ural_grupp_krd](https://vk.ru/ural_grupp_krd)

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at localhost:3000 (auto-opens browser)
npm run build        # tsc type-check + vite production build → dist/
npm run preview      # serve the dist/ build locally
npm run lint         # ESLint for .ts/.tsx files
```

There is no test suite.

## Stack

- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS v3** — all styling via utility classes; brand tokens in `tailwind.config.js`
- **GSAP 3** + **motion** (Framer Motion) — scroll/entrance animations
- **react-router-dom v6** — three routes: `/` (main site), `/admin` (admin panel), `/privacy`
- **lucide-react** — icons
- **Fonts**: Inter + Barlow loaded from Google Fonts in `index.html`

## Architecture

### Content system (`src/data/content.ts` + `src/lib/supabase.ts`)

All site text lives in a single `SiteContent` object. **Supabase is the source of truth; localStorage is a cache.**

- `defaultContent` — hardcoded fallback used to seed an empty Supabase and as the offline default.
- `getCachedContent()` — **synchronous** read from localStorage (key `urall_content`) for the initial render with no flash. Validates the shape and clears stale/incompatible data.
- `loadContent()` — **async**: fetches the row from Supabase, caches it to localStorage, returns it. If Supabase is empty/unreachable, it seeds Supabase with `defaultContent` and returns the default.
- `saveContent()` — writes to localStorage immediately, then upserts to Supabase. If Supabase env vars are absent, the localStorage-only save still counts as success (so the admin works without a backend configured).

Supabase storage is a single-row table `site_content` (`id = 1`, JSONB `content` column), accessed directly via the PostgREST REST API in `src/lib/supabase.ts` (no Supabase client library). Writes use `Prefer: resolution=merge-duplicates` for UPSERT. Reads reject rows missing required top-level keys (`company`, `hero`, `portfolio`, `contact`) to guard against stale schemas.

`MainSite` in `App.tsx` renders from `getCachedContent()` first, then calls `loadContent()` and re-renders. It also listens to the `storage` event so admin edits in another tab propagate live.

### Main site (`/`)

`App.tsx → MainSite` passes one `content: SiteContent` prop to every section. Sections render in order: `Header → Hero → Services → Stats → About → Portfolio → ContactForm → Footer`. The whole tree is wrapped in `ErrorBoundary` (added to diagnose blank-screen crashes — keep it).

`Portfolio` uses `src/components/ui/ZoomParallax.tsx`, a scroll-driven zoom effect (motion library) over the portfolio images, plus a lightbox.

### Admin panel (`/admin`, `src/admin/AdminPanel.tsx`)

Password-protected (password from `VITE_ADMIN_PASSWORD`, falls back to `ural2026`). Session persists in `sessionStorage`. All edits call `saveContent()`. No server-side auth — it is entirely client-side.

### Contact form

`src/components/ContactForm.tsx` POSTs submissions to `VITE_SHEETS_URL` (a Google Apps Script web app that appends to a Google Sheet). The admin links to `VITE_SHEETS_VIEW_URL` to view the sheet.

### Portfolio images

Served from `public/works/` (e.g. `/works/work1.jpg`) or external direct-link URLs. The admin UI accepts both.

## Brand tokens (`tailwind.config.js`)

```js
colors: { brand: {
  orange: '#f97316',  // primary accent
  dark:   '#0a0a0a',  // page background
  card:   '#111111',  // card/surface background
}}
```

The `.liquid-glass` utility (defined in `src/index.css`) provides the frosted-glass card surfaces used throughout.

## Environment variables

Copy `.env.example` to `.env` and fill in values.

| Variable | Purpose |
|---|---|
| `VITE_ADMIN_PASSWORD` | Admin panel login password (default `ural2026`) |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_KEY` | Supabase project URL + publishable key for content sync |
| `VITE_SHEETS_URL` | Google Apps Script endpoint the contact form POSTs to |
| `VITE_SHEETS_VIEW_URL` | Google Sheet URL the admin links to for viewing submissions |

## Deploy

Hosted on Vercel. `.github/workflows/deploy.yml` runs `npm ci && npm run build` and deploys to Vercel (`--prod`) on every push to `main` (and builds on PRs). `vercel.json` rewrites all routes to `/index.html` for SPA routing.

## Web development practices

`.agents/skills/modern-web-guidance/` is a project skill: consult it before implementing HTML/CSS/client-side JS features (modals, scroll/motion effects, glassmorphism, forms, CWV/perf) to avoid obsolete patterns.
