import { useEffect, useRef } from 'react'
import type { SiteContent } from '../data/content'
import Icon from './ui/Icon'

interface Props { content: SiteContent }

export default function Production({ content }: Props) {
  const { production } = content
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-x-0') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.slide-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-orange text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">Производство</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{production.title}</h2>
          <p className="text-white/40 text-sm max-w-2xl mx-auto leading-relaxed">{production.subtitle}</p>
        </div>

        {/* Banner photo */}
        <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 mb-6">
          <img
            src="/works/work5.jpg"
            alt="Производство винтовых свай по ГОСТ"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <p className="text-white font-black text-lg md:text-xl tracking-wide">Винтовые сваи собственного производства</p>
            <p className="text-brand-orange text-xs md:text-sm tracking-widest uppercase mt-1">Строго по ГОСТ · плазменная резка с ЧПУ</p>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {production.items.map((item, i) => (
            <div
              key={i}
              className="slide-in opacity-0 -translate-x-4 transition-all duration-700 liquid-glass rounded-2xl p-6 text-center hover:border-brand-orange/30 group"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex justify-center mb-3"><Icon name={item.icon} size={30} className="text-brand-orange" /></div>
              <h3 className="font-black text-white text-xs tracking-wide mb-2 group-hover:text-brand-orange transition-colors duration-200 uppercase">
                {item.title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
