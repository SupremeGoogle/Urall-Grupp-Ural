import { useState, useEffect } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function Header({ content }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Услуги', href: '#services' },
    { label: 'О нас', href: '#about' },
    { label: 'Работы', href: '#portfolio' },
    { label: 'Контакты', href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-4 liquid-glass' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group transition-transform hover:scale-105">
          <span className="font-inter font-bold text-white text-[20px] tracking-tight">
            Urall<span className="text-brand-orange">-</span>Grupp
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-2 py-2">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-medium tracking-[0.12em] text-white/80 hover:text-white px-4 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200 uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${content.company.phone}`}
            className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-white/90 hover:text-white transition-all duration-200 hover:bg-white/5"
          >
            <Phone size={12} strokeWidth={2} />
            {content.company.phoneDisplay}
          </a>
          <a
            href="#contact"
            className="bg-brand-orange hover:bg-orange-400 text-black rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] transition-all duration-200 hover:scale-105 uppercase"
          >
            Расчёт цены
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden liquid-glass rounded-full p-2.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden liquid-glass border-t border-white/5 mt-2 px-6 py-4 flex flex-col gap-3">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[13px] font-medium tracking-wide text-white/80 hover:text-white py-2 border-b border-white/5 uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${content.company.phone}`}
            className="flex items-center gap-2 text-brand-orange font-semibold py-2"
          >
            <Phone size={16} />
            {content.company.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  )
}
