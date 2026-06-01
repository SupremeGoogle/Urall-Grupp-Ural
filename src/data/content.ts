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
      title: 'Фундамент для частного дома',
      category: 'Фундамент',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    },
    {
      id: '2',
      title: 'Монтаж свай под баню',
      category: 'Фундамент',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
    {
      id: '3',
      title: 'Дачный домик из мини-бруса',
      category: 'Домокомплект',
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80',
    },
    {
      id: '4',
      title: 'Баня под ключ',
      category: 'Домокомплект',
      image: 'https://images.unsplash.com/photo-1520984032042-162d526883e0?w=800&q=80',
    },
    {
      id: '5',
      title: 'Промышленный объект',
      category: 'Фундамент',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    },
    {
      id: '6',
      title: 'Жилой дом из двойного бруса',
      category: 'Домокомплект',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    },
  ],
  contact: {
    title: 'Получить',
    subtitle: 'Свяжитесь с нами для бесплатного расчёта стоимости фундамента или домокомплекта',
  },
};

// Load from localStorage (admin edits) or use default
export function getContent(): SiteContent {
  try {
    const saved = localStorage.getItem('urall_content');
    if (saved) return JSON.parse(saved) as SiteContent;
  } catch {}
  return defaultContent;
}

export function saveContent(content: SiteContent): void {
  localStorage.setItem('urall_content', JSON.stringify(content));
}
