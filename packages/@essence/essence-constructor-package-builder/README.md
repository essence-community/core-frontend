# @essence-community/constructor-package-builder

CLI для публикации пакетов конструктора (`constructor-package-builder`).

## Команды

| Команда | Что делает |
|---|---|
| `build:tsc` | `tsc`, копирует `package.json` / `README.md` / `yarn.lock` в `lib/` |
| `deploy` | `yarn publish` из `lib/` |

Пример — `constructor-share`:

```json
{
  "scripts": {
    "build": "constructor-package-builder build:tsc",
    "deploy": "constructor-package-builder deploy"
  }
}
```
