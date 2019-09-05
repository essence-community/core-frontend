This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Зависимости

1. `yarn` - (^1.3.2)
1. `node` - (^9.0.0)


## Работа с пакетами (yarn workspaces)

Для работы приложения нужно установить все зависимые пакеты (описаны выше), после выполнить команду установки node_modules: `yarn install`

Доступные пакеты:

1. [essence-constructor-component](./packages/@essence/essence-constructor-components) - базовый пакет для сбора конструктора
1. [essence-constructor-website](./packages/@essence/essence-constructor-website) - веб приложения для работы с конструктором и метамоделью

## Запуск приложения для разработки

При разработке нужно выполнить `yarn start` из корня проекта.

При запуске запускаются 2 команды:

1. `yarn build:watch` - запускает сборку компонентов из модуля `essence-constructor-component`
1. `yarn start` - запускает web версию из модуля `essence-constructor-website`

При разработки в [package.json](./packages/@essence/essence-constructor-website/package.json) описаны стандартные адреса для проксирвоания:

1. ` /api` -> `http://localhost:9020/`
1. `/notification` -> `http://localhost:9020/`

## Continuous Integration

Для запуска CI в jenkins нужно запусти `yarn CI`


## Заборка проекта для деплоя

Сборка проекта осуществляется с помощью команды `yarn build` из корня приложения

При сборке выполняются команды:

1. `yarn buld` - запускает сборку компонентов из модуля `essence-constructor-component`
1. `yarn build` - запускает сборку web версии из модуля `essence-constructor-website`
1. копирование `build` папки в верхний уровень приложения

После сборки необходимо перенести папку `build`, которая будет находится в корне проекта и `essence-constructor-website` компонента, на сервер. Конфигурация сервера должна производиться отдельно.

## Доплнительная документация

1. [FLOW.md](./docs/FLOW.md)
1. [ENV.md](./docs/ENV.md)
1. [STORYBOOK.md](./docs/STORYBOOK.md)
1. [ENV.md](./docs/ENV.md)
1. [PROXY.md](./docs/PROXY.md)
1. [REDIRECT.md](./docs/REDIRECT.md)
