import { useEffect, useRef } from 'react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function About({ content }: Props) {
  const { about } = content
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.about-el').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="about-el opacity-0 translate-y-4 transition-all duration-500 text-brand-orange text-[10px] font-semibold tracking-[0.3em] uppercase mb-4">
              О компании
            </p>
            <h2 className="about-el opacity-0 translate-y-4 transition-all duration-500 text-3xl md:text-4xl font-black text-white mb-2 leading-tight" style={{ transitionDelay: '100ms' }}>
              {about.title}
            </h2>
            <h3 className="about-el opacity-0 translate-y-4 transition-all duration-500 text-3xl md:text-4xl font-black text-brand-orange mb-8" style={{ transitionDelay: '150ms' }}>
              {about.titleAccent}
            </h3>

            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="about-el opacity-0 translate-y-4 transition-all duration-500 text-white/60 text-sm leading-relaxed mb-4"
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                {p}
              </p>
            ))}

            <div
              className="about-el opacity-0 translate-y-4 transition-all duration-500 mt-6 liquid-glass rounded-2xl p-6 border-l-2 border-brand-orange"
              style={{ transitionDelay: '500ms' }}
            >
              <p className="text-white font-semibold text-sm italic">"{about.highlight}"</p>
            </div>
          </div>

          {/* Photo + stats */}
          <div className="flex flex-col gap-4">
            <div className="about-el opacity-0 translate-y-4 transition-all duration-500 relative rounded-2xl overflow-hidden h-56">
              <img
                src="/works/work7.jpg"
                alt="Монтаж свайно-винтового фундамента"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-white font-bold text-sm tracking-wide">Собственное производство и монтаж</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            {content.stats.map((stat, i) => (
              <div
                key={i}
                className="about-el opacity-0 translate-y-4 transition-all duration-500 liquid-glass rounded-2xl p-6 text-center hover:border-brand-orange/30 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-4xl font-black text-brand-orange mb-1 group-hover:scale-110 transition-transform duration-200 inline-block">
                  {stat.value}
                </p>
                <p className="text-white/40 text-xs tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
