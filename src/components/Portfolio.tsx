import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { ZoomParallax } from './ui/ZoomParallax'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function Portfolio({ content }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const items = content.portfolio

  const zoomImages = items.map(item => ({ src: item.image, alt: item.title }))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => i !== null ? (i + 1) % items.length : null)
      if (e.key === 'ArrowLeft') setLightbox(i => i !== null ? (i - 1 + items.length) % items.length : null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, items.length])

  return (
    <section id="portfolio" className="bg-[#0a0a0a]">

      {/* Header */}
      <div className="text-center pt-24 pb-12 px-6">
        <span className="text-[11px] tracking-[0.25em] text-brand-orange uppercase font-medium mb-4 block">
          Наши объекты
        </span>
        <h2 className="font-inter font-bold text-white mb-4" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
          Примеры <span className="text-gradient-orange">работ</span>
        </h2>
        <p className="text-white/40 max-w-lg mx-auto text-[15px]">
          Прокрутите вниз — реальные объекты нашей компании
        </p>
      </div>

      {/* Zoom Parallax Gallery */}
      <ZoomParallax images={zoomImages} onImageClick={setLightbox} />

      {/* CTA after gallery */}
      <div className="flex justify-center py-16">
        <button
          onClick={() => setLightbox(0)}
          className="group flex items-center gap-3 bg-brand-orange hover:bg-orange-400 text-black font-semibold rounded-full px-8 py-4 text-[15px] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
          Посмотреть галерею
        </button>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black flex flex-col"
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            if (touchStartX.current === null) return
            const diff = e.changedTouches[0].clientX - touchStartX.current
            if (diff > 50) setLightbox((lightbox - 1 + items.length) % items.length)
            if (diff < -50) setLightbox((lightbox + 1) % items.length)
            touchStartX.current = null
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/50 text-[13px]">{lightbox + 1} / {items.length}</span>
            <p className="font-inter font-semibold text-white text-[14px] truncate mx-4 flex-1 text-center">
              {items[lightbox]?.title}
            </p>
            <button
              className="liquid-glass rounded-full p-2.5 text-white hover:text-brand-orange transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Image — fills all available height */}
          <div className="flex-1 flex items-center justify-center px-2 overflow-hidden">
            <img
              src={items[lightbox]?.image}
              alt={items[lightbox]?.title}
              className="w-full h-full object-contain rounded-xl"
              style={{ maxHeight: 'calc(100dvh - 110px)' }}
            />
          </div>

          {/* Bottom nav */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-6 py-4 shrink-0">
              <button
                className="liquid-glass rounded-full p-3 text-white hover:text-brand-orange transition-colors"
                onClick={() => setLightbox((lightbox - 1 + items.length) % items.length)}
              >
                <ChevronLeft size={28} />
              </button>
              <span className="text-white/30 text-[11px] hidden sm:block">ESC для закрытия</span>
              <button
                className="liquid-glass rounded-full p-3 text-white hover:text-brand-orange transition-colors"
                onClick={() => setLightbox((lightbox + 1) % items.length)}
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
