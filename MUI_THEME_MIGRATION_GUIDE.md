# MUI v7 Theme Migration Guide

## Обзор изменений

В MUI v7 система переопределения тем была полностью переработана. Основные изменения:

### 1. Структура переопределений

**MUI v4 (старый способ):**

```typescript
createTheme({
    overrides: {
        MuiButton: {
            root: {
                // стили
            },
        },
    },
});
```

**MUI v7 (новый способ):**

```typescript
createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    // стили
                },
            },
        },
    },
});
```

### 2. Селекторы состояний

**MUI v4:**

```typescript
"&$checked": { /* стили */ }
"&$disabled": { /* стили */ }
"&$focused": { /* стили */ }
```

**MUI v7:**

```typescript
"&.Mui-checked": { /* стили */ }
"&.Mui-disabled": { /* стили */ }
"&.Mui-focused": { /* стили */ }
```

### 3. Вложенные селекторы

**MUI v4:**

```typescript
"&$active $icon": { /* стили */ }
"&$checked + $bar": { /* стили */ }
```

**MUI v7:**

```typescript
"&.Mui-active .MuiTableSortLabel-icon": { /* стили */ }
"&.Mui-checked + .MuiSwitch-track": { /* стили */ }
```

## Миграция в проекте

### 1. Обновленные файлы

- `packages/@essence/essence-constructor-share/src/types/Theme.ts` - добавлен тип `ThemeComponents`
- `packages/@essence/essence-constructor-classes/src/Application/components/Theme/Theme.tsx` - обновлен для использования `components`
- `packages/@essence/essence-constructor-classes/src/Application/components/Theme/getThemeComponentsDefault.ts` - переименован и обновлен
- `packages/@essence/essence-constructor-classes/src/Application/components/Theme/themeLight/getThemeLightComponents.ts` - новый файл
- `packages/@essence/essence-constructor-classes/src/Application/components/Theme/themeDark/getThemeDarkComponents.ts` - новый файл
- `packages/@essence/essence-constructor-classes/src/Application/components/Theme/getThemeIEComponents.ts` - обновлен

### 2. Запуск миграции

```bash
yarn migrate:theme
```

### 3. Ручные исправления

После автоматической миграции может потребоваться ручная доработка:

1. **Проверьте сложные селекторы** - некоторые вложенные селекторы могут требовать ручной настройки
2. **Обновите кастомные компоненты** - если у вас есть компоненты с собственными переопределениями
3. **Проверьте TypeScript ошибки** - новые типы могут выявить проблемы

### 4. Тестирование

После миграции обязательно:

1. Запустите TypeScript проверку: `yarn tsc --noEmit`
2. Запустите тесты: `yarn test`
3. Проверьте визуальное отображение в браузере
4. Проверьте переключение между светлой и темной темами

## Примеры миграции

### Кнопка

**До:**

```typescript
MuiButton: {
  root: {
    "&$disabled": {
      color: "red"
    }
  }
}
```

**После:**

```typescript
MuiButton: {
  styleOverrides: {
    root: {
      "&.Mui-disabled": {
        color: "red"
      }
    }
  }
}
```

### Checkbox

**До:**

```typescript
MuiCheckbox: {
  colorPrimary: {
    "&$checked": {
      color: "blue"
    }
  }
}
```

**После:**

```typescript
MuiCheckbox: {
  styleOverrides: {
    colorPrimary: {
      "&.Mui-checked": {
        color: "blue"
      }
    }
  }
}
```

## Полезные ссылки

- [MUI v7 Migration Guide](https://mui.com/material-ui/migration/migration-v6/)
- [Theme Customization](https://mui.com/material-ui/customization/theme-components/)
- [Component API](https://mui.com/material-ui/api/)

## Поддержка

Если возникнут проблемы с миграцией:

1. Проверьте консоль браузера на ошибки
2. Запустите TypeScript проверку
3. Сравните с официальной документацией MUI v7
4. Создайте issue в репозитории проекта
