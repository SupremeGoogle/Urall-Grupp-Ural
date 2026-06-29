import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function GalleryGrid({ content }: Props) {
  const { portfolio } = content
  const [lightbox, setLightbox] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('opacity-100', 'scale-100') }),
      { threshold: 0.05 }
    )
    ref.current?.querySelectorAll('.gallery-item').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="portfolio" className="py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-orange text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">Портфолио</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">РЕАЛИЗОВАННЫЕ ОБЪЕКТЫ</h2>
          <p className="text-white/40 text-sm tracking-widest uppercase">ДЛЯ НАЧАЛА, ПОСМОТРИТЕ НА НАШУ РАБОТУ</p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {portfolio.map((item, i) => (
            <div
              key={item.id}
              className="gallery-item opacity-0 scale-95 transition-all duration-500 cursor-pointer group relative overflow-hidden rounded-xl aspect-square"
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
              onClick={() => setLightbox(item.image)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <div>
                  <p className="text-white text-xs font-semibold">{item.title}</p>
                  <p className="text-brand-orange text-[10px] tracking-widest uppercase">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 liquid-glass rounded-full p-3 text-white hover:text-brand-orange transition-colors">
            <X size={20} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
