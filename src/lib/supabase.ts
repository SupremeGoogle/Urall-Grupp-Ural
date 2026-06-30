import type { SiteContent } from '../data/content'

const URL = import.meta.env.VITE_SUPABASE_URL as string
const KEY = import.meta.env.VITE_SUPABASE_KEY as string

export function isConfigured() {
  return Boolean(URL && KEY)
}

function headers() {
  return {
    'apikey': KEY,
    'Authorization': `Bearer ${KEY}`,
    'Content-Type': 'application/json',
  }
}

export async function fetchSiteContent(): Promise<SiteContent | null> {
  if (!URL || !KEY) return null
  try {
    const res = await fetch(
      `${URL}/rest/v1/site_content?id=eq.1&select=content`,
      { headers: headers() }
    )
    if (!res.ok) return null
    const data = await res.json()
    const content = data[0]?.content
    if (!content || typeof content !== 'object') return null
    // Validate required fields — reject stale/incompatible structures.
    // v2 adds promo/production/keyAdvantages/guarantees/fiveAdvantages/pricing/faq:
    // an old (v1) row lacking these must be rejected so defaultContent re-seeds
    // the new structure instead of crashing the new sections.
    const c = content as Record<string, unknown>
    if (!c.company || !c.hero || !c.portfolio || !c.contact) return null
    if (!c.promo || !c.production || !c.keyAdvantages || !c.guarantees ||
        !c.fiveAdvantages || !c.pricing || !c.faq) return null
    return content as SiteContent
  } catch {
    return null
  }
}

export async function persistSiteContent(content: SiteContent): Promise<boolean> {
  if (!URL || !KEY) return false
  try {
    // UPSERT: insert row if not exists, update if exists
    const res = await fetch(
      `${URL}/rest/v1/site_content`,
      {
        method: 'POST',
        headers: {
          ...headers(),
          'Prefer': 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify({ id: 1, content }),
      }
    )
    return res.ok
  } catch {
    return false
  }
}
