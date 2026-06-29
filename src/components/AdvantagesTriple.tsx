import { useEffect, useRef } from 'react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

const items = [
  {
    icon: '🏗️',
    title: 'НАДЁЖНЫЙ ФУНДАМЕНТ',
    description: 'Производим винтовые сваи в полном соответствии с ГОСТ. Двойной контроль качества каждой сваи.',
  },
  {
    icon: '💰',
    title: 'ПО ДОСТУПНОЙ ЦЕНЕ',
    description: 'Собственное производство позволяет экономить минимум 15% от цены конкурентов.',
  },
  {
    icon: '📋',
    title: 'С ГАРАНТИЕЙ ПО ДОГОВОРУ',
    description: 'Даём расширенную гарантию по договору на 25 лет с момента завершения работ.',
  },
]

export default function AdvantagesTriple({ content: _ }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="fade-up opacity-0 translate-y-8 transition-all duration-700 liquid-glass rounded-2xl p-8 text-center hover:border-brand-orange/20 group"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-white text-sm tracking-widest mb-3 group-hover:text-brand-orange transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
