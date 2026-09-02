# @essence-community/constructor-website

SPA-хост конструктора: bootstrap, роутинг, регистрация виджетов, Module Federation host `essence_core`.

Сборка — [Rsbuild](https://rsbuild.dev/). Установка и деплой — в [корневом README](../../../README.md).

## Скрипты

Из корня репозитория:

```bash
yarn start              # rsbuild dev, http://localhost:3000
yarn start-localhost    # PROJECT=localhost
yarn start-mock         # PROJECT=mock
yarn build              # rsbuild build → корень/build
```

Из этого пакета:

- `yarn start` / `yarn build` / `yarn start-localhost` / `yarn start-mock`
- `yarn analyze` — анализ бандла

## Прокси

Задаётся в [`rsbuild.config.ts`](./rsbuild.config.ts):

- `/api` → `http://localhost:9020/`
- `/api_module` → `http://localhost:9020/`
- `/notification` → `http://localhost:9020/` (WebSocket)

Переопределение: `PROXY` (JSON-массив `{path, options}`).

## Окружение

Порядок загрузки: `.env.${PROJECT}` → `.env.${NODE_ENV}.local` → `.env.local` → `.env.${NODE_ENV}` → `.env`.

| Файл | Назначение |
|---|---|
| `.env` | общие значения (`PUBLIC_URL`, placeholders коммита) |
| `.env.localhost` | gate `/api`, настройки `MTGetSysSettings` |
| `.env.mock` | режим mock |
| `.env.production` | прод (без dev tools) |

`REACT_APP_*` попадают в бандл. Если `REACT_APP_COMMIT_ID` / `REACT_APP_BRANCH_DATE_TIME` не заданы, берутся из `git log`.

## Структура

- `src/index.tsx` — точка входа, `saveSystemComponents()`
- `src/register.ts` — side-effect импорт всех классов
- `src/AppRoutes.tsx` — маршруты (`/:appName?/:ckId?`, `/redirect/:b64`, …)
- `rsbuild.config.ts` — сборка, прокси, MF host (shared: react, mobx, constructor-share)

Исходники `constructor-classes` и `constructor-share` подключаются алиасами, отдельно их собирать не нужно.
