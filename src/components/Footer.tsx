import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function Footer({ content }: Props) {
  const { company } = content

  return (
    <footer className="bg-[#060606] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo + desc */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-4">
              <span className="font-inter font-bold text-white text-2xl tracking-tight">
                Urall<span className="text-brand-orange">-</span>Grupp
              </span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">{company.description}</p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={company.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full p-3 hover:border-blue-500/40 transition-all duration-200 hover:scale-110"
                aria-label="ВКонтакте"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-400">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.576-1.496c.588-.19 1.341 1.26 2.14 1.818.605.422 1.064.33 1.064.33l2.137-.03s1.117-.071.587-.964c-.043-.073-.308-.661-1.588-1.87-1.34-1.264-1.16-1.059.453-3.246.983-1.332 1.376-2.145 1.253-2.493-.117-.332-.84-.244-.84-.244l-2.406.015s-.178-.025-.31.056c-.13.079-.213.265-.213.265s-.382 1.01-.89 1.87c-1.073 1.85-1.503 1.948-1.677 1.833-.408-.267-.306-1.075-.306-1.648 0-1.793.267-2.54-.521-2.733-.262-.064-.454-.107-1.123-.114-.858-.009-1.585.003-1.996.208-.274.135-.485.437-.356.454.159.022.52.099.712.363.246.341.237 1.107.237 1.107s.141 2.11-.33 2.371c-.325.18-.77-.187-1.725-1.865-.49-.844-.86-1.778-.86-1.778s-.07-.181-.198-.278a.833.833 0 0 0-.394-.12l-2.286.014s-.343.01-.469.161c-.112.135-.009.414-.009.414s1.79 4.248 3.815 6.39c1.858 1.967 3.968 1.838 3.968 1.838h.956z"/>
                </svg>
              </a>
              <a
                href={company.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full p-3 hover:border-sky-500/40 transition-all duration-200 hover:scale-110"
                aria-label="Telegram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-sky-400">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.7 8.02c-.12.56-.46.7-.93.43l-2.57-1.9-1.24 1.19c-.14.14-.26.26-.53.26l.19-2.72 4.99-4.5c.22-.19-.05-.3-.34-.11L7.1 14.3l-2.51-.78c-.55-.17-.56-.55.11-.81l9.8-3.78c.46-.17.86.11.71.81l.43-.74z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-5">Навигация</h4>
            <ul className="flex flex-col gap-3">
              {[
                ['Услуги', '#services'],
                ['Портфолио', '#portfolio'],
                ['Цены', '#pricing'],
                ['Калькулятор', '#calculator'],
                ['О компании', '#about'],
                ['FAQ', '#faq'],
                ['Контакты', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-white/40 hover:text-brand-orange text-sm transition-colors duration-200">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-5">Контакты</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={`tel:${company.phone}`} className="flex items-start gap-3 text-white/60 hover:text-white transition-colors duration-200">
                  <Phone size={14} className="shrink-0 mt-0.5 text-brand-orange" />
                  <span className="text-sm">{company.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-start gap-3 text-white/60 hover:text-white transition-colors duration-200">
                  <Mail size={14} className="shrink-0 mt-0.5 text-brand-orange" />
                  <span className="text-sm">{company.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/40">
                <MapPin size={14} className="shrink-0 mt-0.5 text-brand-orange" />
                <span className="text-sm">{company.address}</span>
              </li>
              <li className="flex items-start gap-3 text-white/40">
                <Clock size={14} className="shrink-0 mt-0.5 text-brand-orange" />
                <span className="text-sm">{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/20 tracking-widest uppercase">
          <p>© 2025–2026 {company.name}. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-white/40 transition-colors duration-200">Политика конфиденциальности</a>
            <span>Сайт не является публичной офертой</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
