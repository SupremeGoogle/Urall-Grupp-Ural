import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

// Replace VIDEO_ID_1/2/3 with actual VK video IDs from vk.com
const videos = [
  { title: 'Монтаж свайного фундамента', id: 'VIDEO_ID_1' },
  { title: 'Производство свай', id: 'VIDEO_ID_2' },
  { title: 'Сдача объекта под ключ', id: 'VIDEO_ID_3' },
]

export default function VideoSection({ content }: Props) {
  const vkPage = content.company.vk

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-orange text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">Видео</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">ОТВЕТСТВЕННАЯ РАБОТА</h2>
          <p className="text-white/40 text-sm">ОЦЕНИТЕ КАЧЕСТВО НАШЕЙ РАБОТЫ!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <div key={i} className="liquid-glass rounded-2xl overflow-hidden">
              {v.id !== 'VIDEO_ID_1' && v.id !== 'VIDEO_ID_2' && v.id !== 'VIDEO_ID_3' ? (
                <iframe
                  src={`https://vk.com/video_ext.php?oid=-${v.id}&hd=1`}
                  className="w-full aspect-video"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                /* Placeholder until real video IDs are added */
                <a
                  href={vkPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center aspect-video bg-gradient-to-br from-brand-orange/10 to-transparent hover:from-brand-orange/20 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-orange/20 flex items-center justify-center mb-3 group-hover:bg-brand-orange/30 transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-brand-orange ml-1">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-white/60 text-xs text-center px-4">{v.title}</p>
                  <p className="text-brand-orange text-[10px] tracking-widest mt-1 uppercase">Смотреть в VK</p>
                </a>
              )}
              <div className="p-4">
                <p className="text-white/70 text-xs">{v.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
