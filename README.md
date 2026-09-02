# Essence Constructor Frontend

Метамодельный UI-конструктор: страницы и виджеты задаются конфигурацией с бэкенда (`IBuilderConfig`), фронт резолвит `type` в React-компонент.

Yarn workspaces, сборка — [Rsbuild](https://rsbuild.dev/). Версия `3.1.0`.

## Зависимости

- `yarn` >= 1.22
- `node` >= 20

```bash
yarn install
```

Локальная разработка собирает `constructor-share` и `constructor-classes` из исходников (алиасы в Rsbuild), отдельно собирать пакеты не нужно.

## Пакеты

Workspaces:

1. [essence-constructor-website](./packages/@essence/essence-constructor-website) — SPA-хост (роутинг, bootstrap, Module Federation host `essence_core`)
1. [essence-constructor-classes](./packages/@essence/essence-constructor-classes) — виджеты конструктора (`GRID`, `IFIELD.*`, `PANEL`, `APPLICATION`, …)
1. [essence-constructor-share](./packages/@essence/essence-constructor-share) — ядро: сторы, формы, request, parser, реестр компонентов
1. [essence-constructor-eslint](./packages/@essence/essence-constructor-eslint) — общий ESLint-конфиг
1. [essence-constructor-package-builder](./packages/@essence/essence-constructor-package-builder) — сборка/деплой публикуемых пакетов

Вне workspaces (для внешних модулей):

1. [create-constructor-module](./packages/@essence/create-constructor-module) — скелет модуля: `yarn create @essence-community/constructor-module <name>`
1. [essence-constructor-scripts](./packages/@essence/essence-constructor-scripts) — сборка/zip внешнего модуля
1. [essence-constructor-dll](./packages/@essence/essence-constructor-dll) — webpack 4 DLL для модулей (не используется Rsbuild-хостом)

## Разработка

Из корня:

```bash
yarn start
```

Приложение: [http://localhost:3000](http://localhost:3000).

Другие режимы:

- `yarn start-localhost` — `.env.localhost` (gate `/api`, настройки `MTGetSysSettings`)
- `yarn start-mock` — `.env.mock`

Прокси задаётся в [`rsbuild.config.ts`](./packages/@essence/essence-constructor-website/rsbuild.config.ts):

- `/api` → `http://localhost:9020/`
- `/api_module` → `http://localhost:9020/`
- `/notification` → `http://localhost:9020/` (WebSocket)

Переопределение: переменная `PROXY` (JSON-массив `{path, options}`).

## Переменные окружения

Файлы: `packages/@essence/essence-constructor-website/.env*`. Порядок загрузки: `.env.${PROJECT}` → `.env.${NODE_ENV}.local` → `.env.local` → `.env.${NODE_ENV}` → `.env`.

| Переменная | По умолчанию | Описание |
|---|---|---|
| `PUBLIC_URL` | `/` | Базовый путь статики и роутера. Для подкаталога: `/app` |
| `REACT_APP_PUBLIC_URL` | как `PUBLIC_URL` | `basename` React Router, должен совпадать с `PUBLIC_URL` |
| `REACT_APP_SETTINGS` | `/assets/scripts/settings.js` | Скрипт настроек в `index.html`. На localhost: `/api?action=sql&query=MTGetSysSettings&js=true` |
| `REACT_APP_COMMIT_ID` | `DEV` | Хеш коммита; если `DEV` — из `git log` |
| `REACT_APP_BRANCH_NAME` | `3.1.0` | Версия/ветка сборки (`version.json`) |
| `REACT_APP_BRANCH_DATE_TIME` | `no-valid` | Дата коммита; если `no-valid` — из `git log` |
| `PROJECT` | — | Выбор `.env.${PROJECT}` (`localhost`, `mock`) |
| `PROXY` | — | JSON `[{path, options}]` вместо прокси на `:9020` |

Полный список, включая `GATE_URL` и переменные модулей: [ENV.md](./docs/ENV.md).

## Сборка для деплоя

```bash
yarn build
```

Собирается `constructor-website`, затем `build` копируется в корень репозитория. На сервер нужно перенести корневую папку `build`. Это SPA: несуществующие пути должны отдавать `index.html`. Подробнее — [DEPLOY.md](./docs/DEPLOY.md).

Публикация `constructor-share` (отдельно от приложения):

```bash
yarn workspace @essence-community/constructor-share run build
```

## Проверки

- `yarn lint` / `yarn lint:fix`
- `yarn tscheck:classes` / `yarn tscheck:share` / `yarn tscheck:website`
- `yarn test`
- `yarn CI` — `tsc` (classes + share) и eslint; так же запускается во внешнем Jenkins

## Документация

1. [MODULE.md](./docs/MODULE.md) — внешние модули и метамодель
1. [APPLICATION.md](./docs/APPLICATION.md) — мультиприложения
1. [REDIRECT.md](./docs/REDIRECT.md) — внешний переход `/redirect/:b64`
1. [KEYCLOAK.md](./docs/KEYCLOAK.md) — авторизация Keycloak
1. [ENV.md](./docs/ENV.md) — переменные окружения
1. [PROXY.md](./docs/PROXY.md) — прокси в разработке
1. [DEPLOY.md](./docs/DEPLOY.md) — деплой SPA
1. [ATTRIBUTES.md](./docs/ATTRIBUTES.md) — атрибуты классов
1. [STYLEGUIDE.md](./docs/STYLEGUIDE.md) — соглашения по коду
1. [TEST.md](./docs/TEST.md) — тесты
1. [UPLOAD_FILES.md](./docs/UPLOAD_FILES.md) — загрузка файлов
1. [TRANSIT_TO_SITE.md](./docs/TRANSIT_TO_SITE.md) — переход в отчёты (session/token)
1. [FIELD_IMAGE.md](./docs/FIELD_IMAGE.md) — поле изображения
