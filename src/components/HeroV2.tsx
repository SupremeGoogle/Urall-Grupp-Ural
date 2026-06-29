import { useEffect, useRef } from 'react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function HeroV2({ content }: Props) {
  const { hero, company } = content
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = countRef.current
    if (!el) return
    const target = parseInt(content.stats[1]?.value ?? '500')
    let start = 0
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { el.textContent = target + '+'; clearInterval(timer) }
      else el.textContent = start + '+'
    }, 25)
    return () => clearInterval(timer)
  }, [content.stats])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#f97316 1px,transparent 1px),linear-gradient(90deg,#f97316 1px,transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="liquid-glass text-[10px] font-semibold tracking-[0.2em] text-white/60 uppercase px-5 py-2 rounded-full">
            {hero.badge}
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-center font-bold leading-tight mb-2">
          <span className="block text-3xl md:text-5xl lg:text-6xl text-white tracking-tight">
            {hero.title}
          </span>
          <span className="block text-4xl md:text-6xl lg:text-7xl text-brand-orange tracking-tight">
            {hero.titleAccent}
          </span>
          <span className="block text-xl md:text-3xl text-white/60 mt-2 font-medium tracking-widest uppercase">
            {hero.subtitle}
          </span>
        </h1>

        {/* Price + CTA */}
        <div className="flex flex-col items-center gap-4 mt-10 mb-12">
          <p className="text-white/50 text-sm tracking-widest uppercase">фундамент под ключ</p>
          <p className="text-4xl md:text-5xl font-bold text-brand-orange">{hero.priceFrom}!</p>
          <a
            href="#contact"
            className="mt-2 bg-brand-orange hover:bg-orange-400 text-black font-bold text-sm tracking-[0.2em] uppercase px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-orange/30"
          >
            {hero.cta}
          </a>
        </div>

        {/* 3 advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {hero.advantages.map((adv, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-brand-orange/30 transition-all duration-300 group">
              <span className="text-3xl">{adv.icon}</span>
              <p className="font-bold text-white text-sm tracking-wide">{adv.title}</p>
              <p className="text-white/50 text-xs leading-relaxed">{adv.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="flex justify-center">
          <div className="liquid-glass rounded-full px-8 py-3 flex items-center gap-3">
            <span className="text-brand-orange text-lg">{hero.rating}</span>
            <span className="text-white font-bold text-lg"><span ref={countRef}>0+</span></span>
            <span className="text-white/50 text-sm">Уже более {hero.clientsCount} клиентов выбрали нас!</span>
          </div>
        </div>

        {/* Phone */}
        <div className="flex justify-center mt-6">
          <a href={`tel:${company.phone}`} className="text-white/40 hover:text-brand-orange text-sm tracking-widest transition-colors duration-200">
            {company.phoneDisplay} · {company.hours}
          </a>
        </div>
      </div>
    </section>
  )
}
