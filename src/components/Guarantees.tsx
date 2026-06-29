import { useEffect, useRef } from 'react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function Guarantees({ content }: Props) {
  const { guarantees } = content
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('opacity-100', 'scale-100') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.guarantee-card').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-orange text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">Гарантии</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">{guarantees.title}</h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guarantees.items.map((g, i) => (
            <div
              key={i}
              className="guarantee-card opacity-0 scale-95 transition-all duration-600 relative liquid-glass rounded-3xl p-8 hover:border-brand-orange/30 group overflow-hidden"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Big number background */}
              <div className="absolute -top-4 -right-2 text-[100px] font-black text-white/3 leading-none select-none group-hover:text-brand-orange/5 transition-colors duration-300">
                {g.number}
              </div>
              <div className="relative">
                <span className="inline-block text-brand-orange font-black text-3xl mb-4">{g.number}</span>
                <h3 className="font-black text-white text-sm tracking-wide mb-3 uppercase group-hover:text-brand-orange transition-colors duration-200">
                  {g.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{g.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
