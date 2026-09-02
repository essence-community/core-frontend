# @essence-community/constructor-share

Ядро конструктора: типы, сторы, формы, request, parser, реестр компонентов, хуки и общие UI-примитивы.

Используется основным приложением и внешними модулями. В монорепо Rsbuild берёт исходники из `src/` — локально `yarn build` не нужен.

## Публичный API (`src/index.ts`)

- `constants` — `VAR_RECORD_*`, `VAR_SETTING_*`, meta-поля запроса
- `components` — `setComponent`, `mapComponents`, `getComponentByBc`
- `decorators` — `commonDecorator`, `withModel`
- `hooks` — `useModel`, `useCommon`, field/store хуки
- `models` — `PageModel`, `RecordsModel`, `StoreBaseModel`, `settingsStore`, `snackbarStore`, …
- `request` — HTTP к gate
- `types` — `IBuilderConfig`, `IPageModel`, `IClassProps`, …
- `utils` — parser выражений, redirect, i18n, storage
- `context` — Form / Page / Application / Record / …
- `uicomponents` — UIForm, Popover, Confirm, resizers, …

`Form` / `Field` / `useField` и `actions` в корневой index не реэкспортируются — импорт из `@essence-community/constructor-share/Form` и `.../src/actions`.

## Реестр

Виджет регистрируется по `type` (и опционально `datatype`):

```ts
setComponent("GRID", GridContainer);
setComponent("IFIELD.text", FieldTextContainer);
```

`mapComponents(bc.childs, …)` резолвит `type.datatype`, иначе `type`.

## Сборка и публикация

```bash
yarn workspace @essence-community/constructor-share run build    # tsc → lib/
yarn workspace @essence-community/constructor-share run deploy   # yarn publish из lib/
GATE_URL=https://host/api yarn workspace @essence-community/constructor-share run configsync  # IBuilderConfig из БД
```

`configsync` требует `GATE_URL` (URL gate). См. [ENV.md](../../../docs/ENV.md).

Node >= 22, Yarn >= 1.22.
