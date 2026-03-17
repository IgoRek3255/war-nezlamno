# Посібник з розробки

## Встановлення середовища розробки

### Вимоги
- Node.js 16+ (рекомендується 18+)
- npm 8+ або yarn 3+
- Git
- Улюблений код-редактор (VS Code рекомендується)

### Кроки встановлення

1. Установіть Node.js з [nodejs.org](https://nodejs.org)

2. Клонуйте репозиторій:
```bash
git clone https://github.com/yourusername/warnezlamno.git
cd warnezlamno
```

3. Установіть залежності:
```bash
npm install
```

4. Запустіть сервер розробки:
```bash
npm run dev
```

## Розробка

### Запуск сервера розробки
```bash
npm run dev
```
Додаток буде доступний за `http://localhost:3000`

### Структура файлів

```
src/
├── pages/           # Сторінки додатку
├── components/      # Переиспользуемые компоненти
├── store.js         # Zustand store
├── data.js          # Дані та утилітарні функції
├── globals.css      # Глобальні стилі
└── main.jsx         # Entry point
```

###創建новой компоненти

1. Створіть новий файл в папці `src/components/`
2. Експортуйте компонент як default export
3. Імпортуйте ларда де потрібно

Приклад:
```jsx
// src/components/MyComponent.jsx
export default function MyComponent({ prop1, prop2 }) {
  return (
    <div className="card">
      <h1>{prop1}</h1>
      <p>{prop2}</p>
    </div>
  )
}
```

### Роботу з State

Використовуємо Zustand для управління станом. Приклад використання:

```jsx
import { useShelterStore } from '../store'

export default function MyComponent() {
  const { favorites, addFavorite } = useShelterStore()
  
  return (
    <button onClick={() => addFavorite(1)}>
      Add to favorites
    </button>
  )
}
```

### Стилі з Tailwind CSS

Всі стилі пишуться за допомогою Tailwind CSS утилітарних класів:

```jsx
<div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-6">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Hello
  </h1>
</div>
```

## Білд

### Production Build
```bash
npm run build
```

Оптимізований білд буде в папці `dist/`. Не забудьте перевірити білд:

```bash
npm run preview
```

## Debugging

### VS Code Debug Configuration

Створіть `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

## Linting

```bash
npm run lint
```

## Інструменти розробки

### Розширення VS Code (рекомендовані)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Thunder Client (для тестування API)
- Prettier - Code formatter

### Browser DevTools
- React Developer Tools (Chrome/Firefox)
- Redux DevTools (опціонально)

## Best Practices

1. **Компоненти**: Зробіть компоненти маленькими та переиспользуемими
2. **Назви**: Використовуйте kebab-case для файлів, PascalCase для компонентів
3. **Стилі**: Надавайте класи через шаблонні літерали для умовного застосування
4. **Props**: Завжди validiruйте пропси або використовуйте TypeScript
5. **Performance**: Використовуйте React.memo для компонентів що часто перерендерюються

## Часті питання

**Q: Як додати нову сторінку?**  
A: Створіть новий файл в `src/pages/` та додайте Route в `src/App.jsx`

**Q: Як зберегти дані локально?**  
A: Zustand автоматично зберігає дані в localStorage через middleware `persist`

**Q: Як додати нові утилітарні функції?**  
A: Додайте их в `src/data.js` та експортуйте

## Вирішення проблем

### Порт 3000 вже зайнятий
```bash
npm run dev -- --port 3001
```

### Node modules проблеми
```bash
rm -rf node_modules package-lock.json
npm install
```

### Leaflet не показує карту
- Переконайтесь, що CSS від leaflet завантажується
- Проверьте наявність іконок маркерів

## Контрибьютинг

1. Створіть branch: `git checkout -b feature/my-feature`
2. Зроб вит зміни та commit: `git commit -m 'Add my feature'`
3. Push branch: `git push origin feature/my-feature`
4. Відкрийте Pull Request

---

Будь-які питання? Напишіть issue або зв'яжіться з командою розробки!
