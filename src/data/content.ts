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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PriceRow {
  type: string;
  description: string;
  price: string;
}

export interface SiteContent {
  company: {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    phoneDisplay: string;
    email: string;
    vk: string;
    telegram: string;
    address: string;
    hours: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    priceFrom: string;
    rating: string;
    clientsCount: string;
    advantages: { icon: string; title: string; subtitle: string }[];
  };
  services: Service[];
  stats: Stat[];
  promo: {
    title: string;
    text: string;
    badge: string;
  };
  about: {
    title: string;
    titleAccent: string;
    paragraphs: string[];
    highlight: string;
  };
  production: {
    title: string;
    subtitle: string;
    items: { icon: string; title: string; description: string }[];
  };
  keyAdvantages: {
    title: string;
    subtitle: string;
    items: { icon: string; title: string; description: string }[];
  };
  guarantees: {
    title: string;
    items: { number: string; title: string; description: string }[];
  };
  fiveAdvantages: {
    title: string;
    subtitle: string;
    items: { icon: string; text: string }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    rows: PriceRow[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FAQItem[];
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
    tagline: 'Производство и монтаж свайно-винтовых фундаментов в Краснодаре и по всему ЮФО',
    description: 'Производство и монтаж свайно-винтовых фундаментов в Краснодаре и по всему ЮФО',
    phone: '89180368866',
    phoneDisplay: '8 918 036 88 66',
    email: 'ural@yandex.ru',
    vk: 'https://vk.ru/ural_grupp_krd',
    telegram: 'https://t.me/ural_grupp_krd',
    address: 'г. Краснодар, Краснодарский край',
    hours: 'ПН-ВС: с 08:00 до 20:00',
  },
  hero: {
    badge: 'Краснодар · ЮФО · Вся Россия',
    title: 'ФУНДАМЕНТ НА ВИНТОВЫХ СВАЯХ',
    titleAccent: 'ПОД КЛЮЧ',
    subtitle: 'В КРАСНОДАРСКОМ КРАЕ',
    cta: 'РАССЧИТАТЬ ЦЕНУ',
    ctaSecondary: 'Наши работы',
    priceFrom: 'от 35 000₽',
    rating: '★★★★★',
    clientsCount: '500+',
    advantages: [
      {
        icon: '🏭',
        title: 'СОБСТВЕННОЕ ПРОИЗВОДСТВО',
        subtitle: 'Производим винтовые сваи с 2015 года',
      },
      {
        icon: '⚡',
        title: 'МОНТАЖ ЗА 1 ДЕНЬ',
        subtitle: 'Монтаж под ключ за 1 день в любое время года',
      },
      {
        icon: '🛡️',
        title: 'ГАРАНТИЯ 25 ЛЕТ!',
        subtitle: 'Гарантия по договору в течение 25 лет',
      },
    ],
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
      description: 'Производим домокомплекты из мини-бруса — дачные домики, бани, бытовки, хоз.блоки.',
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
  promo: {
    badge: 'АКЦИЯ',
    title: 'ВНИМАНИЕ! АКЦИЯ!',
    text: 'Свая 89/2000мм. со стенкой 4мм. (лопастная) из новой трубы ГОСТ всего за 5 500₽ под ключ',
  },
  about: {
    title: 'ДОБРО ПОЖАЛОВАТЬ В',
    titleAccent: 'URALL-GRUPP!',
    paragraphs: [
      'Мы производим свайно-винтовые фундаменты в Краснодаре и осуществляем монтаж по всему ЮФО. Работаем с 2015 года — за это время сдали более 500 объектов.',
      'У нас 4 сваекрута, два из которых собственного производства. Помимо свайных фундаментов мы производим деревянные домокомплекты из мини-бруса — дачные домики, бани, бытовки.',
      'Собственное производство позволяет нам контролировать качество на каждом этапе и давать расширенную гарантию 25 лет по договору.',
    ],
    highlight: 'Качество и профессиональный подход, проверенные временем',
  },
  production: {
    title: 'СОБСТВЕННОЕ ПРОИЗВОДСТВО',
    subtitle: 'У НАС СОВРЕМЕННОЕ АВТОМАТИЗИРОВАННОЕ ПРОИЗВОДСТВО ВИНТОВЫХ СВАЙ В СТРОГОМ СООТВЕТСТВИИ С ГОСТ',
    items: [
      { icon: '📅', title: 'С 2015 года', description: 'Собственное производство винтовых свай с 2015 года' },
      { icon: '📋', title: 'СТРОГО по ГОСТ', description: 'Все сваи проходят проверку и изготавливаются строго по ГОСТу' },
      { icon: '⚡', title: 'ПЛАЗМЕННАЯ РЕЗКА', description: 'Используем станки плазменной резки для достижения идеальной геометрии' },
      { icon: '🔧', title: 'КАЧЕСТВЕННАЯ СВАРКА', description: 'Вся сварка выполняется сварщиками с опытом не менее 10 лет' },
      { icon: '✅', title: 'ДВОЙНОЙ КОНТРОЛЬ', description: 'Сваи проходят двойную проверку перед отправкой на объект' },
    ],
  },
  keyAdvantages: {
    title: 'НАШИ КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА',
    subtitle: 'ВСЕ УСЛОВИЯ ДЛЯ МАКСИМАЛЬНО КОМФОРТНОГО ВЗАИМОДЕЙСТВИЯ С НАШЕЙ КОМПАНИЕЙ',
    items: [
      { icon: '🎯', title: 'ТОЧНЫЙ РАСЧЁТ', description: 'Расчёт фундамента дистанционно с точностью до 95%' },
      { icon: '💰', title: 'РЕАЛЬНЫЕ ЦИФРЫ', description: 'Доступные цены, точный расчёт и фиксация стоимости в договоре' },
      { icon: '🏆', title: 'ЛУЧШИЕ МАТЕРИАЛЫ', description: 'Используем лучшие материалы для производства винтовых свай' },
      { icon: '👷', title: 'НАДЁЖНЫЙ МОНТАЖ', description: 'Профессиональные монтажники с опытом не менее 10 лет' },
      { icon: '📝', title: 'ДОГОВОР', description: 'Работаем официально — заключаем договор на все виды работ' },
      { icon: '🚗', title: 'ВЫЕЗД НА ОБЪЕКТ', description: 'Бесплатный выезд специалиста для оценки и расчёта' },
    ],
  },
  guarantees: {
    title: 'МЫ ДАЁМ ВАМ ТРИ ГАРАНТИИ',
    items: [
      {
        number: '01',
        title: 'ГАРАНТИЯ ПРОЗРАЧНОЙ ЦЕНЫ',
        description: 'Стоимость фиксируется в момент подписания договора и не изменяется в ходе работ. Никаких скрытых доплат.',
      },
      {
        number: '02',
        title: 'ГАРАНТИЯ КАЧЕСТВА',
        description: 'Изготовление свай по ГОСТ, монтаж по СНиП. Двойная проверка качества каждой сваи перед отправкой.',
      },
      {
        number: '03',
        title: '100% ГАРАНТИЯ 25 ЛЕТ',
        description: 'Даём расширенную гарантию 25 лет с момента завершения работ, зафиксированную в договоре.',
      },
    ],
  },
  fiveAdvantages: {
    title: 'ЕЩЁ 5 ПРЕИМУЩЕСТВ НАШЕЙ РАБОТЫ',
    subtitle: 'ПОЧЕМУ УЖЕ 500+ КЛИЕНТОВ В КРАСНОДАРСКОМ КРАЕ ВЫБРАЛИ НАС?',
    items: [
      { icon: '🔍', text: 'Производим пробное бурение для 100% определения несущей способности грунта' },
      { icon: '💧', text: 'Дополнительная гидроизоляция свай на стыке «грунт-атмосфера» продлевает срок эксплуатации почти в 3 раза' },
      { icon: '📐', text: 'Индивидуальный расчёт фундамента под ваш объект без навязывания дополнительных услуг' },
      { icon: '🚜', text: 'Компактное оборудование для монтажа свай в труднодоступных местах' },
      { icon: '🏭', text: 'Производство свай в заводских условиях на профессиональном оборудовании плазменной резки с ЧПУ' },
    ],
  },
  pricing: {
    title: 'ПРИМЕРНАЯ СТОИМОСТЬ ТИПОВЫХ ФУНДАМЕНТОВ ПОД КЛЮЧ',
    subtitle: 'Точную стоимость рассчитываем индивидуально после заявки',
    rows: [
      { type: 'Дом', description: 'Фундамент для дома 8×8', price: 'от 145 000₽' },
      { type: 'Баня', description: 'Фундамент для бани 3×5', price: 'от 35 000₽' },
      { type: 'Дача', description: 'Фундамент для дачного дома 4×5', price: 'от 65 000₽' },
      { type: 'Забор', description: 'Свайный фундамент под забор', price: 'от 25 000₽' },
    ],
  },
  faq: {
    title: 'ОСТАЛИСЬ ВОПРОСЫ?',
    subtitle: 'ОТВЕЧАЕМ НА ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ',
    items: [
      {
        question: 'В ЧЁМ ПРЕИМУЩЕСТВО СВАЙНЫХ ФУНДАМЕНТОВ?',
        answer: 'Свайно-винтовой фундамент — быстро, доступно и надёжно. Монтаж занимает 1 день в любое время года, включая зиму. Стоимость в разы ниже ленточного фундамента. Подходит для любого грунта, в том числе проблемного — пучинистого, заболоченного, с перепадом высот. Срок службы при правильном монтаже — более 50 лет.',
      },
      {
        question: 'КАК ПРОИЗВОДИТСЯ МОНТАЖ СВАЙНОГО ФУНДАМЕНТА?',
        answer: '1. Проектирование с учётом постройки, грунта и рельефа.\n2. Разметка участка по проекту.\n3. Завинчивание свай механизированным или ручным способом.\n4. Подрезка свай по уровню.\n5. Бетонирование свай (по желанию).\n6. Установка оголовков или ростверка.\n7. Финальный контроль горизонтали и вертикали.',
      },
      {
        question: 'КАКОЙ МИНИМАЛЬНЫЙ РАЗМЕР СВАИ ДЛЯ ФУНДАМЕНТА?',
        answer: 'Мы производим сваи диаметром от 57 до 159 мм и длиной до 12 метров. Подбор зависит от типа постройки, нагрузки и характеристик грунта. Для лёгких дачных домиков достаточно сваи 76 мм, для капитальных домов подбираем 108–133 мм.',
      },
      {
        question: 'СКОЛЬКО ВРЕМЕНИ ЗАНИМАЕТ МОНТАЖ?',
        answer: 'В среднем монтаж фундамента под ключ занимает один рабочий день. Работаем в том числе в выходные и праздники. Точный срок зависит от количества свай и особенностей объекта.',
      },
      {
        question: 'КАКИЕ ГАРАНТИИ, ЧТО ФУНДАМЕНТ НЕ ПОВЕДЁТ?',
        answer: 'Технология винтовых свай проверена десятилетиями. Сваи уходят ниже уровня промерзания в плотный слой грунта. Расчёт ведётся с запасом прочности. Под землёй нет кислорода — коррозия минимальна. Дополнительно наносим гидроизоляцию на стыке грунт-атмосфера. Даём гарантию 25 лет по договору.',
      },
    ],
  },
  portfolio: [
    { id: '1', title: 'Свайное поле под большой объект', category: 'Фундамент', image: '/works/work1.jpg' },
    { id: '2', title: 'Стальной ростверк на сваях', category: 'Фундамент', image: '/works/work4.jpg' },
    { id: '3', title: 'Фундамент для дома в горах', category: 'Фундамент', image: '/works/work5.jpg' },
    { id: '4', title: 'Деревянный домик на сваях', category: 'Домокомплект', image: '/works/work3.jpg' },
    { id: '5', title: 'Монтаж домокомплекта из бруса', category: 'Домокомплект', image: '/works/work2.jpg' },
    { id: '6', title: 'Промышленный фундамент', category: 'Фундамент', image: '/works/work6.jpg' },
    { id: '7', title: 'Деревянный домокомплект', category: 'Домокомплект', image: '/works/work7.jpg' },
  ],
  contact: {
    title: 'ПОЛУЧИТЬ РАСЧЁТ',
    subtitle: 'Свяжитесь с нами для бесплатного расчёта стоимости фундамента или домокомплекта',
  },
};

function isValidContent(data: unknown): data is SiteContent {
  if (!data || typeof data !== 'object') return false;
  const c = data as Record<string, unknown>;
  return !!(c.company && c.hero && c.services && c.about && c.portfolio && c.contact);
}

export function getCachedContent(): SiteContent {
  try {
    const saved = localStorage.getItem('urall_content_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (isValidContent(parsed)) return parsed;
      localStorage.removeItem('urall_content_v2');
    }
  } catch {}
  return defaultContent;
}

export async function loadContent(): Promise<SiteContent> {
  const { fetchSiteContent, persistSiteContent } = await import('../lib/supabase');
  const remote = await fetchSiteContent();
  if (remote) {
    localStorage.setItem('urall_content_v2', JSON.stringify(remote));
    return remote;
  }
  persistSiteContent(defaultContent);
  localStorage.setItem('urall_content_v2', JSON.stringify(defaultContent));
  return defaultContent;
}

export async function saveContent(content: SiteContent): Promise<boolean> {
  localStorage.setItem('urall_content_v2', JSON.stringify(content));
  const { persistSiteContent, isConfigured } = await import('../lib/supabase');
  if (!isConfigured()) return true;
  return persistSiteContent(content);
}

export const getContent = getCachedContent;
