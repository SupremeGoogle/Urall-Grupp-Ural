# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Проект

Корпоративный сайт компании **Urall-Grupp Ural**, Краснодар.  
VK: [vk.ru/ural_grupp_krd](https://vk.ru/ural_grupp_krd)

> Перед началом работы уточнить у заказчика: фирменные цвета, логотип, перечень услуг, контактные данные, фото объектов. Пока используются placeholder-значения в `src/style.css`.

---

## Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера (localhost:3000)
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр собранного сайта
npm run preview
```

---

## Стек и архитектура

**Сборщик:** Vite 6 (vanilla JS — без фреймворка, максимум производительности для статического сайта)  
**Стили:** Чистый CSS с CSS-переменными (без Tailwind/Bootstrap)  
**Структура:**

```
index.html              — точка входа
vite.config.js
src/
  main.js               — инициализация, подключение секций
  style.css             — глобальные стили и CSS-переменные бренда
  components/           — переиспользуемые UI-компоненты (header, footer, карточки)
  sections/             — секции страницы (hero, services, about, contacts)
  assets/
    images/             — фото объектов, команды
    icons/              — SVG-иконки
    fonts/              — локальные шрифты
public/                 — статика (favicon, og-image, robots.txt)
```

---

## Modern Web Guidance (обязательно)

Установлен скилл `modern-web-guidance` от Google Chrome. **Использовать перед реализацией любого UI-компонента:**

```bash
# Найти нужное руководство
npx -y modern-web-guidance@latest search "<описание задачи>" --skill-version 2026_05_16-c5e7870

# Посмотреть все доступные руководства
npx -y modern-web-guidance@latest list

# Получить конкретное руководство по id
npx -y modern-web-guidance@latest retrieve "<id>"
```

Скилл покрывает: модальные окна, popover, анимации на скролле, View Transitions, формы с автозаполнением, оптимизацию LCP/INP, container queries и др.

---

## CSS-переменные бренда

Все цвета и типографика — через переменные в `src/style.css`. Менять только там:

```css
:root {
  --color-primary: /* основной цвет компании */;
  --color-accent:  /* акцентный цвет */;
  --color-bg:      #ffffff;
  --color-text:    #1a1a1a;
  --font-main:     /* шрифт бренда */;
}
```

---

## Требования к производительности

- Изображения — WebP/AVIF с `<picture>` fallback, `loading="lazy"` для офскрин.
- LCP-изображение (hero) — `fetchpriority="high"`, без lazy.
- Шрифты — `font-display: swap`, предпочтительно системные или subset.
- Не подключать тяжёлые библиотеки (jQuery, Bootstrap) без явной необходимости.

---

## Что нужно уточнить у заказчика

- [ ] Логотип (SVG + PNG)
- [ ] Фирменные цвета (hex)
- [ ] Шрифт бренда
- [ ] Перечень услуг с описаниями
- [ ] Фотографии объектов / команды
- [ ] Контактные данные (телефон, адрес, email, соцсети)
- [ ] Нужна ли форма заявки (и куда слать — email / CRM)
- [ ] Домен для деплоя
