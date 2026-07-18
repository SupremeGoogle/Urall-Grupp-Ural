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
  console.groupCollapsed('[save] POST /api/content')
  try {
    if (!password) console.warn('[save] пароль пустой — заголовок x-admin-password не будет валиден')
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify(content),
    })
    const ct = res.headers.get('content-type') || ''
    console.log('[save] статус:', res.status, '| content-type:', ct)

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error('[save] ❌ сервер ответил ошибкой', res.status, body.slice(0, 300))
      if (res.status === 401) console.error('[save] причина: неверный пароль (x-admin-password ≠ ADMIN_PASSWORD на сервере)')
      if (res.status === 500) console.error('[save] причина: на сервере не заданы переменные (GH_TOKEN/GH_REPO/ADMIN_PASSWORD)')
      return false
    }

    // The function must answer with JSON { ok: true }. If we instead got HTML,
    // the request was rewritten to index.html — i.e. the backend function is NOT deployed.
    if (!ct.includes('application/json')) {
      const preview = (await res.text().catch(() => '')).slice(0, 120)
      console.error('[save] ❌ бэкенд НЕ развёрнут: /api/content вернул не JSON, а', ct || '(пусто)')
      console.error('[save] это SPA-заглушка (index.html), значит функция ONREZA не работает на этом проекте')
      console.error('[save] ответ начинается с:', preview)
      return false
    }

    const data = await res.json().catch((e) => { console.error('[save] не удалось разобрать JSON:', e); return null })
    const ok = !!(data && typeof data === 'object' && (data as { ok?: boolean }).ok === true)
    console.log(ok ? '[save] ✅ сохранено на сервере' : '[save] ❌ сервер не подтвердил ok:true', data)
    return ok
  } catch (e) {
    console.error('[save] ❌ сеть/исключение:', e)
    return false
  } finally {
    console.groupEnd()
  }
}
