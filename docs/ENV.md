# Переменные окружения

Файлы лежат в [`essence-constructor-website`](../packages/@essence/essence-constructor-website). Rsbuild читает их в порядке:

`.env.${PROJECT}` → `.env.${NODE_ENV}.local` → `.env.local` → `.env.${NODE_ENV}` → `.env`

`yarn start-localhost` задаёт `PROJECT=localhost`, `yarn start-mock` — `PROJECT=mock`. Все `REACT_APP_*` попадают в бандл.

## Website (Rsbuild)

| Переменная | По умолчанию | Описание |
|---|---|---|
| `PUBLIC_URL` | `/` | Базовый путь статики, `assetPrefix` и router. Для деплоя в подкаталог: `/app` |
| `REACT_APP_PUBLIC_URL` | как `PUBLIC_URL` | `basename` React Router. Должен совпадать с `PUBLIC_URL` |
| `REACT_APP_SETTINGS` | `/assets/scripts/settings.js` | URL скрипта настроек в `index.html`. Статический файл или gate: `/api?action=sql&query=MTGetSysSettings&js=true` |
| `REACT_APP_COMMIT_ID` | `DEV` | Хеш коммита. Если пусто или `DEV` — берётся из `git log`. Пишется в `settingsStore` и `build/version.json` |
| `REACT_APP_BRANCH_NAME` | `3.1.0` | Имя ветки / версия сборки (`version.json`, настройки) |
| `REACT_APP_BRANCH_DATE_TIME` | `no-valid` | Дата коммита. Если `no-valid` — из `git log` |
| `PROJECT` | — | Суффикс `.env.${PROJECT}` (`localhost`, `mock`) |
| `PROXY` | — | JSON-массив `{path, options}` вместо дефолтного прокси на `:9020` |
| `NODE_ENV` | `development` / `production` | Режим сборки |

Дефолтный прокси (если `PROXY` не задан): `/api`, `/api_module`, `/notification` → `http://localhost:9020/`.

### Есть в `.env*`, в коде Rsbuild не читаются

| Переменная | Где задана | Комментарий |
|---|---|---|
| `REACT_APP_BASE_URL` | `.env.localhost` | не используется; gate берётся из настроек (`g_sys_gate_url`) |
| `REACT_APP_WS_BASE_URL` | `.env.localhost` | не используется; WS — из `g_sys_ws_gate_url` |
| `REACT_APP_PORT` | `.env.localhost`, `.env.mock` | порт зашит в `rsbuild.config.ts` (`3000`) |
| `REACT_APP_REQUEST` | `.env.mock` (`MOCK`) | не используется |
| `REACT_APP_SHOW_DEV_TOOLS` | `.env.production` | не используется |

## Share (`configsync`)

| Переменная | Описание |
|---|---|
| `GATE_URL` | URL gate для `yarn workspace @essence-community/constructor-share run configsync` (синхронизация `IBuilderConfig` с БД) |

## Внешние модули (`constructor-scripts`)

| Переменная | Описание |
|---|---|
| `PORT` | порт dev-сервера модуля, по умолчанию `8080` |
| `HOST` | хост dev-сервера, по умолчанию `localhost` |
| `ACCESS_KEY_ID` | ключ S3 для `yarn deploy` |
| `SECRET_ACCESS_KEY` | секрет S3 |
| `RIAK_PROXY` | HTTP-прокси до S3 |
