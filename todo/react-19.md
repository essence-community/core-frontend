# Миграция на React 19

Сейчас: `react` / `react-dom` **18.3.1** (последний 18), типы **18.3.31** / **18.3.7** в `classes` / `share` / `website`. Хост: Rsbuild + MUI 7.

Не ставить 19, пока не закрыты блокеры.

## Сделано

- типы выровнены на 18
- enzyme → `@testing-library/react`
- `essence-constructor-dll` удалён; `constructor-scripts` больше не ссылается на DLL
- хост уже на `createRoot` (`website/src/index.tsx`)

## 1. Свой код (до bump)

- [ ] Убрать `defaultProps` у function components (в 19 игнорируются):
  - `LineLoader.defaultProps`
  - `Popover.defaultProps`
- [ ] Шаблоны модулей: `react-dom` `render()` → `createRoot`
  - `essence-constructor-scripts/template_example/src/render.tsx`
  - `essence-constructor-scripts/template_typescript/src/render.tsx`

## 2. Бамп, затем ок

- [ ] `react-number-format` 5.3.1 → **≥5.4.4** (peer `^19`)
- [ ] `@types/react` / `@types/react-dom` 18 → **19** (вместе с bump runtime)

## 3. Заменить пакеты (блокеры)

Не «поставить 19 поверх»: peer врёт или runtime упадёт (`findDOMNode` вырезан).

| Сейчас | Почему | Куда |
|---|---|---|
| `react-custom-scrollbars@4.2.1` | peer только React 16, `findDOMNode` | форк / `react-scrollbars-custom` / нативный scroll |
| `react-input-mask@2.0.4` | заброшен, `findDOMNode` | `@react-input/mask` |
| `rc-calendar@9` + `rc-time-picker@3` | 2019, antd-эпоха | MUI DatePicker / `rc-picker` |
| `react-fontawesome@1.7` | старый FA | `@fortawesome/react-fontawesome` |
| `react-color@2.19` | не живой | `react-colorful` |
| `react-linkify@1.0.0-alpha` | мёртвый alpha | своя ссылка / другое |
| `mdi-react@3.4.0` | древний | `@mdi/react` или MUI icons |
| `react-grid-layout@1.4.4` | риск Strict / `findDOMNode` | проверить **1.5+** на React 19 |

## 4. Уже можно не менять ради 19

MUI 7, Emotion 11, `mobx-react@10`, `react-router-dom@6.30`, `@monaco-editor/react@4.7`, `react-markdown@10`, `react-i18next@17`, `@testing-library/react@16`, `@module-federation/bridge-react@2.9`.

## 5. Внешние модули

`constructor-scripts` собирает модуль без DLL (свой бандл).

- [ ] Проверить `yarn build` / `yarn zip` внешнего модуля на React 18

## 6. Сам bump

- [ ] `react` / `react-dom` → **19**
- [ ] `yarn install`, tscheck, прогон UI: даты, маска, скролл, грид, цвет, иконки FA/MDI
