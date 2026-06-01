import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { ZoomParallax } from './ui/ZoomParallax'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function Portfolio({ content }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null)
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

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 liquid-glass rounded-full p-3 text-white hover:text-brand-orange transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>

          {items.length > 1 && (
            <button
              className="absolute left-4 liquid-glass rounded-full p-3 text-white hover:text-brand-orange transition-colors z-10"
              onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + items.length) % items.length) }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="max-w-5xl max-h-[85vh] mx-16 flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
            <img
              src={items[lightbox]?.image}
              alt={items[lightbox]?.title}
              className="max-h-[78vh] max-w-full object-contain rounded-xl"
            />
            <p className="font-inter font-semibold text-white text-[16px]">{items[lightbox]?.title}</p>
            <p className="text-white/30 text-[12px]">{lightbox + 1} / {items.length} · ESC для закрытия</p>
          </div>

          {items.length > 1 && (
            <button
              className="absolute right-4 liquid-glass rounded-full p-3 text-white hover:text-brand-orange transition-colors z-10"
              onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % items.length) }}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </section>
  )
}
