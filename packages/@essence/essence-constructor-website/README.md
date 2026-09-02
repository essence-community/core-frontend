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
| `.env` | `PUBLIC_URL`, placeholders коммита, статический `REACT_APP_SETTINGS` |
| `.env.localhost` | `REACT_APP_SETTINGS` через gate `MTGetSysSettings` |
| `.env.mock` | `PROJECT=mock` |
| `.env.production` | прод |

| Переменная | По умолчанию | Описание |
|---|---|---|
| `PUBLIC_URL` | `/` | Базовый путь статики и роутера |
| `REACT_APP_PUBLIC_URL` | как `PUBLIC_URL` | `basename` React Router |
| `REACT_APP_SETTINGS` | `/assets/scripts/settings.js` | URL скрипта настроек в `index.html` |
| `REACT_APP_COMMIT_ID` | `DEV` | Хеш коммита; если `DEV` — из `git log` |
| `REACT_APP_BRANCH_NAME` | `3.1.0` | Версия/ветка (`version.json`) |
| `REACT_APP_BRANCH_DATE_TIME` | `no-valid` | Дата коммита; если `no-valid` — из `git log` |
| `PROJECT` | — | Суффикс `.env.${PROJECT}` |
| `PROXY` | — | JSON-массив `{path, options}` вместо прокси `:9020` |

Полный список: [ENV.md](../../../docs/ENV.md).

## Структура

- `src/index.tsx` — точка входа, `saveSystemComponents()`
- `src/register.ts` — side-effect импорт всех классов
- `src/AppRoutes.tsx` — маршруты (`/:appName?/:ckId?`, `/redirect/:b64`, …)
- `rsbuild.config.ts` — сборка, прокси, MF host (shared: react, mobx, constructor-share)

Исходники `constructor-classes` и `constructor-share` подключаются алиасами, отдельно их собирать не нужно.
