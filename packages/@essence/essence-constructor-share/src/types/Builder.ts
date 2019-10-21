/* eslint-disable max-len */

// BUILDER_CONFIG_START
export interface IBuilderBaseConfig {
    // Правила для выбора активного элемента
    activerules?: string;
    // Расположение текста: left - слева, center - по центру, right - справа
    align?: string;
    // Признак доступности ввода нового значения (по умолчанию = false)
    allownew?: string;
    // Признак автозагрузки сервиса
    autoload?: string;
    // Имя атрибута, который отвечает за уникальность возвращаемых данных. Если этот параметр есть в filter и заполнен, то сработает автовыбор первой записи
    autoselectidentity?: string;
    // Показывать иконку с аудитом для грида
    btnaudit?: string;
    // Признак сбора статических кнопок в коллектор
    btncollectorall?: string;
    // Показать иконку с удалением для грида
    btndelete?: string;
    // Показывать иконку с загрузкой excel для грида
    btnexcel?: string;
    // Показывать иконку с обновлением для грида
    btnrefresh?: string;
    // Показать кнопку с настройками пользователя
    btnsettings?: string;
    // Чекбокс для добавления еще одной записи
    checkaddmore?: string;
    // Идентификатор для поиска окна в мастере
    ckwindow?: string;
    // Признак свертываемой/разворачиваемой панели при инициализации true - свернута
    collapsed?: string;
    // Признак возможности сворачивания панели true/false
    collapsible?: string;
    // Признак сбора значений: object - виде объекта array - массив строк
    collectionvalues?: string;
    // Наименование колонки в запросе, из которой берутся данные
    column?: string;
    // Поле привязки конечной даты
    columnend?: string;
    // Список полей, по которым будет происходит фильтрация данных. Перечисление через запятую без пробела
    columnsfilter?: string;
    // Поле привязки стартовой даты
    columnstart?: string;
    // Вопрос на подтверждение операции
    confirmquestion?: string;
    // Вид наполнения: hbox: горизонтальное hbox-wrap: горизонтальное с переносом на следующую строку vbox: вертикальное
    contentview?: string;
    // Ширина вложенных полей. Целое число от 1% до 100%. Обязательно добавлять %.
    contentwidth?: string;
    // Вложенные элементы для построения контекстного меню
    contextmenus?: string;
    // Подпись для отображения Пример: к деньгам добавляем " руб."
    currencysign?: string;
    // Тип данных колонки
    datatype?: string;
    // Точность после запятой. Если не заполнен, то точность равна 2
    decimalprecision?: string;
    // Разделитель остатка
    decimalseparator?: string;
    // Значение по умолчанию CheckBox: true/false DateField: sysdate - текущее время или дата в формате ISO 8601 2005-08-09T18:31:42 для выбора первой записи указать значение "first"  для выбора первой записи всегда - указать значение "alwaysfirst"
    defaultvalue?: string;
    // Сервис для запроса значения по умолчанию
    defaultvaluequery?: string;
    // Отображение панели с детализацией - Служебная информация
    detail?: string;
    // Признак отключения кнопки при инициализации true-выключено
    disabled?: string;
    // Флаг блокировки, если мастер пустой
    disabledemptymaster?: string;
    // Правила для отображение объекта. Если правило вернет true, то объект выключится. Синтаксис: == - равно != - не равно '>' - больше '<' - меньше '&&' - и '||' - или Пример: gck_mo>1   // если глобальная переменная gck_mo больше 1, то поле выключится
    disabledrules?: string;
    // Имя параметра, который будет отображен
    displayfield?: string;
    // Признак автоматической перезагрузки грида
    dynamicfilter?: string;
    // Признак изменения вида иконки от данных
    dynamicicon?: string;
    // Режим добавления/редактирования - all/insert/update/disabled
    editmode?: string;
    // Включаем режим редактирования дочерних элементов
    editmodepanel?: string;
    // Режим добавления/редактирования: inline - в строке; modalwindow - в модальном окне
    edittype?: string;
    // Дополнительные плагины для шлюза
    extraplugingate?: string;
    // Вариант выбора файлов для загрузки. multi - несколько файлов, single - по одному.
    filemode?: string;
    // Тип документа доступный для выбора в 8 методе. pdf,docs,doc
    filetypes?: string;
    // Признак сохранения данных фильтра в кеше
    filtervaluessave?: string;
    // Формат данных Для дат номер от 1-6: 1 - ГГГГ 2 - МММ ГГГГ 3 - ДД.ММ.ГГГГ 4 - ДД.ММ.ГГГГ ЧЧ:00 5 - ДД.ММ.ГГГГ ЧЧ:МИ 6 - ДД.ММ.ГГГГ ЧЧ:МИ:CC
    format?: string;
    // Имя глобального параметра, которое хранит выбранные документы на подпись
    getglobal?: string;
    // Имя глобального параметра, который хранит список значений для combobox
    getgloballist?: string;
    // Список глобальных переменных(через запятую), используемых в загрузке данных.  Пример: Если указать gck_mo, то положит в json.filter.gck_mo Если указать gck_mo=ck_mo, то положит в json.filter.ck_mo
    getglobaltostore?: string;
    // Обработчик в ExtJS onCreateChildWindowMaster - для вызова окна при создании onRowCreateChildWindowMaster - для вызова окна при редактировании onSimpleSaveWindow - сохранение данных по кнопке для модального окна onCloseWindow - закрытие модального окна onCloseWindowSilent - закрытие модального окна без сообщения onPrintHandleOnline - Онлайн печать onPrintHandleOffline - Отложенная печать
    handler?: string;
    // Статическая высота в пикселях (px)
    height?: string;
    // Признак скрытия кнопки при инициализации true - скрыт
    hidden?: string;
    // Правила для отображение объекта, если правило вернет true, то объект убирается. Синтаксис: == - равно != - не равно '>' - больше '<' - меньше '&&' - и '||' - или Пример: gck_mo>1   // если глобальная переменная gck_mo больше 1, то поле скроется
    hiddenrules?: string;
    // Признак скрытия колонки с действиями
    hideactions?: string;
    // Иконка (например, fa-plus)
    iconfont?: string;
    // Наименование класса или наименование колонки при динамике
    iconfontname?: string;
    // Наименование атрибута, по которому фильтруем значение от мастера
    idproperty?: string;
    // Маска ввода, например: (999) 999-99-99
    imask?: string;
    // Дополнительная информация для полей ввода
    info?: string;
    // Признак колонки типа дерева
    istree?: string;
    // Максимальный размер файла в байтах
    maxfile?: string;
    // Максимальная высота
    maxheight?: string;
    // Максимальное количество символов
    maxsize?: string;
    // Максимальное значение. Для значений с дробной частью использовать только точку
    maxvalue?: string;
    // Количество введенных символов для получения подсказок
    minchars?: string;
    // Минимальная высота
    minheight?: string;
    // Минимальное значение
    minvalue?: string;
    // Тип операции 1 - Добавление 2 - Редактирование 3 - Удаление 4 - Вызов сервиса из атрибута updatequery 5 - Вызов меню с информацией 6 - Режим клонирования значений 7 - Режим скачивания вызов сервиса из атрибута updatequery 8 - Режим закачивания файла
    mode?: string;
    // Наименование action добавляемое в json вместо стандартных I,U,D
    modeaction?: string;
    // Признак отключения глобального лоадера при загрузке сервиса
    noglobalmask?: string;
    // Убираем текст и оставляем только иконку
    onlyicon?: string;
    // Направление сортировки: ASC / DESC
    orderdirection?: string;
    // Имя колонки из сервиса, по которой сортируем
    orderproperty?: string;
    // Количество выводимых строк (включает пагинатор)
    pagesize?: string;
    // Высота выпадающего меню для выбора. По умолчанию 390
    pickerheight?: string;
    // Ширина выпадающего меню для выбора
    pickerwidth?: string;
    // Позиция компонента
    position?: string;
    // Время паузы перед вызовом сервиса с указанием фильтра
    querydelay?: string;
    // Работа с combobox: remote или local
    querymode?: string;
    // Наименование параметра при вводе значения в combobox для фильтрации
    queryparam?: string;
    // Режим чтения
    readonly?: string;
    // Правила переключения в режим "только чтение"
    readonlyrules?: string;
    // URL страницы, на которую будет переход
    redirecturl?: string;
    // Наименование запроса при вызове которого произойдет переход при возрате cv_url
    redirectusequery?: string;
    // Признак перезагрузки всех данных после сохранения/обновления.   false - после сохранения/обновления запись подгружается одна без перезагрузки всего списка   true - список перегружается полнстью, при этом сама запись может не показать, если не попала под фильтр или пагинацию
    refreshallrecords?: string;
    // Регулярное выражение для проверки введенного значения
    regexp?: string;
    // Признак обновления родителя по мастеру
    reloadmaster?: string;
    // Параметр разрешающий повторное обновление комбобокса во время раскрытие в случае, если изменился мастер
    reloadservice?: string;
    // Количество заполненных полей для отправки - целое положительное число  если атрибут заполнен, то справа сверху отображать счетчик обязательных полей  ( пример 1/5 - заполнено одно поле из 5 требуемых) , если не заполнен, то счетчик не отображать
    reqcount?: string;
    // Предусмотреть возможность для задания условного кол-ва обязательных полей   в зависимости от условий - данный атрибут имеет приоритет над reqcount
    reqcountrules?: string;
    // Признак зависимости от мастера (true/false)
    reqsel?: string;
    // Признак обязательности заполнения
    required?: string;
    // Признак обязательности заполнения с условиями (работают только глобальные переменные)
    requiredrules?: string;
    // Параметр указывает на добавление включение изменения ширины дочерних элементов true | false
    resizable?: string;
    // Отображение корня
    rootvisible?: string;
    // Возможность выделения нескольких значений в GRID и TREEGRID SINGLE - только 1 значение SIMPLE - позволяет легко выбирать значения одно-за-другим. Каждое нажатие добавляет/удаляет значение. MULTI - позволяет комплексно выбирать значения, с учетом ctrl и shift
    selmode?: string;
    // Имя глобальной переменой, должна начинаться с g
    setglobal?: string;
    // Колонка по которой будет сортировать грид вместо column
    sortcolumn?: string;
    // Флаг наличия сплиттера   true - показывать
    spliter?: string;
    // Имя шага
    stepname?: string;
    // Имя шага на который будет переход Может принимать выражение вида: "выражение?верный-шаг:неверный-шаг" Пример выражения можно посмотреть в disabledrules
    stepnamenext?: string;
    // Собирает отображения styles для колонок.   Нужно возвращать валидный объект вида `{"color": "red"}`
    stylerules?: string;
    // Разделитель тысяч
    thousandseparator?: string;
    // Время ожидания выполнения запроса в секундах
    timeout?: string;
    // Подсказка у кнопки
    tipmsg?: string;
    // Заголовок
    title?: string;
    // Отступ от верха в пикселях
    top?: string;
    // Служебный параметр не править
    type?: string;
    // Тип вида кнопки: 1-primary 2-secondary
    uitype?: string;
    // Имя глобальной переменной для обновления
    updateglobal?: string;
    // Имя сервиса для кастомных операций
    updatequery?: string;
    // Поле содержит уникальный идентификатор записи
    valuefield?: string;
    // Признак отображения в автособираемом окне неактивных полей
    visibileinwindow?: string;
    // Признак отображения колонки
    visible?: string;
    // Ширина поля. Целое число от 1% до 100%. Обязательно добавлять %.
    width?: string;
    // Обновления связанных сторов (таблиц, панелей) при закрытии модального окна
    winreloadstores?: string;
    // Тип окна (влияет на ширину окна): narrow: 500px, default: 800px, wide: 1000px, xwide: 1200px, xlwide: 1600px
    wintype?: string;
}
// BUILDER_CONFIG_END

export interface IBuilderConfig extends IBuilderBaseConfig {
    // Идентификатор класса
    ckId?: string;
    // Ротельно класса
    ckParent: string;
    ckMaster?: string;
    ckQuery?: string;
    ckPageObject: string;
    cvDisplayed?: string;
    cvName?: string;
    ckObject?: string;
    contentwidth?: string;
    // Служебный параметр для иерархии
    bottombtn?: IBuilderConfig[];
    // Служебный параметр для иерархии
    childs?: IBuilderConfig[];
    // Служебный параметр для иерархии
    childwindow?: IBuilderConfig[];
    // Служебный параметр для иерархии
    columns?: IBuilderConfig[];
    // Служебный параметр для иерархии
    editors?: IBuilderConfig[];
    // Служебный параметр для иерархии
    filters?: IBuilderConfig[];
}

export type IBuilderMode = "1" | "2" | "3" | "4" | "6" | string;

export interface IBuilderFilter extends IBuilderBaseConfig {
    dynamicfilter?: string;
}
