import { useEffect, useRef, useState } from 'react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function Portfolio({ content }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState('Все')

  const categories = ['Все', ...Array.from(new Set(content.portfolio.map(p => p.category)))]
  const filtered = filter === 'Все' ? content.portfolio : content.portfolio.filter(p => p.category === filter)

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

  return (
    <section id="portfolio" ref={ref} className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-12">
          <span className="text-[11px] tracking-[0.25em] text-brand-orange uppercase font-medium mb-4 block">
            Портфолио
          </span>
          <h2 className="font-inter font-bold text-white mb-4" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            Наши <span className="text-gradient-orange">работы</span>
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="reveal flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-[12px] font-medium tracking-wide uppercase transition-all duration-200 ${
                filter === cat
                  ? 'bg-brand-orange text-black'
                  : 'liquid-glass text-white/70 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="reveal group rounded-2xl overflow-hidden relative aspect-[4/3] cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.15em] text-white/90 uppercase">
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-inter font-semibold text-white text-[15px]">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
