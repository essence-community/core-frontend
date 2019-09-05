## Переменные окражения

**Переменная среды́ (англ. environment variable)** — текстовая переменная операционной системы, хранящая какую-либо информацию — например, данные о настройках системы.

Находятся в пакетах:

1. [essence-constructor-website](./packages/@essence/essence-constructor-website) - веб приложения для работы с конструктором и метамоделью

### Переменные окружения для "essence-constructor-website"

| Название | Значение по умолчанию | Описание |
| ----- | ----- | ----- |
| PUBLIC_URL |	| Базовый адрес приложения, если нужно разместить на дочернем каталоге |
| REACT_APP_PUBLIC_URL | | Должен быть такой же, как и PUBLIC_URL |
| REACT_APP_REQUEST | GATE | Запросы для приложения, нужно оставить GATE, используется для разделения типов запросов |
| REACT_APP_BASE_URL | gate | Базовый адрес запросов |
| REACT_APP_COMMIT_ID | DEV | Версия комита для контента |
| REACT_APP_BRANCH_NAME | 1.21.0 | Имя собираемой ветки |
| REACT_APP_BRANCH_DATE_TIME | no-valid | Дата собираемой ветки |
| REACT_APP_SHOW_DEV_TOOLS | true (false для prod) | Признак отображения dev утилиты для mobx |
| REACT_APP_WS_BASE_URL | /api | Базовый эндпоинт для уведомления (ws) |
