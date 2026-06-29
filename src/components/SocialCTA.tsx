import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

export default function SocialCTA({ content }: Props) {
  const { company } = content
  return (
    <section className="py-16 bg-[#0d0d0d]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          ХОТИТЕ УВИДЕТЬ, ЧТО МЫ ДЕЛАЕМ ПРЯМО СЕЙЧАС?
        </h2>
        <p className="text-white/50 text-sm mb-8 tracking-widest uppercase">ПОДПИШИТЕСЬ НА НАС!</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={company.vk}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 liquid-glass hover:border-blue-500/40 rounded-full px-8 py-4 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 group min-w-[180px] justify-center"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-400">
              <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.576-1.496c.588-.19 1.341 1.26 2.14 1.818.605.422 1.064.33 1.064.33l2.137-.03s1.117-.071.587-.964c-.043-.073-.308-.661-1.588-1.87-1.34-1.264-1.16-1.059.453-3.246.983-1.332 1.376-2.145 1.253-2.493-.117-.332-.84-.244-.84-.244l-2.406.015s-.178-.025-.31.056c-.13.079-.213.265-.213.265s-.382 1.01-.89 1.87c-1.073 1.85-1.503 1.948-1.677 1.833-.408-.267-.306-1.075-.306-1.648 0-1.793.267-2.54-.521-2.733-.262-.064-.454-.107-1.123-.114-.858-.009-1.585.003-1.996.208-.274.135-.485.437-.356.454.159.022.52.099.712.363.246.341.237 1.107.237 1.107s.141 2.11-.33 2.371c-.325.18-.77-.187-1.725-1.865-.49-.844-.86-1.778-.86-1.778s-.07-.181-.198-.278a.833.833 0 0 0-.394-.12l-2.286.014s-.343.01-.469.161c-.112.135-.009.414-.009.414s1.79 4.248 3.815 6.39c1.858 1.967 3.968 1.838 3.968 1.838h.956z"/>
            </svg>
            ВКонтакте
          </a>

          <a
            href={company.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 liquid-glass hover:border-sky-500/40 rounded-full px-8 py-4 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 group min-w-[180px] justify-center"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-sky-400">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.7 8.02c-.12.56-.46.7-.93.43l-2.57-1.9-1.24 1.19c-.14.14-.26.26-.53.26l.19-2.72 4.99-4.5c.22-.19-.05-.3-.34-.11L7.1 14.3l-2.51-.78c-.55-.17-.56-.55.11-.81l9.8-3.78c.46-.17.86.11.71.81l.43-.74z"/>
            </svg>
            Telegram
          </a>
        </div>
      </div>
    </section>
  )
}
