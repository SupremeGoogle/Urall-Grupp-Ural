import { useEffect, useRef } from 'react'
import { Award, Truck, Factory } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function About({ content }: Props) {
  const ref = useRef<HTMLElement>(null)

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

  const advantages = [
    { icon: Factory, title: 'Собственное производство', desc: 'Производим сваи и домокомплекты сами — никаких посредников' },
    { icon: Truck, title: 'Выезд по всему ЮФО', desc: '4 сваекрута, два собственного производства' },
    { icon: Award, title: 'Гарантия качества', desc: 'Контроль на каждом этапе от производства до монтажа' },
  ]

  return (
    <section id="about" ref={ref} className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="reveal">
              <span className="text-[11px] tracking-[0.25em] text-brand-orange uppercase font-medium mb-4 block">
                О компании
              </span>
              <h2 className="font-inter font-bold text-white mb-8" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                {content.about.title}{' '}
                <span className="text-gradient-orange">{content.about.titleAccent}</span>
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              {content.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="reveal text-white/60 text-[15px] leading-relaxed"
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Highlight box */}
            <div className="reveal liquid-glass rounded-xl p-5 border-l-2 border-brand-orange">
              <p className="text-white/90 font-medium text-[15px]">{content.about.highlight}</p>
            </div>
          </div>

          {/* Right: advantages */}
          <div className="space-y-4">
            {advantages.map((adv, i) => {
              const Icon = adv.icon
              return (
                <div
                  key={adv.title}
                  className="reveal liquid-glass rounded-xl p-6 flex items-start gap-4 group hover:-translate-y-0.5 transition-transform duration-300"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/20 transition-colors">
                    <Icon size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-white text-[15px] mb-1">{adv.title}</h3>
                    <p className="text-white/50 text-[13px] leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              )
            })}

            {/* Image */}
            <div className="reveal rounded-xl overflow-hidden h-[200px] relative" style={{ transitionDelay: '300ms' }}>
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&auto=format&fit=crop"
                alt="Наша команда за работой"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white font-semibold text-[13px]">Работаем с 2016 года</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
