import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function PromoBanner({ content }: Props) {
  const { promo } = content
  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden border border-brand-orange/30 p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
          {/* Background photo */}
          <img
            src="/works/work4.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            loading="lazy"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-brand-orange/10" />
          {/* Glow */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-brand-orange/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative flex-1">
            <span className="inline-block bg-brand-orange text-black font-black text-[10px] tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-4">
              {promo.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{promo.title}</h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl">{promo.text}</p>
          </div>

          <a
            href="#contact"
            className="relative shrink-0 bg-brand-orange hover:bg-orange-400 text-black font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-orange/30"
          >
            УЗНАТЬ ПОДРОБНЕЕ
          </a>
        </div>
      </div>
    </section>
  )
}
