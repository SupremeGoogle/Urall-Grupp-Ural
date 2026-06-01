import type { SiteContent } from '../data/content'

const URL = import.meta.env.VITE_SUPABASE_URL as string
const KEY = import.meta.env.VITE_SUPABASE_KEY as string

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
    if (!content || Object.keys(content).length === 0) return null
    return content as SiteContent
  } catch {
    return null
  }
}

export async function persistSiteContent(content: SiteContent): Promise<boolean> {
  if (!URL || !KEY) return false
  try {
    const res = await fetch(
      `${URL}/rest/v1/site_content?id=eq.1`,
      {
        method: 'PATCH',
        headers: { ...headers(), 'Prefer': 'return=minimal' },
        body: JSON.stringify({ content }),
      }
    )
    return res.ok
  } catch {
    return false
  }
}
