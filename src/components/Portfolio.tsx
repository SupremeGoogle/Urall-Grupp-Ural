import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function Portfolio({ content }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState('Все')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const categories = ['Все', ...Array.from(new Set(content.portfolio.map(p => p.category)))]
  const filtered = filter === 'Все' ? content.portfolio : content.portfolio.filter(p => p.category === filter)

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => i !== null ? (i + 1) % filtered.length : null)
      if (e.key === 'ArrowLeft') setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, filtered.length])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
      }),
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio" ref={ref} className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="reveal text-center mb-14">
          <span className="text-[11px] tracking-[0.25em] text-brand-orange uppercase font-medium mb-4 block">
            Наши объекты
          </span>
          <h2 className="font-inter font-bold text-white mb-4" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            Примеры <span className="text-gradient-orange">работ</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-[15px]">
            Реальные объекты нашей компании — от монтажа свай до готовых домокомплектов
          </p>
        </div>

        {/* Filter */}
        <div className="reveal flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-[12px] font-medium tracking-wide uppercase transition-all duration-200 ${
                filter === cat
                  ? 'bg-brand-orange text-black shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                  : 'liquid-glass text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="reveal break-inside-avoid group relative rounded-2xl overflow-hidden cursor-zoom-in"
              style={{ transitionDelay: `${Math.min(i * 60, 300)}ms` }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105 block"
                loading="lazy"
                onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=70' }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Zoom icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="liquid-glass rounded-full p-2">
                  <ZoomIn size={14} className="text-white" />
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-white/90 uppercase">
                  {item.category}
                </span>
              </div>

              {/* Title on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-inter font-semibold text-white text-[14px]">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Count badge */}
        {content.portfolio.length > 0 && (
          <div className="reveal text-center mt-10">
            <span className="liquid-glass rounded-full px-5 py-2 text-[13px] text-white/50">
              Показано {filtered.length} из {content.portfolio.length} объектов
            </span>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 liquid-glass rounded-full p-3 text-white hover:text-brand-orange transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              className="absolute left-4 liquid-glass rounded-full p-3 text-white hover:text-brand-orange transition-colors z-10"
              onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length) }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] mx-16 flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
            <img
              src={filtered[lightbox]?.image}
              alt={filtered[lightbox]?.title}
              className="max-h-[75vh] max-w-full object-contain rounded-xl"
            />
            <div className="text-center">
              <p className="font-inter font-semibold text-white text-[16px]">{filtered[lightbox]?.title}</p>
              <span className="text-brand-orange text-[12px] uppercase tracking-wide">{filtered[lightbox]?.category}</span>
            </div>
            <p className="text-white/30 text-[12px]">{lightbox + 1} / {filtered.length} · ESC для закрытия</p>
          </div>

          {/* Next */}
          {filtered.length > 1 && (
            <button
              className="absolute right-4 liquid-glass rounded-full p-3 text-white hover:text-brand-orange transition-colors z-10"
              onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length) }}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </section>
  )
}
