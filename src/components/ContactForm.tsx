import { useEffect, useRef, useState } from 'react'
import { Phone, MessageCircle, Send, CheckCircle } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function ContactForm({ content }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: send to backend / CRM / email
    console.log('Form submitted:', form)
    setSent(true)
    setTimeout(() => setSent(false), 5000)
    setForm({ name: '', phone: '', message: '' })
  }

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-[#0d0d0d] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
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

            {/* Contact cards */}
            <div className="space-y-4">
              <a
                href={`tel:${content.company.phone}`}
                className="reveal flex items-center gap-4 liquid-glass rounded-xl p-5 hover:-translate-y-0.5 transition-transform duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                  <Phone size={20} className="text-brand-orange" />
                </div>
                <div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wide mb-0.5">Телефон</div>
                  <div className="font-inter font-semibold text-white text-[17px]">
                    {content.company.phoneDisplay}
                  </div>
                </div>
              </a>

              <a
                href={content.company.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal flex items-center gap-4 liquid-glass rounded-xl p-5 hover:-translate-y-0.5 transition-transform duration-300 group"
                style={{ transitionDelay: '100ms' }}
              >
                <div className="w-12 h-12 rounded-lg bg-[#4C75A3]/20 flex items-center justify-center group-hover:bg-[#4C75A3]/30 transition-colors">
                  <MessageCircle size={20} className="text-[#4C75A3]" />
                </div>
                <div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wide mb-0.5">ВКонтакте</div>
                  <div className="font-inter font-semibold text-white text-[15px]">ural_grupp_krd</div>
                </div>
              </a>

              <div
                className="reveal liquid-glass rounded-xl p-5"
                style={{ transitionDelay: '200ms' }}
              >
                <div className="text-[11px] text-white/40 uppercase tracking-wide mb-1">Адрес</div>
                <div className="text-white font-medium">{content.company.address}</div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal liquid-glass rounded-2xl p-8" style={{ transitionDelay: '150ms' }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <CheckCircle size={48} className="text-brand-orange" />
                <h3 className="font-inter font-bold text-white text-[20px]">Заявка отправлена!</h3>
                <p className="text-white/50 text-center">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-inter font-bold text-white text-[20px] mb-6">Оставить заявку</h3>

                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-2">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Петров"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-[14px] focus:outline-none focus:border-brand-orange/50 focus:bg-white/8 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-2">Телефон</label>
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
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Опишите ваш объект — площадь, тип грунта, что планируете строить..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-[14px] focus:outline-none focus:border-brand-orange/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-brand-orange hover:bg-orange-400 text-black font-semibold rounded-xl px-6 py-4 text-[15px] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(249,115,22,0.3)] active:scale-[0.98]"
                >
                  <Send size={16} />
                  Отправить заявку
                </button>

                <p className="text-[11px] text-white/30 text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
