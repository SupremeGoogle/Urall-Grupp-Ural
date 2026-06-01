import { useState, useEffect } from 'react'
import { LogOut, Save, Eye, RefreshCw, Check, ClipboardList } from 'lucide-react'
import { defaultContent, getContent, saveContent } from '../data/content'
import type { SiteContent } from '../data/content'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'ural2026'

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [content, setContent] = useState<SiteContent>(getContent())
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'company'|'hero'|'services'|'stats'|'about'|'portfolio'>('company')

  useEffect(() => {
    const s = sessionStorage.getItem('urall_admin')
    if (s === 'yes') setAuthed(true)
  }, [])

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('urall_admin', 'yes')
      setAuthed(true)
      setPwError(false)
    } else {
      setPwError(true)
      setPw('')
    }
  }

  const logout = () => {
    sessionStorage.removeItem('urall_admin')
    setAuthed(false)
  }

  const handleSave = () => {
    saveContent(content)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (confirm('Сбросить к исходным данным?')) {
      setContent(defaultContent)
      saveContent(defaultContent)
    }
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="liquid-glass rounded-2xl p-10 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg bg-brand-orange flex items-center justify-center font-black text-black text-sm">UG</div>
            <div>
              <div className="font-inter font-bold text-white text-[15px]">Urall-Grupp</div>
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

  const tabs = [
    { id: 'company', label: 'Компания' },
    { id: 'hero', label: 'Главный экран' },
    { id: 'services', label: 'Услуги' },
    { id: 'stats', label: 'Цифры' },
    { id: 'about', label: 'О нас' },
    { id: 'portfolio', label: 'Работы' },
  ] as const

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-barlow">
      {/* Top bar */}
      <div className="liquid-glass border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-black text-black text-xs">UG</div>
            <span className="font-inter font-bold text-white text-[15px]">Панель управления</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <a href={`${import.meta.env.VITE_SHEETS_URL?.replace('exec','')}`}
               target="_blank" rel="noopener noreferrer"
               className="liquid-glass rounded-full px-4 py-2 text-[12px] text-white/70 hover:text-white flex items-center gap-2 transition-colors">
              <ClipboardList size={13} /> Заявки (Google Sheets)
            </a>
            <a href="/" target="_blank"
               className="liquid-glass rounded-full px-4 py-2 text-[12px] text-white/70 hover:text-white flex items-center gap-2 transition-colors">
              <Eye size={13} /> Просмотр сайта
            </a>
            <button onClick={handleReset}
               className="liquid-glass rounded-full px-4 py-2 text-[12px] text-white/70 hover:text-white flex items-center gap-2 transition-colors">
              <RefreshCw size={13} /> Сброс
            </button>
            <button
              onClick={handleSave}
              className={`rounded-full px-5 py-2 text-[12px] font-semibold flex items-center gap-2 transition-all ${
                saved ? 'bg-green-500 text-white' : 'bg-brand-orange hover:bg-orange-400 text-black'
              }`}
            >
              {saved ? <><Check size={13} /> Сохранено!</> : <><Save size={13} /> Сохранить</>}
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
          💡 Изменения сохраняются в браузере. Нажмите <strong className="text-white">«Сохранить»</strong> после правок. Для смены фото — замените ссылку на прямой URL изображения.
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
          {activeTab === 'company'   && <CompanyEditor   content={content} setContent={setContent} />}
          {activeTab === 'hero'      && <HeroEditor      content={content} setContent={setContent} />}
          {activeTab === 'services'  && <ServicesEditor  content={content} setContent={setContent} />}
          {activeTab === 'stats'     && <StatsEditor     content={content} setContent={setContent} />}
          {activeTab === 'about'     && <AboutEditor     content={content} setContent={setContent} />}
          {activeTab === 'portfolio' && <PortfolioEditor content={content} setContent={setContent} />}
        </div>
      </div>
    </div>
  )
}

/* ── Field component ─────────────────────────────────────────────── */

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

/* ── Sub-editors ─────────────────────────────────────────────────── */

function CompanyEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  const set = (key: keyof SiteContent['company']) => (v: string) =>
    setContent({ ...content, company: { ...content.company, [key]: v } })
  return (
    <div className="space-y-5">
      <h3 className="font-inter font-bold text-white text-[18px] mb-6">Данные компании</h3>
      <Field label="Название" value={content.company.name} onChange={set('name')} />
      <Field label="Слоган" value={content.company.tagline} onChange={set('tagline')} />
      <Field label="Описание" value={content.company.description} onChange={set('description')} multiline />
      <Field label="Телефон (для ссылки, только цифры)" value={content.company.phone} onChange={set('phone')} hint="Пример: 89180368866" />
      <Field label="Телефон (для отображения)" value={content.company.phoneDisplay} onChange={set('phoneDisplay')} hint="Пример: 8 918 036 88 66" />
      <Field label="Ссылка ВКонтакте" value={content.company.vk} onChange={set('vk')} />
      <Field label="Адрес" value={content.company.address} onChange={set('address')} />
    </div>
  )
}

function HeroEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  const set = (key: keyof SiteContent['hero']) => (v: string) =>
    setContent({ ...content, hero: { ...content.hero, [key]: v } })
  return (
    <div className="space-y-5">
      <h3 className="font-inter font-bold text-white text-[18px] mb-6">Главный экран</h3>
      <Field label="Бейдж (регионы)" value={content.hero.badge} onChange={set('badge')} />
      <Field label="Заголовок (строка 1, белый)" value={content.hero.title} onChange={set('title')} />
      <Field label="Заголовок (строка 2, оранжевый)" value={content.hero.titleAccent} onChange={set('titleAccent')} />
      <Field label="Подзаголовок" value={content.hero.subtitle} onChange={set('subtitle')} multiline />
      <Field label="Кнопка — основная" value={content.hero.cta} onChange={set('cta')} />
      <Field label="Кнопка — вторичная" value={content.hero.ctaSecondary} onChange={set('ctaSecondary')} />
    </div>
  )
}

function ServicesEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  return (
    <div className="space-y-8">
      <h3 className="font-inter font-bold text-white text-[18px] mb-6">Услуги</h3>
      {content.services.map((service, i) => (
        <div key={service.id} className="border border-white/10 rounded-xl p-6 space-y-4">
          <span className="text-brand-orange font-bold text-[12px] uppercase tracking-wide">Услуга {i + 1}</span>
          <Field label="Иконка (эмодзи)" value={service.icon} onChange={v => {
            const s = [...content.services]; s[i] = { ...s[i], icon: v }; setContent({ ...content, services: s })
          }} />
          <Field label="Название" value={service.title} onChange={v => {
            const s = [...content.services]; s[i] = { ...s[i], title: v }; setContent({ ...content, services: s })
          }} />
          <Field label="Описание" value={service.description} onChange={v => {
            const s = [...content.services]; s[i] = { ...s[i], description: v }; setContent({ ...content, services: s })
          }} multiline />
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-1">Пункты списка</label>
            <p className="text-[11px] text-white/25 mb-2">Каждый пункт с новой строки</p>
            <textarea rows={4}
              value={service.features.join('\n')}
              onChange={e => {
                const s = [...content.services]
                s[i] = { ...s[i], features: e.target.value.split('\n').filter(Boolean) }
                setContent({ ...content, services: s })
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] focus:outline-none focus:border-brand-orange/50 resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function StatsEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
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

function AboutEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
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

function PortfolioEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="font-inter font-bold text-white text-[18px] mb-6">Портфолио — работы</h3>
      <p className="text-white/40 text-[13px]">Вставьте прямые ссылки на фотографии. Рекомендуемый размер: 800×600px.</p>
      {content.portfolio.map((item, i) => (
        <div key={item.id} className="border border-white/10 rounded-xl p-5 space-y-3">
          <span className="text-brand-orange font-bold text-[12px] uppercase">Работа {i + 1}</span>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Название" value={item.title} onChange={v => {
              const p = [...content.portfolio]; p[i] = { ...p[i], title: v }; setContent({ ...content, portfolio: p })
            }} />
            <Field label="Категория" value={item.category} onChange={v => {
              const p = [...content.portfolio]; p[i] = { ...p[i], category: v }; setContent({ ...content, portfolio: p })
            }} />
          </div>
          <Field label="URL фото" value={item.image} onChange={v => {
            const p = [...content.portfolio]; p[i] = { ...p[i], image: v }; setContent({ ...content, portfolio: p })
          }} hint="Прямая ссылка на изображение (https://...jpg)" />
          {item.image && (
            <img src={item.image} alt="" className="w-full h-32 object-cover rounded-lg" loading="lazy"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
          )}
        </div>
      ))}
    </div>
  )
}
