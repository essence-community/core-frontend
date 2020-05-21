# Реализация тестов для React приложения

## Виды тестов

1. unit-test - служат для проверки react компонентов с помощью jest и enzyme на моках
1. snapshot-test - служат для проверки UI тестов с помощью jest и puppeteer

## Перед установкой

1. Установить зависимости с помощью команды `yarn install`

При установки может появится ошибка с установкой `puppeteer`. Если такая проблема появился, то нужно пропустить установку с помощью `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true`

Для linux подобных систем `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn install`

Для windows `set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true && yarn install`

## Запуск тестов

1. `yarn test` - запускает тесты в watch моде. Тесты проходят все, после завершения слушается измнения файла и запускаются тесты относящиеся к изменяемому файлу.
1. `yarn test --coverage` - запускает тесты и выполняется только один раз. По окончанию тестов генерируется html отчет. Так же гененриутеся отчет для показа в jenkins с помощью cobertura.
1. `CI=true yarn test` - запускает тесты и выполняется только один раз, после чего команда завершается. Нужно для запуска тестов на серверах CI что бы не останавливать поток выполнения.

## С чего начать

### Монтирование компонентов

1. TODO: написать

### Методы для запуска событий

1. С помощью симуляции `wrapper.find("input").simudate("click");`
1. С помощью прямого вызова с ожиданием `await wrapper.find("input")(new Event("change"));`
1. Ожидание выполнения события. Сперва нужно запустить событие `wrapper.find("input").simudate("click")`. После нужно запустить механизм ожидания `await when(() => !store.recordsStore.isLoading);`

### Как посмотреть отчет по тестам

После запуска `yarn test --coverage` в корне проекта появится папка `coverage`. В этой папке нужно открыть подпапку `lcov-report` и найти файл `index.html`. `inedex.html` - это стандартный файл для браузера, который откроет полностью статистику по найденным файлам и их покрытие. После открытие в браузере нужно из списка файлов найти нужной файл и перейти в него. После открытия файла в браузере будет представлена полная статистика по покрытию тестами.

### Как понять что файл (компонент) покрыт тестом полностью

1. Покрытие файла после запуске `yarn test --coverage` больше 80%
1. Большая часть взаимодействия с пользовательским интерфейсом, такие как клики, ввод, обновления, появление контента

### Пример простого теста для компонента Button

```js
// @flow
import * as React from "react";
import {when} from "mobx";
import {mountWithTheme} from "../../utils/test";
import {createEmptyPageStore} from "../../stores/index";
import Button, {BaseButton} from "../Button";

describe("Button", () => {
    const pageStore = createEmptyPageStore();

    it("render", () => {
        const wrapper = mountWithTheme(<Button pageStore={pageStore} />);

        expect(wrapper.find(Button).length).toBe(1);

        wrapper.unmount();
    });

    it("Асинхронная обработка", async () => {
        const onClick = jest.fn();
        const wrapper = mountWithTheme(<Button onClick={onClick} pageStore={pageStore} />);

        await wrapper.find("button").prop("onClick")(new Event("click"));

        expect(onClick).toBeCalledTimes(1);
    });

    it("Синхронное событие", () => {
        const onClick = jest.fn();
        const wrapper = mountWithTheme(<Button onClick={onClick} pageStore={pageStore} />);

        wrapper.find("button").simulate("click");

        expect(onClick).toBeCalledTimes(1);
    });

    it("Ожидание mobx состояния", async () => {
        const onClick = jest.fn();
        const wrapper = mountWithTheme(<Button onClick={onClick} pageStore={pageStore} />);
        const store = mountWithTheme;

        wrapper.find(BaseButton).simulate("click");

        await when(() => !store.recordsStore.isLoading);

        expect(onClick).toBeCalledTimes(1);
    });
});
```

