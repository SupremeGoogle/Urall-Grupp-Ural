import type { SiteContent } from '../data/content'
import { CONTENT_VERSION } from '../data/content'

// Live content storage via Supabase (PostgREST). The publishable ("anon") key
// is safe to ship in the browser — access is limited by row-level security.
// Configure in ONREZA env vars:
//   VITE_SUPABASE_URL — https://<project>.supabase.co
//   VITE_SUPABASE_KEY — the publishable/anon key
const URL = import.meta.env.VITE_SUPABASE_URL as string
const KEY = import.meta.env.VITE_SUPABASE_KEY as string

export function isConfigured(): boolean {
  return Boolean(URL && KEY)
}

function headers() {
  return {
    apikey: KEY,
    Authorization: `Bearer ${KEY}`,
    'Content-Type': 'application/json',
  }
}

function isValid(content: unknown): content is SiteContent {
  if (!content || typeof content !== 'object') return false
  const c = content as Record<string, unknown>
  if (c.version !== CONTENT_VERSION) return false
  return !!(
    c.company && c.hero && c.services && c.about && c.portfolio && c.contact &&
    c.promo && c.production && c.keyAdvantages && c.guarantees &&
    c.fiveAdvantages && c.pricing && c.faq
  )
}

// Read the single content row (id = 1). Returns null if empty/stale/unreachable.
export async function fetchSiteContent(): Promise<SiteContent | null> {
  if (!isConfigured()) return null
  try {
    const res = await fetch(`${URL}/rest/v1/site_content?id=eq.1&select=content`, { headers: headers() })
    if (!res.ok) {
      console.error('[supabase] чтение не удалось:', res.status, await res.text().catch(() => ''))
      return null
    }
    const rows = await res.json()
    const content = rows?.[0]?.content
    return isValid(content) ? (content as SiteContent) : null
  } catch (e) {
    console.error('[supabase] чтение — сеть/исключение:', e)
    return null
  }
}

// Upsert the single content row (id = 1).
export async function persistSiteContent(content: SiteContent): Promise<boolean> {
  if (!isConfigured()) return false
  try {
    const res = await fetch(`${URL}/rest/v1/site_content`, {
      method: 'POST',
      headers: { ...headers(), Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ id: 1, content }),
    })
    if (!res.ok) console.error('[supabase] запись не удалась:', res.status, await res.text().catch(() => ''))
    return res.ok
  } catch (e) {
    console.error('[supabase] запись — сеть/исключение:', e)
    return false
  }
}
