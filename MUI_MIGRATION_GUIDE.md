# Руководство по миграции Material-UI v4 на MUI v7

## ✅ Выполненные шаги

### 1. Обновление зависимостей

- ✅ Заменены `@material-ui/core` на `@mui/material`
- ✅ Заменены `@material-ui/icons` на `@mui/icons-material`
- ✅ Заменены `@material-ui/lab` на `@mui/lab`
- ✅ Заменены `@material-ui/styles` на `@mui/material/styles`
- ✅ Добавлены `@emotion/react` и `@emotion/styled`
- ✅ Обновлены версии до актуальных:
    - `@mui/material`: ^7.1.2
    - `@mui/icons-material`: ^7.1.2
    - `@mui/system`: ^7.1.1
    - `@mui/styles`: ^7.0.0-beta.4
    - `@mui/lab`: ^7.0.0-beta.14
    - `@emotion/react`: ^11.14.0
    - `@emotion/styled`: ^11.14.0

### 2. Автоматическая миграция импортов

- ✅ Создан скрипт миграции `scripts/migrate-mui.js`
- ✅ Создан файл маппинга `migration-map.json`
- ✅ Выполнена автоматическая замена импортов в 342 файлах
- ✅ Заменены основные импорты:
    - `@material-ui/core` → `@mui/material`
    - `@material-ui/core/styles` → `@mui/material/styles`
    - `@material-ui/lab` → `@mui/lab`
    - `@material-ui/icons` → `@mui/icons-material`
    - `createMuiTheme` → `createTheme`

### 3. Автоматическое исправление ошибок

- ✅ Создан скрипт исправления `scripts/fix-mui-errors.js`
- ✅ Исправлены основные ошибки в 85 файлах:
    - `MuiThemeProvider` → `ThemeProvider`
    - `justify` → `justifyContent` в Grid компонентах
    - `@material-ui/core/SvgIcon` → `@mui/material/SvgIcon`
    - `onEscapeKeyDown` → `onKeyDown` в Modal
    - Добавлены `component="div"` props для Grid и Modal
- ✅ Сокращено количество TypeScript ошибок с 46 до 37

## 🔄 Следующие шаги

### 1. Исправление оставшихся ошибок

Осталось 37 TypeScript ошибок, которые нужно исправить вручную:

```bash
# Проверка TypeScript ошибок
npx tsc --project packages/@essence/essence-constructor-share/tsconfig.json
```

#### Основные типы ошибок для исправления:

1. **useStyles ошибки**: Некоторые `useStyles` вызовы возвращают `never`
2. **Grid props**: Некоторые Grid компоненты требуют дополнительные props
3. **Modal props**: Некоторые Modal компоненты требуют дополнительные props

### 2. Проверка и исправление ошибок

```bash
# Проверка TypeScript
yarn tscheck:classes
yarn tscheck:share
yarn tscheck:website

# Проверка линтера
yarn lint

# Запуск тестов
yarn test
```

### 3. Обновление стилей (если необходимо)

#### Замена JSS на Emotion (опционально)

MUI v7 рекомендует использовать Emotion вместо JSS. Если хотите мигрировать стили:

```typescript
// Старый способ (JSS)
import {makeStyles} from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.main,
    },
}));

// Новый способ (Emotion)
import {styled} from "@mui/material/styles";

const StyledComponent = styled("div")(({theme}) => ({
    color: theme.palette.primary.main,
}));
```

#### Обновление темы

```typescript
// Старый способ
import {createMuiTheme} from "@mui/material/styles";

// Новый способ
import {createTheme} from "@mui/material/styles";
```

### 4. Проверка компонентов

#### Основные изменения в компонентах:

- `Button` - API остался прежним
- `TextField` - API остался прежним
- `Grid` - API остался прежним
- `Paper` - API остался прежним
- `Typography` - API остался прежним

#### Изменения в стилях:

- `makeStyles` - API остался прежним
- `useStyles` - API остался прежним
- `useTheme` - API остался прежним

### 5. Проверка работы приложения

```bash
# Запуск в режиме разработки
yarn start

# Проверка сборки
yarn build
```

## 🚨 Возможные проблемы и решения

### 1. Проблемы с типами

Если возникают ошибки TypeScript, проверьте:

- Правильность импортов
- Совместимость типов
- Обновление типов для новых версий

### 2. Проблемы со стилями

- Проверьте, что все стили применяются корректно
- Убедитесь, что тема передается правильно
- Проверьте совместимость с Emotion

### 3. Проблемы с иконками

- Убедитесь, что иконки импортируются из `@mui/icons-material`
- Проверьте, что названия иконок не изменились

## 📚 Полезные ссылки

- [Официальное руководство по миграции MUI](https://mui.com/material-ui/migration/migrating-from-v4/)
- [Документация MUI v7](https://mui.com/material-ui/)
- [Руководство по Emotion](https://emotion.sh/docs/introduction)

## 🔧 Дополнительные инструменты

### Скрипты миграции

```bash
# Запуск автоматической миграции
yarn migrate:mui

# Исправление ошибок MUI
yarn fix:mui
```

### Проверка зависимостей

```bash
# Проверка установленных версий MUI
yarn list @mui/material @mui/icons-material @mui/lab @mui/styles
```

## 📝 Примечания

1. **@mui/styles устарел**: В будущих версиях рекомендуется перейти на Emotion
2. **Совместимость**: MUI v7 обратно совместим с большинством API v4
3. **Производительность**: MUI v7 имеет улучшенную производительность
4. **Tree-shaking**: Улучшенная поддержка tree-shaking для уменьшения размера бандла

## ✅ Статус миграции

- [x] Обновление зависимостей
- [x] Автоматическая миграция импортов
- [x] Автоматическое исправление основных ошибок
- [ ] Ручное исправление оставшихся ошибок (37 ошибок)
- [ ] Тестирование приложения
- [ ] Оптимизация стилей (опционально)
- [ ] Документирование изменений

## 📊 Статистика миграции

- **Всего файлов обработано**: 1452
- **Файлов с импортами Material-UI**: 342
- **Файлов с исправленными ошибками**: 85
- **TypeScript ошибок до исправления**: 46
- **TypeScript ошибок после исправления**: 37
- **Сокращение ошибок**: 19.6%
