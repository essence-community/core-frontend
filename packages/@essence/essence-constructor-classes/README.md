# @essence-community/constructor-classes

Реализации виджетов конструктора. Каждый класс — папка в `src/` с `setComponent` в `index.ts`.

В приложение классы попадают через side-effect импорты в [`website/src/register.ts`](../essence-constructor-website/src/register.ts).

## Контракт

Компонент получает `IClassProps`: `bc`, `pageStore`, `hidden` / `disabled` / `readOnly` / `visible`.

Регистрация:

```ts
setComponent("GRID", commonDecorator(GridContainer));
setComponent("IFIELD.text", commonDecorator(FieldTextContainer));
```

`commonDecorator` считает `disabledrules` / `hiddenrules` / `readonlyrules`. Для `APPLICATION`, `WIN`, `FILTERPANEL` и части оболочки его нет — они сами управляют видимостью.

## Структура виджета

```
src/Grid/
  index.ts          # setComponent
  containers/       # точка входа
  stores/           # MobX-стор (если нужен)
  components/       # UI
```

Стор кладётся на страницу через `useModel` / `withModel`. Кнопки зовут `store.handlers[bc.handler]`.

## Группы классов

| Область | Типы |
|---|---|
| Оболочка | `APPLICATION`, `APP_BAR`, `PAGES`, `PAGER`, `AUTH_FORM`, `KEYCLOAKAUTH` |
| Лейаут | `PANEL`, `BOX`, `TABPANEL`, `FORMPANEL`, `WIN`, `WIN.DRAWER` |
| Грид | `GRID`, `TREEGRID`, `COLUMN.*`, `GRID_HEADER.*`, `FILTERPANEL` |
| Поля | `IFIELD.*` |
| Кнопки | `BTN`, `BTN_DYNAMIC`, `BTNCOLLECTOR` |
| Расширение | `MODULE_FEDERATION` |

Документация отдельных классов: [Application](./src/Application/README.md), [Window](./src/Window/README.md), [AppBar](./src/AppBar/README.md). Метамодель и внешние модули — [MODULE.md](../../../docs/MODULE.md).
