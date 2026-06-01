import { Phone, MessageCircle } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function Footer({ content }: Props) {
  return (
    <footer className="border-t border-white/5 py-12 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <img src="/logo.jpg" alt="Урал Групп" className="h-10 w-auto object-contain rounded-md"
                style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="text-white/40 text-[13px] max-w-[280px] leading-relaxed">
              {content.company.description}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-1">Навигация</span>
            {['Услуги', 'О нас', 'Работы', 'Контакты'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-white/50 hover:text-white text-[13px] transition-colors">
                {l}
              </a>
            ))}
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-1">Контакты</span>
            <a href={`tel:${content.company.phone}`} className="flex items-center gap-2 text-white/70 hover:text-white text-[13px] transition-colors">
              <Phone size={13} className="text-brand-orange" />
              {content.company.phoneDisplay}
            </a>
            <a href={content.company.vk} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white text-[13px] transition-colors">
              <MessageCircle size={13} className="text-[#4C75A3]" />
              ВКонтакте
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[12px]">
            © {new Date().getFullYear()} {content.company.name}. Все права защищены.
          </p>
          <a href="/admin" className="text-white/15 hover:text-white/40 text-[11px] transition-colors">
            Войти в панель
          </a>
        </div>
      </div>
    </footer>
  )
}
