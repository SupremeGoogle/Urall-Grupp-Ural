export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface SiteContent {
  company: {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    phoneDisplay: string;
    vk: string;
    address: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  services: Service[];
  stats: Stat[];
  about: {
    title: string;
    titleAccent: string;
    paragraphs: string[];
    highlight: string;
  };
  portfolio: PortfolioItem[];
  contact: {
    title: string;
    subtitle: string;
  };
}

export const defaultContent: SiteContent = {
  company: {
    name: 'Urall-Grupp',
    tagline: 'Фундамент вашего будущего',
    description: 'Производство и монтаж свайно-винтовых фундаментов в Краснодаре и по всему ЮФО',
    phone: '89180368866',
    phoneDisplay: '8 918 036 88 66',
    vk: 'https://vk.ru/ural_grupp_krd',
    address: 'Краснодар, Краснодарский край',
  },
  hero: {
    badge: 'Краснодар · ЮФО · Вся Россия',
    title: 'Свайно-винтовой',
    titleAccent: 'фундамент под ключ',
    subtitle: 'Производство и монтаж в Краснодаре. Работаем по всему ЮФО и за его пределами. Собственные сваекруты, контроль качества на каждом этапе.',
    cta: 'Получить расчёт',
    ctaSecondary: 'Наши работы',
  },
  services: [
    {
      id: 'foundation',
      icon: '⚙️',
      title: 'Свайно-винтовой фундамент',
      description: 'Производим и монтируем свайно-винтовые фундаменты для любых объектов — от дачных домиков до коммерческих строений.',
      features: [
        'Производство собственных свай',
        'Монтаж за 1–2 дня',
        '4 сваекрута в парке',
        'Расчёт нагрузок бесплатно',
      ],
    },
    {
      id: 'install',
      icon: '🏗️',
      title: 'Монтаж по всему ЮФО',
      description: 'Выезжаем в любую точку Южного федерального округа и за его пределами. Собственная техника и опытная команда.',
      features: [
        'Краснодарский край',
        'Ростовская область',
        'Ставропольский край',
        'Крым и другие регионы',
      ],
    },
    {
      id: 'wood',
      icon: '🪵',
      title: 'Деревянные домокомплекты',
      description: 'Производим домокомплекты из мини-бруса — дачные домики, бани, бытовки, хоз.блоки. Дома из двойного бруса для круглогодичного проживания.',
      features: [
        'Дачные домики и бани',
        'Бытовки и хоз.блоки',
        'Дома из двойного бруса',
        'Для круглогодичного проживания',
      ],
    },
  ],
  stats: [
    { value: '4', label: 'Сваекрута в парке' },
    { value: '500+', label: 'Объектов сдано' },
    { value: '8', label: 'Лет на рынке' },
    { value: '12', label: 'Регионов России' },
  ],
  about: {
    title: 'О компании',
    titleAccent: 'Urall-Grupp',
    paragraphs: [
      'Мы производим свайно-винтовой фундамент в Краснодаре. Осуществляем монтаж по всему ЮФО и за его пределами.',
      'У нас 4 сваекрута на данный момент, два из них собственного производства. Ещё два на подходе.',
      'Помимо свай, у нас есть линия по производству деревянных домокомплектов из мини-бруса — дачные домики, бани, бытовки, хоз.блоки и т.д. Также мы можем изготовить дом из двойного бруса для круглогодичного проживания.',
    ],
    highlight: 'Собственное производство — контроль качества на каждом этапе',
  },
  portfolio: [
    {
      id: '1',
      title: 'Свайное поле под большой объект',
      category: 'Фундамент',
      image: '/works/work1.jpg',
    },
    {
      id: '2',
      title: 'Стальной ростверк на сваях',
      category: 'Фундамент',
      image: '/works/work4.jpg',
    },
    {
      id: '3',
      title: 'Фундамент для дома в горах',
      category: 'Фундамент',
      image: '/works/work5.jpg',
    },
    {
      id: '4',
      title: 'Деревянный домик на сваях',
      category: 'Домокомплект',
      image: '/works/work3.jpg',
    },
    {
      id: '5',
      title: 'Монтаж домокомплекта из бруса',
      category: 'Домокомплект',
      image: '/works/work2.jpg',
    },
    {
      id: '6',
      title: 'Промышленный фундамент',
      category: 'Фундамент',
      image: '/works/work6.jpg',
    },
    {
      id: '7',
      title: 'Деревянный домокомплект',
      category: 'Домокомплект',
      image: '/works/work7.jpg',
    },
  ],
  contact: {
    title: 'Получить',
    subtitle: 'Свяжитесь с нами для бесплатного расчёта стоимости фундамента или домокомплекта',
  },
};

// Sync read from localStorage (for initial render — no flash)
export function getCachedContent(): SiteContent {
  try {
    const saved = localStorage.getItem('urall_content');
    if (saved) return JSON.parse(saved) as SiteContent;
  } catch {}
  return defaultContent;
}

// Async load: fetch from Supabase, cache in localStorage, fallback to default
export async function loadContent(): Promise<SiteContent> {
  const { fetchSiteContent, persistSiteContent } = await import('../lib/supabase');
  const remote = await fetchSiteContent();
  if (remote) {
    localStorage.setItem('urall_content', JSON.stringify(remote));
    return remote;
  }
  // Supabase empty or unreachable — seed with defaultContent and clear stale cache
  persistSiteContent(defaultContent);
  localStorage.setItem('urall_content', JSON.stringify(defaultContent));
  return defaultContent;
}

// Save to Supabase + localStorage cache
export async function saveContent(content: SiteContent): Promise<boolean> {
  localStorage.setItem('urall_content', JSON.stringify(content));
  const { persistSiteContent, isConfigured } = await import('../lib/supabase');
  // If Supabase env vars are missing — localStorage-only save is still a success
  if (!isConfigured()) return true;
  return persistSiteContent(content);
}

// Keep old name as alias so ContactForm import doesn't break
export const getContent = getCachedContent;
