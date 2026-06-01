# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Corporate website for **Urall-Grupp Ural** (Krasnodar) — screw-pile foundation production/installation and wooden house kits.
VK: [vk.ru/ural_grupp_krd](https://vk.ru/ural_grupp_krd)

---

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at localhost:3000 (auto-opens browser)
npm run build        # tsc type-check + vite production build → dist/
npm run preview      # serve the dist/ build locally
npm run lint         # ESLint for .ts/.tsx files
```

---

## Stack

- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS v3** — all styling via utility classes; brand tokens in `tailwind.config.js`
- **GSAP 3** — scroll/entrance animations
- **lucide-react** — icons
- **react-router-dom v6** — two routes: `/` (main site) and `/admin` (admin panel)
- **Fonts**: Inter + Barlow loaded from Google Fonts in `index.html`

---

## Architecture

### Content system (`src/data/content.ts`)

Single source of truth for all site text. `defaultContent` holds the hardcoded defaults. `getContent()` reads from `localStorage` (key `urall_content`); `saveContent()` writes to it. `App.tsx` listens to the `storage` event so the main site reflects admin changes without a page reload.

### Main site (`/`)

`App.tsx → MainSite` passes a single `content: SiteContent` prop down to every section component. Sections are rendered in order: `Header → Hero → Services → Stats → About → Portfolio → ContactForm → Footer`.

### Admin panel (`/admin`, `src/admin/AdminPanel.tsx`)

Password-protected (password from `VITE_ADMIN_PASSWORD` env var, falls back to `ural2026`). Session persists in `sessionStorage`. All edits update `localStorage` via `saveContent()`. No backend — entirely client-side persistence.

### Portfolio images

Served from `public/works/` (e.g. `/works/work1.jpg`) or as external direct-link URLs. The admin UI supports both.

---

## Brand tokens (`tailwind.config.js`)

```js
colors: {
  brand: {
    orange: '#f97316',  // primary accent
    dark:   '#0a0a0a',  // page background
    card:   '#111111',  // card/surface background
  }
}
```

The `.liquid-glass` utility class (defined in `src/index.css`) is used throughout for frosted-glass card surfaces.

---

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_ADMIN_PASSWORD` | Admin panel login password |
| `VITE_SHEETS_URL` | Google Sheets URL for viewing contact form submissions |

Copy `.env.example` to `.env` and fill in values.

---

## Deploy

Vercel. `vercel.json` rewrites all routes to `/index.html` for SPA routing.
