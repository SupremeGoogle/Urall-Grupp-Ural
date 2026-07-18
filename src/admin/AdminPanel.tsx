import { useState, useEffect, useRef } from 'react'
import { LogOut, Save, Eye, RefreshCw, Check, ClipboardList, Trash2, Plus, GripVertical, Upload } from 'lucide-react'
import { defaultContent, getCachedContent, loadContent, saveContent } from '../data/content'
import type { SiteContent } from '../data/content'
import { ICON_NAMES } from '../components/ui/Icon'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'ural2026'

/* Read an image file from the device, downscale it on a canvas and return a
   compressed JPEG data URL — keeps the JSON payload small enough for Supabase. */
function fileToResizedDataUrl(file: File, maxSize = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('read error'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('decode error'))
      img.onload = () => {
        let { width, height } = img
        if (width > maxSize || height > maxSize) {
          const scale = maxSize / Math.max(width, height)
          width = Math.round(width * scale)
          height = Math.round(height * scale)
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('no canvas context'))
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

type TabId =
  | 'company' | 'hero' | 'services' | 'promo' | 'pricing' | 'production'
  | 'keyAdvantages' | 'guarantees' | 'fiveAdvantages' | 'faq'
  | 'stats' | 'about' | 'portfolio' | 'contact'

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [content, setContent] = useState<SiteContent>(getCachedContent())
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('company')

  useEffect(() => {
    const s = sessionStorage.getItem('urall_admin')
    if (s === 'yes') {
      setAuthed(true)
      loadContent().then(setContent)
    }
  }, [])

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('urall_admin', 'yes')
      // Kept only for the current tab session — used to authorize saves to the
      // server function (which checks it against its own ADMIN_PASSWORD env var).
      sessionStorage.setItem('urall_admin_pw', pw)
      setAuthed(true)
      setPwError(false)
      loadContent().then(setContent)
    } else {
      setPwError(true)
      setPw('')
    }
  }

  const logout = () => {
    sessionStorage.removeItem('urall_admin')
    sessionStorage.removeItem('urall_admin_pw')
    setAuthed(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveError(false)
    const ok = await saveContent(content)
    setSaving(false)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } else {
      setSaveError(true)
      setTimeout(() => setSaveError(false), 4000)
    }
  }

  const handleReset = async () => {
    if (confirm('Сбросить к исходным данным? Все правки будут потеряны.')) {
      setContent(defaultContent)
      await saveContent(defaultContent)
    }
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="liquid-glass rounded-2xl p-10 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="Стальное основание" className="w-11 h-11 rounded-lg object-cover" />
            <div>
              <div className="font-inter font-bold text-white text-[15px]">Стальное основание</div>
              <div className="text-white/40 text-[11px]">Панель администратора</div>
            </div>
          </div>

          <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-2">Пароль</label>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setPwError(false) }}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="••••••••"
            autoFocus
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 text-[14px] focus:outline-none mb-4 transition-colors ${
              pwError ? 'border-red-500' : 'border-white/10 focus:border-brand-orange/50'
            }`}
          />
          {pwError && <p className="text-red-400 text-[12px] mb-4">Неверный пароль</p>}

          <button
            onClick={login}
            className="w-full bg-brand-orange hover:bg-orange-400 text-black font-semibold rounded-xl py-3 text-[14px] transition-all hover:scale-[1.02]"
          >
            Войти
          </button>
        </div>
      </div>
    )
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: 'company', label: 'Компания' },
    { id: 'hero', label: 'Главный экран' },
    { id: 'services', label: 'Услуги' },
    { id: 'promo', label: 'Акция' },
    { id: 'pricing', label: 'Цены' },
    { id: 'production', label: 'Производство' },
    { id: 'keyAdvantages', label: 'Преимущества' },
    { id: 'guarantees', label: 'Гарантии' },
    { id: 'fiveAdvantages', label: '5 преимуществ' },
    { id: 'faq', label: 'FAQ' },
    { id: 'stats', label: 'Цифры' },
    { id: 'about', label: 'О нас' },
    { id: 'portfolio', label: 'Работы' },
    { id: 'contact', label: 'Контакты' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-barlow">
      {/* Top bar */}
      <div className="liquid-glass border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Стальное основание" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-inter font-bold text-white text-[15px]">Панель управления</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {import.meta.env.VITE_SHEETS_VIEW_URL ? (
              <a href={import.meta.env.VITE_SHEETS_VIEW_URL}
                 target="_blank" rel="noopener noreferrer"
                 className="liquid-glass rounded-full px-4 py-2 text-[12px] text-white/70 hover:text-white flex items-center gap-2 transition-colors">
                <ClipboardList size={13} /> Заявки (Google Sheets)
              </a>
            ) : null}
            <a href="/" target="_blank"
               className="liquid-glass rounded-full px-4 py-2 text-[12px] text-white/70 hover:text-white flex items-center gap-2 transition-colors">
              <Eye size={13} /> Просмотр сайта
            </a>
            <button onClick={handleReset}
               className="liquid-glass rounded-full px-4 py-2 text-[12px] text-white/70 hover:text-white flex items-center gap-2 transition-colors">
              <RefreshCw size={13} /> Сброс
            </button>
            {saveError && (
              <span className="text-red-400 text-[12px]">Ошибка сохранения</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className={`rounded-full px-5 py-2 text-[12px] font-semibold flex items-center gap-2 transition-all ${
                saved ? 'bg-green-500 text-white'
                : saveError ? 'bg-red-500/80 text-white'
                : saving ? 'bg-white/20 text-white/50 cursor-wait'
                : 'bg-brand-orange hover:bg-orange-400 text-black'
              }`}
            >
              {saving ? <><svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20"/></svg> Сохранение...</>
              : saved ? <><Check size={13} /> Сохранено!</>
              : <><Save size={13} /> Сохранить</>}
            </button>
            <button onClick={logout} className="liquid-glass rounded-full p-2.5 text-white/50 hover:text-white transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Info banner */}
        <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl px-5 py-4 mb-6 text-[13px] text-white/70">
          Изменения сохраняются в браузере и синхронизируются на сайт. Нажмите <strong className="text-white">«Сохранить»</strong> после правок.
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-[12px] font-medium uppercase tracking-wide transition-all ${
                activeTab === tab.id ? 'bg-brand-orange text-black' : 'liquid-glass text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor area */}
        <div className="liquid-glass rounded-2xl p-8">
          {activeTab === 'company'        && <CompanyEditor        content={content} setContent={setContent} />}
          {activeTab === 'hero'           && <HeroEditor           content={content} setContent={setContent} />}
          {activeTab === 'services'       && <ServicesEditor       content={content} setContent={setContent} />}
          {activeTab === 'promo'          && <PromoEditor          content={content} setContent={setContent} />}
          {activeTab === 'pricing'        && <PricingEditor        content={content} setContent={setContent} />}
          {activeTab === 'production'     && <ProductionEditor     content={content} setContent={setContent} />}
          {activeTab === 'keyAdvantages'  && <KeyAdvantagesEditor  content={content} setContent={setContent} />}
          {activeTab === 'guarantees'     && <GuaranteesEditor     content={content} setContent={setContent} />}
          {activeTab === 'fiveAdvantages' && <FiveAdvantagesEditor content={content} setContent={setContent} />}
          {activeTab === 'faq'            && <FaqEditor            content={content} setContent={setContent} />}
          {activeTab === 'stats'          && <StatsEditor          content={content} setContent={setContent} />}
          {activeTab === 'about'          && <AboutEditor          content={content} setContent={setContent} />}
          {activeTab === 'portfolio'      && <PortfolioEditor      content={content} setContent={setContent} />}
          {activeTab === 'contact'        && <ContactEditor        content={content} setContent={setContent} />}
        </div>
      </div>
    </div>
  )
}

/* ── Shared field components ─────────────────────────────────────── */

function Field({ label, value, onChange, multiline = false, hint }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; hint?: string
}) {
  const cls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] focus:outline-none focus:border-brand-orange/50 transition-colors placeholder-white/20"
  return (
    <div>
      <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-1">{label}</label>
      {hint && <p className="text-[11px] text-white/25 mb-2">{hint}</p>}
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} className={cls + ' resize-none'} />
        : <input value={value} onChange={e => onChange(e.target.value)} className={cls} />
      }
    </div>
  )
}

function IconField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-1">{label}</label>
      <p className="text-[11px] text-white/25 mb-2">Выберите иконку из списка</p>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] focus:outline-none focus:border-brand-orange/50 transition-colors appearance-none cursor-pointer"
      >
        {!ICON_NAMES.includes(value) && <option value={value} className="bg-[#111]">{value || '— не выбрано —'}</option>}
        {ICON_NAMES.map(n => <option key={n} value={n} className="bg-[#111]">{n}</option>)}
      </select>
    </div>
  )
}

/* Generic block header with add button */
function BlockHeader({ title, count, onAdd, addLabel }: { title: string; count?: number; onAdd?: () => void; addLabel?: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="font-inter font-bold text-white text-[18px]">{title}</h3>
        {count !== undefined && <p className="text-white/40 text-[12px] mt-1">Всего: {count}</p>}
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-brand-orange hover:bg-orange-400 text-black font-semibold rounded-xl px-5 py-2.5 text-[13px] transition-all hover:scale-[1.02]"
        >
          <Plus size={15} /> {addLabel ?? 'Добавить'}
        </button>
      )}
    </div>
  )
}

function DeleteRowButton({ onClick, label = 'Удалить' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-red-500/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg px-3 py-1.5 text-[12px] transition-colors"
    >
      <Trash2 size={13} /> {label}
    </button>
  )
}

type EditorProps = { content: SiteContent; setContent: (c: SiteContent) => void }

/* ── Company ─────────────────────────────────────────────────────── */

function CompanyEditor({ content, setContent }: EditorProps) {
  const set = (key: keyof SiteContent['company']) => (v: string) =>
    setContent({ ...content, company: { ...content.company, [key]: v } })
  return (
    <div className="space-y-5">
      <h3 className="font-inter font-bold text-white text-[18px] mb-6">Данные компании</h3>
      <Field label="Название" value={content.company.name} onChange={set('name')} />
      <Field label="Описание" value={content.company.description} onChange={set('description')} multiline />
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Телефон (для ссылки, только цифры)" value={content.company.phone} onChange={set('phone')} hint="Пример: 89180368866" />
        <Field label="Телефон (для отображения)" value={content.company.phoneDisplay} onChange={set('phoneDisplay')} hint="Пример: 8 918 036 88 66" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Email" value={content.company.email} onChange={set('email')} />
        <Field label="Часы работы" value={content.company.hours} onChange={set('hours')} hint="Пример: ПН-ВС: с 08:00 до 20:00" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Ссылка ВКонтакте" value={content.company.vk} onChange={set('vk')} />
        <Field label="Ссылка Telegram" value={content.company.telegram} onChange={set('telegram')} />
      </div>
      <Field label="Адрес" value={content.company.address} onChange={set('address')} />
    </div>
  )
}

/* ── Hero ────────────────────────────────────────────────────────── */

function HeroEditor({ content, setContent }: EditorProps) {
  const set = (key: keyof SiteContent['hero']) => (v: string) =>
    setContent({ ...content, hero: { ...content.hero, [key]: v } })
  const setAdv = (i: number, key: 'icon'|'title'|'subtitle', v: string) => {
    const advantages = content.hero.advantages.map((a, idx) => idx === i ? { ...a, [key]: v } : a)
    setContent({ ...content, hero: { ...content.hero, advantages } })
  }
  return (
    <div className="space-y-5">
      <h3 className="font-inter font-bold text-white text-[18px] mb-6">Главный экран</h3>
      <Field label="Заголовок (строка 1, белый)" value={content.hero.title} onChange={set('title')} />
      <Field label="Заголовок (строка 2, оранжевый)" value={content.hero.titleAccent} onChange={set('titleAccent')} />
      <Field label="Подзаголовок (строка 3)" value={content.hero.subtitle} onChange={set('subtitle')} />
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Цена «от»" value={content.hero.priceFrom} onChange={set('priceFrom')} hint="Пример: от 35 000₽" />
        <Field label="Рейтинг (звёзды)" value={content.hero.rating} onChange={set('rating')} hint="Пример: ★★★★★" />
        <Field label="Кол-во клиентов" value={content.hero.clientsCount} onChange={set('clientsCount')} hint="Пример: 500+" />
      </div>
      <Field label="Кнопка — основная" value={content.hero.cta} onChange={set('cta')} />

      <div className="pt-4 border-t border-white/10">
        <h4 className="text-brand-orange font-bold text-[13px] uppercase tracking-wide mb-4">Три преимущества (карточки под кнопкой)</h4>
        <div className="space-y-4">
          {content.hero.advantages.map((adv, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-5 space-y-3">
              <span className="text-white/40 text-[11px] uppercase tracking-wide">Карточка {i + 1}</span>
              <IconField label="Иконка" value={adv.icon} onChange={v => setAdv(i, 'icon', v)} />
              <Field label="Заголовок" value={adv.title} onChange={v => setAdv(i, 'title', v)} />
              <Field label="Текст" value={adv.subtitle} onChange={v => setAdv(i, 'subtitle', v)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Services ────────────────────────────────────────────────────── */

function ServicesEditor({ content, setContent }: EditorProps) {
  const addService = () => {
    const newService = { id: Date.now().toString(), icon: 'settings', title: 'Новая услуга', description: '', features: [] as string[] }
    setContent({ ...content, services: [...content.services, newService] })
  }
  const deleteService = (i: number) => {
    if (!confirm(`Удалить услугу «${content.services[i].title}»?`)) return
    setContent({ ...content, services: content.services.filter((_, idx) => idx !== i) })
  }
  const upd = (i: number, patch: Partial<SiteContent['services'][number]>) => {
    const s = [...content.services]; s[i] = { ...s[i], ...patch }; setContent({ ...content, services: s })
  }
  return (
    <div className="space-y-8">
      <BlockHeader title="Услуги" count={content.services.length} onAdd={addService} addLabel="Добавить услугу" />
      {content.services.map((service, i) => (
        <div key={service.id} className="border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-brand-orange font-bold text-[12px] uppercase tracking-wide">Услуга {i + 1}</span>
            <DeleteRowButton onClick={() => deleteService(i)} />
          </div>
          <IconField label="Иконка" value={service.icon} onChange={v => upd(i, { icon: v })} />
          <Field label="Название" value={service.title} onChange={v => upd(i, { title: v })} />
          <Field label="Описание" value={service.description} onChange={v => upd(i, { description: v })} multiline />
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-1">Пункты списка</label>
            <p className="text-[11px] text-white/25 mb-2">Каждый пункт с новой строки</p>
            <textarea rows={4}
              value={service.features.join('\n')}
              onChange={e => upd(i, { features: e.target.value.split('\n').filter(Boolean) })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] focus:outline-none focus:border-brand-orange/50 resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Promo (акция) ───────────────────────────────────────────────── */

function PromoEditor({ content, setContent }: EditorProps) {
  const set = (key: keyof SiteContent['promo']) => (v: string) =>
    setContent({ ...content, promo: { ...content.promo, [key]: v } })
  return (
    <div className="space-y-5">
      <h3 className="font-inter font-bold text-white text-[18px] mb-6">Акция (баннер)</h3>
      <Field label="Метка" value={content.promo.badge} onChange={set('badge')} hint="Пример: АКЦИЯ" />
      <Field label="Заголовок" value={content.promo.title} onChange={set('title')} />
      <Field label="Текст" value={content.promo.text} onChange={set('text')} multiline />
    </div>
  )
}

/* ── Pricing (прайс) ─────────────────────────────────────────────── */

function PricingEditor({ content, setContent }: EditorProps) {
  const set = (key: 'title'|'subtitle') => (v: string) =>
    setContent({ ...content, pricing: { ...content.pricing, [key]: v } })
  const addRow = () =>
    setContent({ ...content, pricing: { ...content.pricing, rows: [...content.pricing.rows, { type: 'Новый', description: '', price: 'от 0₽' }] } })
  const delRow = (i: number) =>
    setContent({ ...content, pricing: { ...content.pricing, rows: content.pricing.rows.filter((_, idx) => idx !== i) } })
  const upd = (i: number, patch: Partial<SiteContent['pricing']['rows'][number]>) => {
    const rows = [...content.pricing.rows]; rows[i] = { ...rows[i], ...patch }; setContent({ ...content, pricing: { ...content.pricing, rows } })
  }
  return (
    <div className="space-y-6">
      <h3 className="font-inter font-bold text-white text-[18px] mb-2">Цены</h3>
      <Field label="Заголовок" value={content.pricing.title} onChange={set('title')} />
      <Field label="Подзаголовок" value={content.pricing.subtitle} onChange={set('subtitle')} />
      <BlockHeader title="Строки прайса" count={content.pricing.rows.length} onAdd={addRow} addLabel="Добавить строку" />
      {content.pricing.rows.map((row, i) => (
        <div key={i} className="border border-white/10 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-brand-orange font-bold text-[12px] uppercase tracking-wide">Строка {i + 1}</span>
            <DeleteRowButton onClick={() => delRow(i)} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Тип" value={row.type} onChange={v => upd(i, { type: v })} />
            <Field label="Описание" value={row.description} onChange={v => upd(i, { description: v })} />
            <Field label="Цена" value={row.price} onChange={v => upd(i, { price: v })} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Production ──────────────────────────────────────────────────── */

function ProductionEditor({ content, setContent }: EditorProps) {
  const set = (key: 'title'|'subtitle') => (v: string) =>
    setContent({ ...content, production: { ...content.production, [key]: v } })
  const addItem = () =>
    setContent({ ...content, production: { ...content.production, items: [...content.production.items, { icon: 'settings', title: 'Новый пункт', description: '' }] } })
  const delItem = (i: number) =>
    setContent({ ...content, production: { ...content.production, items: content.production.items.filter((_, idx) => idx !== i) } })
  const upd = (i: number, patch: Partial<SiteContent['production']['items'][number]>) => {
    const items = [...content.production.items]; items[i] = { ...items[i], ...patch }; setContent({ ...content, production: { ...content.production, items } })
  }
  return (
    <div className="space-y-6">
      <h3 className="font-inter font-bold text-white text-[18px] mb-2">Производство</h3>
      <Field label="Заголовок" value={content.production.title} onChange={set('title')} />
      <Field label="Подзаголовок" value={content.production.subtitle} onChange={set('subtitle')} multiline />
      <BlockHeader title="Блоки производства" count={content.production.items.length} onAdd={addItem} addLabel="Добавить блок" />
      {content.production.items.map((item, i) => (
        <div key={i} className="border border-white/10 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-brand-orange font-bold text-[12px] uppercase tracking-wide">Блок {i + 1}</span>
            <DeleteRowButton onClick={() => delItem(i)} />
          </div>
          <IconField label="Иконка" value={item.icon} onChange={v => upd(i, { icon: v })} />
          <Field label="Заголовок" value={item.title} onChange={v => upd(i, { title: v })} />
          <Field label="Описание" value={item.description} onChange={v => upd(i, { description: v })} multiline />
        </div>
      ))}
    </div>
  )
}

/* ── Key advantages ─────────────────────────────────────────────── */

function KeyAdvantagesEditor({ content, setContent }: EditorProps) {
  const set = (key: 'title'|'subtitle') => (v: string) =>
    setContent({ ...content, keyAdvantages: { ...content.keyAdvantages, [key]: v } })
  const addItem = () =>
    setContent({ ...content, keyAdvantages: { ...content.keyAdvantages, items: [...content.keyAdvantages.items, { icon: 'award', title: 'Новое', description: '' }] } })
  const delItem = (i: number) =>
    setContent({ ...content, keyAdvantages: { ...content.keyAdvantages, items: content.keyAdvantages.items.filter((_, idx) => idx !== i) } })
  const upd = (i: number, patch: Partial<SiteContent['keyAdvantages']['items'][number]>) => {
    const items = [...content.keyAdvantages.items]; items[i] = { ...items[i], ...patch }; setContent({ ...content, keyAdvantages: { ...content.keyAdvantages, items } })
  }
  return (
    <div className="space-y-6">
      <h3 className="font-inter font-bold text-white text-[18px] mb-2">Ключевые преимущества</h3>
      <Field label="Заголовок" value={content.keyAdvantages.title} onChange={set('title')} />
      <Field label="Подзаголовок" value={content.keyAdvantages.subtitle} onChange={set('subtitle')} multiline />
      <BlockHeader title="Карточки преимуществ" count={content.keyAdvantages.items.length} onAdd={addItem} addLabel="Добавить карточку" />
      {content.keyAdvantages.items.map((item, i) => (
        <div key={i} className="border border-white/10 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-brand-orange font-bold text-[12px] uppercase tracking-wide">Карточка {i + 1}</span>
            <DeleteRowButton onClick={() => delItem(i)} />
          </div>
          <IconField label="Иконка" value={item.icon} onChange={v => upd(i, { icon: v })} />
          <Field label="Заголовок" value={item.title} onChange={v => upd(i, { title: v })} />
          <Field label="Описание" value={item.description} onChange={v => upd(i, { description: v })} multiline />
        </div>
      ))}
    </div>
  )
}

/* ── Guarantees ─────────────────────────────────────────────────── */

function GuaranteesEditor({ content, setContent }: EditorProps) {
  const setTitle = (v: string) => setContent({ ...content, guarantees: { ...content.guarantees, title: v } })
  const addItem = () =>
    setContent({ ...content, guarantees: { ...content.guarantees, items: [...content.guarantees.items, { number: '0' + (content.guarantees.items.length + 1), title: 'Новая гарантия', description: '' }] } })
  const delItem = (i: number) =>
    setContent({ ...content, guarantees: { ...content.guarantees, items: content.guarantees.items.filter((_, idx) => idx !== i) } })
  const upd = (i: number, patch: Partial<SiteContent['guarantees']['items'][number]>) => {
    const items = [...content.guarantees.items]; items[i] = { ...items[i], ...patch }; setContent({ ...content, guarantees: { ...content.guarantees, items } })
  }
  return (
    <div className="space-y-6">
      <h3 className="font-inter font-bold text-white text-[18px] mb-2">Гарантии</h3>
      <Field label="Заголовок" value={content.guarantees.title} onChange={setTitle} />
      <BlockHeader title="Блоки гарантий" count={content.guarantees.items.length} onAdd={addItem} addLabel="Добавить гарантию" />
      {content.guarantees.items.map((item, i) => (
        <div key={i} className="border border-white/10 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-brand-orange font-bold text-[12px] uppercase tracking-wide">Гарантия {i + 1}</span>
            <DeleteRowButton onClick={() => delItem(i)} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Номер" value={item.number} onChange={v => upd(i, { number: v })} hint="Пример: 01" />
            <div className="md:col-span-2"><Field label="Заголовок" value={item.title} onChange={v => upd(i, { title: v })} /></div>
          </div>
          <Field label="Описание" value={item.description} onChange={v => upd(i, { description: v })} multiline />
        </div>
      ))}
    </div>
  )
}

/* ── Five advantages ─────────────────────────────────────────────── */

function FiveAdvantagesEditor({ content, setContent }: EditorProps) {
  const set = (key: 'title'|'subtitle') => (v: string) =>
    setContent({ ...content, fiveAdvantages: { ...content.fiveAdvantages, [key]: v } })
  const addItem = () =>
    setContent({ ...content, fiveAdvantages: { ...content.fiveAdvantages, items: [...content.fiveAdvantages.items, { icon: 'check-circle', text: '' }] } })
  const delItem = (i: number) =>
    setContent({ ...content, fiveAdvantages: { ...content.fiveAdvantages, items: content.fiveAdvantages.items.filter((_, idx) => idx !== i) } })
  const upd = (i: number, patch: Partial<SiteContent['fiveAdvantages']['items'][number]>) => {
    const items = [...content.fiveAdvantages.items]; items[i] = { ...items[i], ...patch }; setContent({ ...content, fiveAdvantages: { ...content.fiveAdvantages, items } })
  }
  return (
    <div className="space-y-6">
      <h3 className="font-inter font-bold text-white text-[18px] mb-2">Ещё 5 преимуществ</h3>
      <Field label="Заголовок" value={content.fiveAdvantages.title} onChange={set('title')} />
      <Field label="Подзаголовок" value={content.fiveAdvantages.subtitle} onChange={set('subtitle')} multiline />
      <BlockHeader title="Пункты" count={content.fiveAdvantages.items.length} onAdd={addItem} addLabel="Добавить пункт" />
      {content.fiveAdvantages.items.map((item, i) => (
        <div key={i} className="border border-white/10 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-brand-orange font-bold text-[12px] uppercase tracking-wide">Пункт {i + 1}</span>
            <DeleteRowButton onClick={() => delItem(i)} />
          </div>
          <IconField label="Иконка" value={item.icon} onChange={v => upd(i, { icon: v })} />
          <Field label="Текст" value={item.text} onChange={v => upd(i, { text: v })} multiline />
        </div>
      ))}
    </div>
  )
}

/* ── FAQ ─────────────────────────────────────────────────────────── */

function FaqEditor({ content, setContent }: EditorProps) {
  const set = (key: 'title'|'subtitle') => (v: string) =>
    setContent({ ...content, faq: { ...content.faq, [key]: v } })
  const addItem = () =>
    setContent({ ...content, faq: { ...content.faq, items: [...content.faq.items, { question: 'Новый вопрос?', answer: '' }] } })
  const delItem = (i: number) =>
    setContent({ ...content, faq: { ...content.faq, items: content.faq.items.filter((_, idx) => idx !== i) } })
  const upd = (i: number, patch: Partial<SiteContent['faq']['items'][number]>) => {
    const items = [...content.faq.items]; items[i] = { ...items[i], ...patch }; setContent({ ...content, faq: { ...content.faq, items } })
  }
  return (
    <div className="space-y-6">
      <h3 className="font-inter font-bold text-white text-[18px] mb-2">Частые вопросы</h3>
      <Field label="Заголовок" value={content.faq.title} onChange={set('title')} />
      <Field label="Подзаголовок" value={content.faq.subtitle} onChange={set('subtitle')} />
      <BlockHeader title="Вопросы и ответы" count={content.faq.items.length} onAdd={addItem} addLabel="Добавить вопрос" />
      {content.faq.items.map((item, i) => (
        <div key={i} className="border border-white/10 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-brand-orange font-bold text-[12px] uppercase tracking-wide">Вопрос {i + 1}</span>
            <DeleteRowButton onClick={() => delItem(i)} />
          </div>
          <Field label="Вопрос" value={item.question} onChange={v => upd(i, { question: v })} />
          <Field label="Ответ" value={item.answer} onChange={v => upd(i, { answer: v })} multiline hint="Для переноса строки нажимайте Enter" />
        </div>
      ))}
    </div>
  )
}

/* ── Stats ───────────────────────────────────────────────────────── */

function StatsEditor({ content, setContent }: EditorProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-inter font-bold text-white text-[18px] mb-6">Цифры и статистика</h3>
      <div className="grid grid-cols-2 gap-4">
        {content.stats.map((stat, i) => (
          <div key={i} className="border border-white/10 rounded-xl p-5 space-y-3">
            <Field label="Значение" value={stat.value} onChange={v => {
              const s = [...content.stats]; s[i] = { ...s[i], value: v }; setContent({ ...content, stats: s })
            }} />
            <Field label="Подпись" value={stat.label} onChange={v => {
              const s = [...content.stats]; s[i] = { ...s[i], label: v }; setContent({ ...content, stats: s })
            }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── About ───────────────────────────────────────────────────────── */

function AboutEditor({ content, setContent }: EditorProps) {
  const set = (key: keyof SiteContent['about']) => (v: string) =>
    setContent({ ...content, about: { ...content.about, [key]: v } })
  return (
    <div className="space-y-5">
      <h3 className="font-inter font-bold text-white text-[18px] mb-6">О компании</h3>
      <Field label="Заголовок" value={content.about.title} onChange={set('title')} />
      <Field label="Акцент заголовка (оранжевый)" value={content.about.titleAccent} onChange={set('titleAccent')} />
      <div>
        <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-1">Параграфы текста</label>
        <p className="text-[11px] text-white/25 mb-2">Разделяйте параграфы пустой строкой</p>
        <textarea rows={8}
          value={content.about.paragraphs.join('\n\n')}
          onChange={e => setContent({ ...content, about: { ...content.about, paragraphs: e.target.value.split('\n\n').filter(Boolean) } })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] focus:outline-none focus:border-brand-orange/50 resize-none"
        />
      </div>
      <Field label="Выделенная цитата (оранжевая рамка)" value={content.about.highlight} onChange={set('highlight')} />
    </div>
  )
}

/* ── Contact ─────────────────────────────────────────────────────── */

function ContactEditor({ content, setContent }: EditorProps) {
  const set = (key: keyof SiteContent['contact']) => (v: string) =>
    setContent({ ...content, contact: { ...content.contact, [key]: v } })
  return (
    <div className="space-y-5">
      <h3 className="font-inter font-bold text-white text-[18px] mb-6">Секция контактов / заявки</h3>
      <Field label="Заголовок" value={content.contact.title} onChange={set('title')} />
      <Field label="Подзаголовок" value={content.contact.subtitle} onChange={set('subtitle')} multiline />
    </div>
  )
}

/* ── Image upload button ─────────────────────────────────────────── */

function ImageUploadButton({ hasImage, onPick }: { hasImage: boolean; onPick: (dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    setError(false)
    setBusy(true)
    try {
      onPick(await fileToResizedDataUrl(file))
    } catch {
      setError(true)
      setTimeout(() => setError(false), 4000)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { handleFile(e.target.files?.[0]); e.target.value = '' }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 border border-dashed border-white/15 hover:border-brand-orange/40 rounded-xl py-3 text-[13px] text-white/50 hover:text-brand-orange transition-all disabled:opacity-50"
      >
        <Upload size={14} /> {busy ? 'Загрузка…' : hasImage ? 'Заменить фото с устройства' : 'Загрузить фото с устройства'}
      </button>
      {error && <p className="text-red-400 text-[12px] mt-1">Не удалось обработать файл</p>}
    </div>
  )
}

/* ── Portfolio ───────────────────────────────────────────────────── */

function PortfolioEditor({ content, setContent }: EditorProps) {
  const addItem = () => {
    const newItem = { id: Date.now().toString(), title: 'Новая работа', category: 'Фундамент', image: '' }
    setContent({ ...content, portfolio: [...content.portfolio, newItem] })
  }
  const deleteItem = (i: number) => {
    if (!confirm(`Удалить «${content.portfolio[i].title}»?`)) return
    setContent({ ...content, portfolio: content.portfolio.filter((_, idx) => idx !== i) })
  }
  const moveUp = (i: number) => {
    if (i === 0) return
    const p = [...content.portfolio]
    ;[p[i - 1], p[i]] = [p[i], p[i - 1]]
    setContent({ ...content, portfolio: p })
  }
  const moveDown = (i: number) => {
    if (i === content.portfolio.length - 1) return
    const p = [...content.portfolio]
    ;[p[i], p[i + 1]] = [p[i + 1], p[i]]
    setContent({ ...content, portfolio: p })
  }

  return (
    <div className="space-y-5">
      <BlockHeader title="Примеры работ" count={content.portfolio.length} onAdd={addItem} addLabel="Добавить работу" />

      <p className="text-white/30 text-[12px] bg-white/5 rounded-xl px-4 py-3">
        Загрузите фото прямо с устройства кнопкой <strong className="text-white">«Загрузить фото с устройства»</strong> —
        изображение сожмётся автоматически. Либо вставьте прямую ссылку в поле URL
        (формат <code className="text-brand-orange">/works/имя-файла.jpg</code> для фото из папки проекта).
      </p>

      {content.portfolio.length === 0 && (
        <div className="border border-dashed border-white/10 rounded-xl p-10 text-center">
          <p className="text-white/30 text-[14px]">Нет добавленных работ</p>
          <button onClick={addItem} className="mt-3 text-brand-orange text-[13px] hover:underline">+ Добавить первую работу</button>
        </div>
      )}

      {content.portfolio.map((item, i) => (
        <div key={item.id} className="border border-white/10 hover:border-white/20 rounded-xl p-5 space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical size={16} className="text-white/20" />
              <span className="text-brand-orange font-bold text-[12px] uppercase tracking-wide">Работа {i + 1}</span>
              {item.category && (
                <span className="bg-white/5 rounded-full px-2 py-0.5 text-[10px] text-white/40 uppercase">{item.category}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => moveUp(i)} disabled={i === 0}
                className="p-1.5 text-white/30 hover:text-white disabled:opacity-20 transition-colors rounded-lg hover:bg-white/5" title="Вверх">↑</button>
              <button onClick={() => moveDown(i)} disabled={i === content.portfolio.length - 1}
                className="p-1.5 text-white/30 hover:text-white disabled:opacity-20 transition-colors rounded-lg hover:bg-white/5" title="Вниз">↓</button>
              <button onClick={() => deleteItem(i)}
                className="p-1.5 text-red-500/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-1" title="Удалить"><Trash2 size={15} /></button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Название" value={item.title} onChange={v => {
              const p = [...content.portfolio]; p[i] = { ...p[i], title: v }; setContent({ ...content, portfolio: p })
            }} />
            <Field label="Категория" value={item.category} onChange={v => {
              const p = [...content.portfolio]; p[i] = { ...p[i], category: v }; setContent({ ...content, portfolio: p })
            }} hint="Например: Фундамент, Домокомплект" />
          </div>

          <Field label="URL фото" value={item.image.startsWith('data:') ? '' : item.image} onChange={v => {
            const p = [...content.portfolio]; p[i] = { ...p[i], image: v }; setContent({ ...content, portfolio: p })
          }} hint="Прямая ссылка на фото или /works/имя.jpg" />

          <ImageUploadButton
            hasImage={Boolean(item.image)}
            onPick={dataUrl => {
              const p = [...content.portfolio]; p[i] = { ...p[i], image: dataUrl }; setContent({ ...content, portfolio: p })
            }}
          />

          {item.image ? (
            <div className="relative rounded-xl overflow-hidden h-44 bg-white/5">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy"
                onError={e => {
                  const el = e.target as HTMLImageElement
                  el.style.display = 'none'
                  el.nextElementSibling?.classList.remove('hidden')
                }}
              />
              <div className="hidden absolute inset-0 flex items-center justify-center">
                <p className="text-white/30 text-[13px]">Не удалось загрузить изображение</p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl h-20 bg-white/3 border border-dashed border-white/10 flex items-center justify-center">
              <p className="text-white/20 text-[12px]">Нет изображения — вставьте URL выше</p>
            </div>
          )}

          <button onClick={() => deleteItem(i)}
            className="w-full mt-2 flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-500/70 hover:bg-red-500/10 text-red-500/60 hover:text-red-400 rounded-xl py-2.5 text-[13px] transition-all">
            <Trash2 size={14} /> Удалить работу
          </button>
        </div>
      ))}
    </div>
  )
}
