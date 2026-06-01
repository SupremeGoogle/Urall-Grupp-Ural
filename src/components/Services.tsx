import { useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

const ICONS: Record<string, string> = {
  '⚙️': '⚙️', '🏗️': '🏗️', '🪵': '🪵',
}

export default function Services({ content }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
      }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="text-[11px] tracking-[0.25em] text-brand-orange uppercase font-medium mb-4 block">
            Что мы делаем
          </span>
          <h2 className="font-inter font-bold text-white mb-4" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            Наши <span className="text-gradient-orange">услуги</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-[16px]">
            Полный цикл — от производства до монтажа
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {content.services.map((service, i) => (
            <div
              key={service.id}
              className="reveal liquid-glass rounded-2xl p-8 group hover:border-brand-orange/30 transition-all duration-500 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-2xl mb-6 group-hover:bg-brand-orange/20 transition-colors">
                {service.icon}
              </div>

              <h3 className="font-inter font-bold text-white text-[20px] mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-white/50 text-[14px] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-[13px] text-white/70">
                    <CheckCircle2 size={14} className="text-brand-orange flex-shrink-0" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Bottom accent */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <a
                  href="#contact"
                  className="text-[12px] font-semibold tracking-[0.12em] text-brand-orange hover:text-orange-300 uppercase transition-colors"
                >
                  Получить расчёт →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
