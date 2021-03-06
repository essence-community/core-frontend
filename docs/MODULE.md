# Система модулей

## Зачем нужны модули

Модульная система предназначена для расширения существующего набора компонентов посредством добавления новых пакетов (модулей) через систему администрирования либо изменения существующих классов.

## Как добавить свой модуль

Для добавления модуля необходимо:

1. Реализовать модуль как отдельный пакет;
1. Использовать `setComponent` для установки компонента как модуля;
1. Создаем модуль командой `yarn create @essence-community/constructor-module card-new`, где `card-new` название модуля.;
1. Если нужно разработывать моуль на моках см. раздел "Разработка модуля на моках";
1. В созданном модуле в файле `index.ts` первым параметром в `setComponent` указываем тип нового модуля.

## Загрузка модуля (zip)

Для разворачивание модуля на стенде, необходимо:

1. собрать с помощью команды `yarn build`
1. создать архив для передачи `yarn zip`

После создания архив будем доступен в папке `dist`.

Имя `zip` файла создается по шаблону `${имя-модуля}-${версия-модуля}.zip`

Модуль содержит:

1. исходные файлы самого модуля, которые распологаются в `dist`
1. файл манифеста, который хранится по пути проекта `src/schema_manifest.json`


## Дополнительные возможности

Ядро конструктора использует react с динамическим обновлениям данных и возможностью изменения темы

1. React - служит для отображения данных и манипуляции с DOM элементами. Пакет должен отдавать react компонент в качестве модуля;
2. Mobx - утилита для управления состоянием приложения в реальном времени. С помощью этой утилиты можно реагировать на изменения окружающих модулей и распространять данных из своего модуля;
3. StoreBaseModel - базовая модель для создания хранилища по обмену данными между серверов и клиентом. Так же служить для реализация связей по средствам мастеров. Добавляет автоматическое обновление данных при изменении мастера.
4. Material-ui - утилита для визуализации простых компонентов и работы с css. На базе утилиты построена система изменения темы и цветовой палитры приложения.
5. PageModel (PageStore) - хранилище состояние страницы, на которой находится модуль. Предоставляет доступ к другим модулях через хранилища (store) других модулей. Дополнительно хранит в себе открытые окна и состоянием видимости страницы.
6. ApplicationModel (ApplicationStore) - общее хранилище приложения. Служит для работы с модулем авторизации и уведомлением. Хранит информацию о всех активных страницах в приложении. Позволяет осуществлять переход между страницами с предоставляем информации о предыдущей странице с помощью глобальных переменных.

## Что такое метамодель

Метамодель приложения разделена на 4 базовых типа:

1. Атрибуты - описывают типы данных в настройках одного класса. Каждый атрибут может быть опциональный. При работе с атрибутом в модуле необходимо проверить на наличие в нем данных, что бы не вызвать критическую ошибку.
1. Классы - описывают состояние модуля. Класс может включать в себя все атрибуты или часть из них. Обязательным атрибутом является только `type` по которому происходит определения к какому модулю относится данный класс.
1. Объекты - служат для объединения классов в один объект (например: таблица может включать в себя колонки для построения таблицы с нужными колонками для отображения). Вложенность одних объектов в других определяется на уровне создания класса. Для каждого класса разрешается переопределить его атрибуты.
1. Страница - служит для построения страницы (PageStore) из объектов. Для каждого класса разрешается переопределить его атрибуты при этом переопределение будет доступно только для выбранной страницы. Один и тот же объект может быть добавлен на несколько страниц сразу.

## Что такое глобальные переменные

Для общения между модулями реализовано общее хранилище переменных (globalValues в PageStore).

Хранилище позволяет:

1. Записывать данных из любого модуля (при использовании одного и того же ключа в разных модулях согласованность данных не гарантирована, вся ответственность ложится на создателя метамодели).
1. Читать данные - при этом нужно понимать, что тип данных может быть любой: `undefined, null, object, string, number, boolean, "array"`. При чтении данных нужно использовать `reaction` или `autorun` из `mobx` либо использовать `mobx-react` для подписывания `render` функции самого компонента на изменение данных.
1. Другие действия с данными - происходит посредством вызовов методов ObservableMap.

Глобальные переменные так же могут изменится при переходе между страницами посредством `applicationStore`

## Какие типы данных доступны

Для работы со статической типизации и утилитами предоставляется пакет `essence-constructor-share` который включает:

1. Типы данных для атрибутов `BuilderConfigType`. Данная структура синхронизируются с базой данных и позволяет поддерживать код в актуальном состоянии.
1. `ApplicationModelType` - тип данных для работы с приложением и авторизации. Доступно через `pageStore` модуля.
1. `PageModelType` - хранит состояние страницы.

## Параметры который приходят в модуль

1. `bc` - `BuilderConfigType` хранит состоянии класса переданного из метамодели;
1. `pageStore` - состояние страница, описано в типе `PageModelType`
1. `hidden` - (`boolean`) - состояние скрытия контента с помощью правил метамодели
1. `disabled` - (`boolean`) - состояние блокировки с помощью правил метамодели
1. `readOnly` - (`boolean`) - состояние "только для чтения" с помощью правил метамодели
1. `visible`  - (`boolean`) - состояние отображения контента на странице. Если страница полностью не показывается, то visible будет false. Иначе передается по цепочке.

Параметры `hidden`, `disabled`, `readOnly`, `visible` могут быть изменены в зависимости от состояний промежуточных компонентов.

## Как использовать другие модули в своих модулях

Для отображения дочерних компонентов использовать `mapComponents` при этом в каждый компонент необходимо обязательно передать `pageStore` и `bc` для правильной работы другого модуля. Так же нужно прокинуть по цепочке `disabled`, `hidden`, `readOnly`, `visible` при этом значения можно менять в зависимости от необходимости либо оставить какие пришли для совместимости.


## Документация для класса

Для создания документации необходимо в корне проекта поместить **DOC_MODULE.md** файл со следующим принципом наименования, где:

- `DOC_` - статический текст который говорит что это документация
- `MODULE` - динамическая часть, необходимо использовать `cv_type` класса, таким образом можно будет писать несколько документация для каждого класса, если модуль будет состоять из больше чем 1 класса
- `.md` - статический текст для расширения
