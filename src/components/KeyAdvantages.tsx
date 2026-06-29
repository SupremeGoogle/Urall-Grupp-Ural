import { useEffect, useRef } from 'react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function KeyAdvantages({ content }: Props) {
  const { keyAdvantages } = content
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.adv-item').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-orange text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">Преимущества</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{keyAdvantages.title}</h2>
          <p className="text-white/40 text-sm max-w-2xl mx-auto">{keyAdvantages.subtitle}</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {keyAdvantages.items.map((item, i) => (
            <div
              key={i}
              className="adv-item opacity-0 translate-y-6 transition-all duration-500 flex gap-4 liquid-glass rounded-2xl p-6 hover:border-brand-orange/20 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-xl group-hover:bg-brand-orange/20 transition-colors duration-200">
                {item.icon}
              </div>
              <div>
                <h3 className="font-black text-white text-xs tracking-wide mb-1.5 group-hover:text-brand-orange transition-colors duration-200 uppercase">
                  {item.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
