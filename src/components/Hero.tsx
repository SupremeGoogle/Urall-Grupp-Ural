import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ChevronDown, Lock } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function Hero({ content }: Props) {
  const bgRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Mouse parallax on background
  useEffect(() => {
    let currentX = 0, currentY = 0, targetX = 0, targetY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetX = ((e.clientX - cx) / cx) * 15
      targetY = ((e.clientY - cy) / cy) * 10
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05
      if (bgRef.current) {
        gsap.set(bgRef.current, { x: currentX, y: currentY })
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Background image with parallax */}
      <div className="absolute inset-0 scale-[1.08] origin-center" ref={bgRef}>
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        {/* Orange vignette bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Animated orange accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-60" />

      {/* Hero headline — centered, fixed top */}
      <div
        ref={headlineRef}
        className={`relative z-20 flex-1 flex flex-col items-center justify-center pt-28 px-6 text-center transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Badge */}
        <div className="liquid-glass rounded-full px-4 py-1.5 mb-8 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-[11px] font-medium tracking-[0.2em] text-white/80 uppercase">
            {content.hero.badge}
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-inter font-extrabold text-white leading-[1.08] tracking-tight"
          style={{ fontSize: 'clamp(40px, 6vw, 84px)', letterSpacing: '-0.02em' }}
        >
          {content.hero.title}
          <br />
          <span className="text-gradient-orange">{content.hero.titleAccent}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 max-w-[560px] text-[16px] text-white/60 leading-relaxed font-barlow"
          style={{ fontSize: 'clamp(14px, 1.8vw, 17px)' }}
        >
          {content.hero.subtitle}
        </p>

        {/* CTA buttons */}
        <div className={`mt-10 flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <a
            href="#contact"
            className="group flex items-center gap-3 bg-brand-orange hover:bg-orange-400 text-black font-semibold rounded-full px-8 py-4 text-[15px] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] active:scale-[0.97]"
          >
            {content.hero.cta}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="liquid-glass flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-medium text-white/90 hover:text-white transition-all duration-200 hover:bg-white/5"
          >
            {content.hero.ctaSecondary}
          </a>
        </div>

        {/* Trust badge */}
        <div className={`mt-8 flex items-center gap-2 transition-all duration-1000 delay-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}>
          <Lock size={12} strokeWidth={1.5} className="text-white/50" />
          <span className="text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">
            Бесплатный расчёт · Без предоплаты
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={bottomRef}
        className={`relative z-20 flex justify-center pb-10 transition-all duration-1000 delay-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <a href="#services" className="flex flex-col items-center gap-2 group">
          <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-medium">Узнать больше</span>
          <ChevronDown size={18} className="text-white/40 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
