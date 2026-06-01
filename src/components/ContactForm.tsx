import { useEffect, useRef, useState } from 'react'
import { Phone, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

// Google Apps Script Web App URL — вставить после деплоя скрипта
const SHEETS_URL = import.meta.env.VITE_SHEETS_URL || ''

async function submitToSheets(data: { name: string; phone: string; message: string }) {
  if (!SHEETS_URL) return false
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script требует no-cors
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return true
  } catch {
    return false
  }
}

export default function ContactForm({ content }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [consent, setConsent] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
      }),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) return

    setLoading(true)
    setError(false)

    const ok = await submitToSheets(form)

    setLoading(false)
    if (ok || !SHEETS_URL) {
      setSent(true)
      setForm({ name: '', phone: '', message: '' })
      setConsent(false)
      setTimeout(() => setSent(false), 6000)
    } else {
      setError(true)
      setTimeout(() => setError(false), 5000)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="reveal">
              <span className="text-[11px] tracking-[0.25em] text-brand-orange uppercase font-medium mb-4 block">
                Связаться с нами
              </span>
              <h2 className="font-inter font-bold text-white mb-4" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
                {content.contact.title}{' '}
                <span className="text-gradient-orange">расчёт</span>
              </h2>
              <p className="text-white/50 text-[15px] leading-relaxed mb-10">
                {content.contact.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              <a href={`tel:${content.company.phone}`}
                className="reveal flex items-center gap-4 liquid-glass rounded-xl p-5 hover:-translate-y-0.5 transition-transform duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                  <Phone size={20} className="text-brand-orange" />
                </div>
                <div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wide mb-0.5">Телефон</div>
                  <div className="font-inter font-semibold text-white text-[17px]">{content.company.phoneDisplay}</div>
                </div>
              </a>

              <a href={content.company.vk} target="_blank" rel="noopener noreferrer"
                className="reveal flex items-center gap-4 liquid-glass rounded-xl p-5 hover:-translate-y-0.5 transition-transform duration-300 group"
                style={{ transitionDelay: '100ms' }}>
                <div className="w-12 h-12 rounded-lg bg-[#4C75A3]/20 flex items-center justify-center group-hover:bg-[#4C75A3]/30 transition-colors">
                  {/* VK icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.585-1.496c.597-.19 1.365 1.26 2.181 1.816.615.42 1.083.327 1.083.327l2.175-.03s1.137-.071.598-.964c-.044-.073-.314-.661-1.616-1.869-1.363-1.265-1.18-1.06.461-3.247.998-1.33 1.397-2.142 1.272-2.49-.12-.333-.854-.245-.854-.245l-2.447.015s-.181-.025-.316.056c-.132.079-.216.262-.216.262s-.387 1.03-.903 1.905c-1.088 1.847-1.52 1.946-1.698 1.832-.412-.267-.309-1.073-.309-1.646 0-1.79.271-2.535-.528-2.727-.266-.064-.461-.107-1.141-.114-.872-.009-1.609.003-2.028.208-.278.136-.492.44-.361.457.161.022.526.098.72.362.25.341.241 1.107.241 1.107s.144 2.107-.335 2.368c-.329.177-.78-.184-1.748-1.835-.497-.858-.872-1.808-.872-1.808s-.072-.176-.202-.271c-.157-.115-.376-.151-.376-.151l-2.322.015s-.348.01-.476.161c-.113.135-.009.414-.009.414s1.818 4.25 3.877 6.395c1.888 1.967 4.03 1.838 4.03 1.838h.971z" fill="#4C75A3"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wide mb-0.5">ВКонтакте</div>
                  <div className="font-inter font-semibold text-white text-[15px]">ural_grupp_krd</div>
                </div>
              </a>

              <div className="reveal liquid-glass rounded-xl p-5" style={{ transitionDelay: '200ms' }}>
                <div className="text-[11px] text-white/40 uppercase tracking-wide mb-1">Адрес</div>
                <div className="text-white font-medium">{content.company.address}</div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal liquid-glass rounded-2xl p-8" style={{ transitionDelay: '150ms' }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle size={36} className="text-green-400" />
                </div>
                <h3 className="font-inter font-bold text-white text-[20px]">Заявка отправлена!</h3>
                <p className="text-white/50 text-center text-[14px]">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-inter font-bold text-white text-[20px] mb-6">Оставить заявку</h3>

                {error && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                    <span className="text-red-400 text-[13px]">Ошибка отправки. Позвоните нам напрямую.</span>
                  </div>
                )}

                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-2">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Петров"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-[14px] focus:outline-none focus:border-brand-orange/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-2">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (918) 000-00-00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-[14px] focus:outline-none focus:border-brand-orange/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-2">Сообщение</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Опишите объект — площадь, тип грунта, что планируете строить..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-[14px] focus:outline-none focus:border-brand-orange/50 transition-colors resize-none"
                  />
                </div>

                {/* Согласие на обработку персональных данных */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  {/* Скрытый нативный чекбокс — лейбл передаёт на него клики */}
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    required
                  />
                  {/* Визуальный чекбокс — pointer-events-none чтобы клик шёл в label → input */}
                  <div className={`mt-0.5 w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all pointer-events-none ${
                    consent
                      ? 'bg-brand-orange border-brand-orange'
                      : 'border-white/20 group-hover:border-white/40'
                  }`}>
                    {consent && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 3.5L3.5 6.5L9 1" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[12px] text-white/40 leading-relaxed">
                    Я согласен(а) на{' '}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 underline underline-offset-2 hover:text-white transition-colors"
                    >
                      обработку персональных данных
                    </a>{' '}
                    в соответствии с Федеральным законом № 152-ФЗ
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!consent || loading}
                  className={`w-full flex items-center justify-center gap-3 font-semibold rounded-xl px-6 py-4 text-[15px] transition-all duration-200 ${
                    consent && !loading
                      ? 'bg-brand-orange hover:bg-orange-400 text-black hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(249,115,22,0.3)] active:scale-[0.98] cursor-pointer'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20"/>
                      </svg>
                      Отправка...
                    </>
                  ) : (
                    <><Send size={16} /> Отправить заявку</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
