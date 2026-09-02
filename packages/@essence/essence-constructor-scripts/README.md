# @essence-community/constructor-scripts

Webpack 4 toolchain для **внешнего модуля** конструктора: dev-сервер, сборка, zip, выкладка.

Создаётся вместе со скелетом: `yarn create @essence-community/constructor-module <name>`. Подробности метамодели — [MODULE.md](../../../docs/MODULE.md).

## Команды

| Команда | Назначение |
|---|---|
| `start` | dev-сервер, бандл `http://localhost:8080/{project-name}.js` — URL можно указать в preference ядра |
| `build` | прод-сборка |
| `zip` | архив `dist/{name}-{version}.zip` (js + `schema_manifest.json`) |
| `deploy` | выкладка (S3 / Jenkins env: `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, …) |
| `init` | инициализация после `create-constructor-module` |
| `test` | тесты модуля |

## schema_manifest.json

Массив классов. Поля класса:

| Поле | Значение | Описание |
|---|---|---|
| `cl_dataset` | `0` / `1` | нужен ли `ck_query` |
| `cl_final` | `0` / `1` | показывать в корне объектов |
| `cv_description` | строка | описание |
| `cv_name` | строка | короткое имя |
| `cv_type` | `[A-Za-z0-9_]+` | значение атрибута `type` / первый аргумент `setComponent` |

Также: `attributes` — новые атрибуты; `class_attributes` — привязка существующих; `class_hierarchy` — `class_parent` / `class_child`.
