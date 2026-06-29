import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function FAQ({ content }: Props) {
  const { faq } = content
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0') }),
      { threshold: 0.05 }
    )
    ref.current?.querySelectorAll('.faq-item').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-orange text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{faq.title}</h2>
          <p className="text-white/40 text-sm">{faq.subtitle}</p>
        </div>

        <div ref={ref} className="flex flex-col gap-3">
          {faq.items.map((item, i) => (
            <div
              key={i}
              className="faq-item opacity-0 translate-y-4 transition-all duration-500 liquid-glass rounded-2xl overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-bold text-white text-sm tracking-wide group-hover:text-brand-orange transition-colors duration-200 uppercase">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-brand-orange transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${open === i ? 'max-h-96' : 'max-h-0'}`}
              >
                <p className="px-6 pb-5 text-white/60 text-sm leading-relaxed whitespace-pre-line border-t border-white/5 pt-4">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
