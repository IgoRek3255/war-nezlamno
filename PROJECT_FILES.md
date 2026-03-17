# 📋 Список файлів проекту WarNezlamno

## 📂 Структура директорій

```
WarNezlamno/
│
├── 📄 index.html              # HTML entry point
├── 📄 package.json            # Залежності та scripts
├── 📄 vite.config.js          # Vite конфігурація
├── 📄 tailwind.config.js      # Tailwind CSS конфігурація
├── 📄 postcss.config.js       # PostCSS конфігурація
├── 📄 .eslintrc.json          # ESLint конфігурація
├── 📄 .prettierrc             # Prettier конфігурація
├── 📄 .gitignore             # Git ignore rules
├── 📄 .env.example           # Приклад environment variables
│
├── 📄 README.md              # Основна документація
├── 📄 DEVELOPMENT.md         # Посібник розробника
├── 📄 QUICKSTART.md          # Швидкий старт
│
└── 📁 src/
    ├── 📄 main.jsx                 # React entry point
    ├── 📄 App.jsx                  # Головний компонент з маршрутизацією
    ├── 📄 globals.css              # Глобальні стилі
    ├── 📄 store.js                 # Zustand state store
    ├── 📄 data.js                  # Дані укриттів та утилітарні функції
    │
    ├── 📁 pages/
    │   ├── 📄 Home.jsx            # Головна сторінка
    │   ├── 📄 Map.jsx             # Сторінка з інтерактивною картою
    │   ├── 📄 Favorites.jsx       # Сторінка обраних укриттів
    │   └── 📄 AboutUs.jsx         # Сторінка про проект
    │
    └── 📁 components/
        ├── 📄 Header.jsx          # Навігаційний заголовок
        ├── 📄 Footer.jsx          # Нижній колонтитул
        └── 📄 ShelterCard.jsx     # Карточка укриття
```

## 📝 Опис Файлів

### Configuration Files (Конфігураційні файли)

| Файл | Опис |
|-----|------|
| `package.json` | Залежності, версія та npm scripts |
| `vite.config.js` | Конфігурація Vite build tool |
| `tailwind.config.js` | Кастомізація Tailwind CSS |
| `postcss.config.js` | PostCSS і Autoprefixer конфігурація |
| `.eslintrc.json` | Правила для ESLint |
| `.prettierrc` | Правила форматування кода |
| `.gitignore` | Файли які ігнорує git |
| `.env.example` | Приклад змінних середовища |

### Documentation Files (Документація)

| Файл | Опис |
|-----|------|
| `README.md` | Основна документація проекту |
| `DEVELOPMENT.md` | Посібник для розробників |
| `QUICKSTART.md` | Швидкий старт для користувачів |
| `PROJECT_FILES.md` | Список всіх файлів (цей файл) |

### HTML Entry Point

| Файл | Опис |
|-----|------|
| `index.html` | HTML шаблон для React додатку |

### React Source Files (React Компоненти)

| Файл | Опис |
|-----|------|
| `src/main.jsx` | React DOM render point |
| `src/App.jsx` | Головний компонент з маршрутизацією |
| `src/globals.css` | Глобальні стилі та Tailwind імпорт |
| `src/store.js` | Zustand store для управління станом |
| `src/data.js` | Дані укриттів, утилітарні функції |

### Pages (Сторінки)

| Файл | Описание |
|-----|---------|
| `src/pages/Home.jsx` | 🏠 Головна сторінка з пошуком та топ укриттями |
| `src/pages/Map.jsx` | 🗺️ Інтерактивна карта з Leaflet |
| `src/pages/Favorites.jsx` | ❤️ Сторінка обраних укриттів |
| `src/pages/AboutUs.jsx` | ℹ️ Інформація про проект та FAQ |

### Components (Компоненти)

| Файл | Опис |
|-----|------|
| `src/components/Header.jsx` | Навігація та темний режим |
| `src/components/Footer.jsx` | Нижній колонтитул з контактами |
| `src/components/ShelterCard.jsx` | Карточка укриття з рейтингом |

## 🔄 Залежності

### Main Dependencies

- **react**: ^18.2.0 - UI бібліотека
- **react-dom**: ^18.2.0 - React DOM
- **react-router-dom**: ^6.20.0 - Маршрутизація
- **leaflet**: ^1.9.4 - Бібліотека для карт
- **react-leaflet**: ^4.2.1 - React компоненти для Leaflet
- **zustand**: ^4.4.1 - State management
- **lucide-react**: ^0.294.0 - SVG іконки
- **axios**: ^1.6.2 - HTTP клієнт

### Dev Dependencies

- **vite**: ^5.0.8 - Build tool
- **tailwindcss**: ^3.4.1 - Utility CSS
- **postcss**: ^8.4.32 - CSS processor
- **autoprefixer**: ^10.4.16 - CSS prefixes
- **@vitejs/plugin-react**: ^4.2.1 - Vite React поддержка
- **eslint**: ^8.55.0 - Code linter
- **eslint-plugin-react**: ^7.33.2 - React eslint правила

## 🚀 NPM Scripts

```bash
npm run dev          # Запуск dev сервера
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Запуск ESLint
```

## 📊 Статичні дані

### Укриття (src/data.js)

8 укриттів з вірогідно розташованими координатами на карті Києва:
- 5 метро станцій
- 3 укриття

Кожне укриття містить:
- Назва, адреса, координати
- Місткість, рейтинг, кількість відгуків
- Опис та список зручностей

## 🎨 Дизайн

### Кольорова Схема

| Назва | Light | Dark |
|-------|-------|------|
| Primary | Blue-600 | Blue-400 |
| BG | White | #0f172a |
| Card | White | #1e293b |
| Border | Gray-300 | #334155 |

### Шрифти

- System fonts: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto

### CSS Classes

- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.card` - Card component
- `.input-field` - Input field
- `.shimmer` - Loading animation

## 📱 Адаптивність

- Mobile first approach
- Tailwind CSS breakpoints (sm, md, lg)
- Touch-friendly UI
- Responsive images and maps

## 🔒 Безпека

- Локальне зберігання даних (localStorage)
- Жодна чутлива інформація на сервері
- CORS не потрібен
- HTTPS рекомендується для production

## 🎯 Производительность

**Оптимізації:**
- Lazy loading компонентів
- Code splitting з Vite
- Мінімізація CSS та JS
- Кеширування з localStorage
- Оптимізовані зображення

---

**Остання оновлення:** February 2026  
**Версія проекту:** 1.0.0  
**Статус:** ✅ Production Ready
