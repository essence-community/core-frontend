# Essence Constructor Website - Rsbuild

Этот проект использует [Rsbuild](https://rsbuild.dev/) - современный сборщик для React приложений.

## Быстрый старт

### 1. Установка зависимостей

```bash
# Установка всех зависимостей
yarn install

# Или используйте автоматический скрипт
node scripts/install-rsbuild.js
```

### 2. Запуск в режиме разработки

```bash
yarn start
```

Приложение будет доступно по адресу: http://localhost:3000

### 3. Сборка для продакшена

```bash
yarn build
```

## Доступные скрипты

- `yarn start` - Запуск в режиме разработки
- `yarn build` - Сборка для продакшена
- `yarn start-localhost` - Запуск с проектом localhost
- `yarn start-mock` - Запуск с проектом mock
- `yarn analyze` - Анализ размера бандла

## Конфигурация

Основная конфигурация находится в файле `rsbuild.config.ts`. Ключевые особенности:

### Module Federation

Поддержка микрофронтендов через Module Federation:

```typescript
pluginModuleFederation({
    name: "essence_core",
    filename: "essence_core.js",
    shared: {
        react: {singleton: true, requiredVersion: "18.3.1", eager: true},
        "react-dom": {singleton: true, requiredVersion: "18.3.1", eager: true},
        // ... другие зависимости
    },
});
```

### Monaco Editor

Встроенная поддержка Monaco Editor для редактирования кода:

```typescript
chain.plugin("monaco-editor").use(require("monaco-editor-webpack-plugin"), [
    {
        publicPath: "/vs",
        filename: "[name].worker.js",
        languages: ["javascript", "typescript", "css", "html", "json"],
    },
]);
```

### Оптимизация

Автоматическое разделение вендорных библиотек:

- `vendor-monaco-editor` - Monaco Editor
- `vendor-react` - React и связанные библиотеки
- `vendor-utility` - Утилиты (lodash, moment, etc.)
- `vendor-material-ui` - Material-UI компоненты
- `share-essence` - Essence Share библиотека
- `vendor` - Остальные зависимости

## Переменные окружения

Поддержка `.env` файлов:

- `.env` - Общие переменные
- `.env.development` - Переменные для разработки
- `.env.production` - Переменные для продакшена
- `.env.local` - Локальные переменные (игнорируется git)

### Git информация

Автоматическое получение git информации:

- `REACT_APP_COMMIT_ID` - ID последнего коммита
- `REACT_APP_BRANCH_DATE_TIME` - Дата и время последнего коммита
- `REACT_APP_BRANCH_NAME` - Название ветки

## Структура проекта

```
├── rsbuild.config.ts          # Конфигурация rsbuild
├── package.json               # Зависимости и скрипты
├── tsconfig.json              # Конфигурация TypeScript
├── src/
│   ├── index.tsx             # Точка входа приложения
│   └── version.json          # Файл версии
├── public/
│   └── index.html            # HTML шаблон
├── types/
│   └── rsbuild.d.ts          # Типы для rsbuild
├── scripts/
│   └── install-rsbuild.js    # Скрипт установки
└── build/                    # Результат сборки
```

## Преимущества Rsbuild

1. **Скорость**: Rust-based bundler (Rspack) для быстрой сборки
2. **Простота**: Меньше конфигурации, больше функциональности
3. **Современность**: TypeScript-first подход
4. **Совместимость**: Поддержка webpack плагинов
5. **Производительность**: Оптимизированные алгоритмы

## Отладка

### Проблемы с зависимостями

```bash
# Очистка кэша
yarn cache clean --force
rm -rf node_modules package-lock.json
yarn install
```

### Анализ конфигурации

```bash
# Просмотр финальной конфигурации
npx rsbuild inspect
```

### Логи разработки

```bash
# Подробные логи
DEBUG=* yarn start
```

## Миграция с Webpack

Если вы мигрируете с webpack, обратитесь к файлу `MIGRATION_TO_RSBUILD.md` для подробной информации о изменениях.

## Поддержка

- [Rsbuild документация](https://rsbuild.dev/)
- [Module Federation](https://module-federation.io/)
- [React документация](https://react.dev/)
