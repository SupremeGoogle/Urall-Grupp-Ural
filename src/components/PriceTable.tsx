import { useEffect, useRef } from 'react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function PriceTable({ content }: Props) {
  const { pricing } = content
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-row').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="pricing" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-orange text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">Цены</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{pricing.title}</h2>
          <p className="text-white/40 text-sm">{pricing.subtitle}</p>
        </div>

        <div ref={ref} className="liquid-glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-3 bg-white/5 px-6 py-4">
            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-semibold">Тип</p>
            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-semibold">Описание</p>
            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-semibold text-right">Стоимость</p>
          </div>

          {pricing.rows.map((row, i) => (
            <div
              key={i}
              className="fade-row opacity-0 translate-y-4 transition-all duration-500 grid grid-cols-3 items-center px-6 py-5 border-t border-white/5 hover:bg-white/3 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-bold text-white text-sm group-hover:text-brand-orange transition-colors duration-200">{row.type}</p>
              <p className="text-white/50 text-sm">{row.description}</p>
              <p className="text-brand-orange font-black text-lg text-right">{row.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="#contact"
            className="inline-block bg-brand-orange hover:bg-orange-400 text-black font-bold text-sm tracking-[0.2em] uppercase px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-orange/20"
          >
            ПОЛУЧИТЬ ТОЧНЫЙ РАСЧЁТ
          </a>
        </div>
      </div>
    </section>
  )
}
