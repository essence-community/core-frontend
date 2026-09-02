# @essence-community/create-constructor-module

Скелет внешнего модуля конструктора.

```bash
yarn create @essence-community/constructor-module <project-name>
yarn create @essence-community/constructor-module <project-name> --example
```

В каталоге появятся `package.json` (скрипты `constructor-scripts`), `.eslintrc`, `.prettierrc`. Дальше: `yarn` (postinstall собирает DLL), `setComponent` в `src/index.ts`, `yarn start` / `yarn build` / `yarn zip`.

Документация экосистемы: [MODULE.md](https://github.com/essence-community/core-frontend/blob/dev/docs/MODULE.md).
