import { useEffect, useRef } from 'react'
import type { SiteContent } from '../data/content'
import Icon from './ui/Icon'

interface Props { content: SiteContent }

export default function FiveAdvantages({ content }: Props) {
  const { fiveAdvantages } = content
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-x-0') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.five-item').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-orange text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">Почему мы</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{fiveAdvantages.title}</h2>
          <p className="text-white/40 text-sm">{fiveAdvantages.subtitle}</p>
        </div>

        <div ref={ref} className="flex flex-col gap-4">
          {fiveAdvantages.items.map((item, i) => (
            <div
              key={i}
              className="five-item opacity-0 -translate-x-6 transition-all duration-500 flex items-start gap-5 liquid-glass rounded-2xl px-6 py-5 hover:border-brand-orange/20 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors duration-200">
                <Icon name={item.icon} size={20} className="text-brand-orange" />
              </div>
              <div className="flex items-start gap-4">
                <span className="shrink-0 text-brand-orange font-black text-lg mt-0.5">0{i + 1}</span>
                <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-200">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
