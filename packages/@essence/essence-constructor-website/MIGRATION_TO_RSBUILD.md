# Миграция с Webpack на Rsbuild

## Обзор

Этот проект был мигрирован с webpack на rsbuild для улучшения производительности сборки и упрощения конфигурации.

## Основные изменения

### 1. Конфигурация
- **Было**: `config/webpack.config.js` (749 строк)
- **Стало**: `rsbuild.config.ts` (более компактная конфигурация)

### 2. Скрипты package.json
```json
{
  "scripts": {
    "start": "rsbuild dev",
    "build": "rsbuild build",
    "start-localhost": "PROJECT=localhost rsbuild dev",
    "start-mock": "PROJECT=mock rsbuild dev"
  }
}
```

### 3. Новые зависимости
Добавлены следующие пакеты:
- `@rsbuild/core`: Основной пакет rsbuild
- `@rsbuild/plugin-react`: Плагин для React
- `@module-federation/rsbuild`: Плагин для Module Federation

## Преимущества rsbuild

1. **Быстрая сборка**: Rsbuild использует Rust-based bundler (Rspack) для ускорения сборки
2. **Простая конфигурация**: Меньше boilerplate кода
3. **Современный API**: TypeScript-first подход
4. **Лучшая производительность**: Оптимизированные алгоритмы сборки
5. **Совместимость**: Поддерживает большинство webpack плагинов

## Сохраненная функциональность

### Module Federation
```typescript
pluginModuleFederation({
  name: "essence_core",
  filename: "essence_core.js",
  shared: {
    "react": { singleton: true, requiredVersion: "18.3.1", eager: true },
    "react-dom": { singleton: true, requiredVersion: "18.3.1", eager: true },
    // ... другие зависимости
  }
})
```

### Monaco Editor
```typescript
chain.plugin('monaco-editor').use(require('monaco-editor-webpack-plugin'), [{
  publicPath: '/vs',
  filename: '[name].worker.js',
  languages: ['javascript', 'typescript', 'css', 'html', 'json']
}]);
```

### Оптимизация чанков
Сохранена логика разделения вендорных библиотек:
- `vendor-monaco-editor`
- `vendor-react`
- `vendor-utility`
- `vendor-material-ui`
- `share-essence`
- `vendor`

### Переменные окружения
Поддержка git-информации и переменных окружения:
- `REACT_APP_COMMIT_ID`
- `REACT_APP_BRANCH_DATE_TIME`
- `REACT_APP_BRANCH_NAME`

## Установка зависимостей

```bash
npm install
# или
yarn install
```

## Запуск

### Разработка
```bash
npm start
# или
yarn start
```

### Сборка
```bash
npm run build
# или
yarn build
```

### Специфичные проекты
```bash
npm run start-localhost
npm run start-mock
```

## Структура файлов

```
├── rsbuild.config.ts          # Основная конфигурация rsbuild
├── package.json               # Обновленные скрипты и зависимости
├── src/
│   ├── index.tsx             # Точка входа
│   └── version.json          # Файл версии
├── public/
│   └── index.html            # HTML шаблон
└── build/                    # Результат сборки
```

## Отладка

Если возникают проблемы:

1. Проверьте версии зависимостей
2. Убедитесь, что все плагины совместимы с rsbuild
3. Проверьте консоль на наличие ошибок
4. Используйте `rsbuild inspect` для анализа конфигурации

## Обратная совместимость

Старые файлы конфигурации webpack сохранены в папке `config/` для справки, но больше не используются. 