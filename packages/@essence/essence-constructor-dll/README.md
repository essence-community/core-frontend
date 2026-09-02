# @essence-community/constructor-dll

Webpack 4 DLL vendor для **внешних модулей** (webpack + `constructor-scripts`). Не используется SPA на Rsbuild.

Скрипт создания модуля вешает `postinstall`: `yarn constructor-dll-build`.

## Скрипты

- `yarn build` / `constructor-dll-build` — прод-сборка DLL
- `yarn build:dev` — dev-сборка

## Совместимость

Зависимости DLL: React 16, MobX 5, webpack 4. Ядро приложения — React 18 / MobX 6. Новый модуль под текущий хост лучше собирать через Module Federation (`MODULE_FEDERATION`), а не DLL.
