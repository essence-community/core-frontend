/* eslint-disable max-len */
import type {TFunction} from "i18next";

/**
 * 1 - Создание
 * 2 - Редактирование
 * 3 - Удаление
 * 4 - Действие настраивается пользователем
 * 6 - Клонирование
 * 7 - Скачивание
 * 8 - ?
 */
export type IBuilderMode = "1" | "2" | "3" | "4" | "6" | "7" | "8";

export type ICkId = number | string;
export type IRecord = unknown;
export type FieldValue = unknown;
export type TText = string | JSX.Element | ((trans: TFunction) => string | JSX.Element);

export interface IRecordsOrder {
    direction: "ASC" | "DESC";
    datatype?: string;
    format?: string;
    property: string;
}

export interface IBuilderAttrGlobal {
    in?: string;
    out: string;
    required?: boolean;
    reload?: boolean;
}

export interface IBuilderAttrGlobalStore {
    in: string;
    out?: string;
    required?: boolean;
    reload?: boolean;
}

// BUILDER_CONFIG_START
export interface IBuilderBaseConfig {
    // Правила для выбора активного элемента
    activerules?: string;
    // Расположение текста: left - слева, center - по центру, right - справа
    align?: "left" | "right" | "center" | "top";
    // Префикс-метка для нового значения. Пример: "allownew" = "NEW:", на сервер уйдет значение "NEW:введенное значение"
    allownew?: string;
    // Признак автозагрузки сервиса
    autoload?: boolean;
    // Наименование параметра, определяющего уникальность возвращаемых данных.  Если этот столбец есть в filter и заполнен, то сработает автовыбор первой записи
    autoselectidentity?: string;
    // Отображение кнопки "Информация" (true/false)
    btnaudit?: boolean;
    // Признак сбора статических кнопок в коллектор
    btncollectorall?: boolean;
    // Отображение кнопки "Удалить" (true/false)
    btndelete?: boolean;
    // Отображение кнопки "Экспорт в Excel" ("off" | "url" | "file")
    btnexcel?: "off" | "url" | "file";
    // Признак доступности фильтрации по колонке  True - фильтрация включена  False - фильтрация выключена
    btnfilter?: boolean;
    // Отображение кнопки "Обновить" (true/false)
    btnrefresh?: boolean;
    // Отображение кнопки "Настройки" (true/false)
    btnsettings?: boolean;
    // Признак "Добавить еще". Если не заполнен = false
    checkaddmore?: boolean;
    // Идентификатор для поиска окна в мастере
    ckwindow?: string;
    // Свернута ли панель при инициализации  true = свернута
    collapsed?: boolean;
    // Признак возможности сворачивания панели true/false
    collapsible?: boolean;
    // Тип  сбора значений: object - виде объекта array - массив строк
    collectionvalues?: "object" | "array";
    // Наименование параметра для отображения данных и передачи в Modify
    column?: string;
    // Наименование параметра - конца периода
    columnend?: string;
    // Список полей, по которым будет происходит фильтрация данных. Перечисление через запятую без пробела
    columnsfilter?: IBuilderAttrGlobal[];
    // Наименование параметра - начала периода
    columnstart?: string;
    // Вопрос на подтверждение операции
    confirmquestion?: string;
    // Вид наполнения: hbox: горизонтальное hbox-wrap: горизонтальное с переносом на следующую строку vbox: вертикальное
    contentview?: "hbox" | "hbox-wrap" | "vbox" | "vbox-wrap";
    // Ширина вложенных полей. Целое число от 1% до 100%. Обязательно добавлять %.
    contentwidth?: string;
    // Подпись для отображения Пример: к деньгам добавляем " руб."
    currencysign?: string;
    // Тип данных колонки
    datatype?: string;
    // Точность после запятой. Если не заполнен, то точность равна 2
    decimalprecision?: number;
    // Разделитель дробного остатка
    decimalseparator?: string;
    // Значение по умолчанию CheckBox: true/false DateField: sysdate - текущее время или дата в формате ISO 8601 2005-08-09T18:31:42 для выбора первой записи указать значение "##first##"  для выбора первой записи всегда - указать значение "##alwaysfirst##"
    defaultvalue?: string;
    // Значение по умолчанию из словаря локализации
    defaultvaluelocalization?: string;
    // Значение по умолчанию расчитываемое
    defaultvaluerule?: string;
    // Сервис для запроса значения по умолчанию
    defaultvaluequery?: string;
    // Признак блокировки объекта при инициализации true-блокирован
    disabled?: boolean;
    // Признак блокировки, если мастер вернул пустое значение
    disabledemptymaster?: boolean;
    // Правила отображения объекта. Если правило вернет true, то объект станет неактивным. Синтаксис: == - равно != - не равно '>' - больше '<' - меньше '&&' - и '||' - или Пример: gck_mo>1   // если глобальная переменная gck_mo больше 1, то поле заблокируется
    disabledrules?: string;
    // Наименование параметра, который будет отображен
    displayfield?: string;
    // Признак автоматического применения фильтра
    dynamicfilter?: boolean;
    // Признак изменения вида иконки от данных
    dynamicicon?: boolean;
    // Признак возможности переноса
    draggable?: boolean;
    // Разрешено ли менять режим редактирования
    editable?: boolean;
    // режим редактирования формы
    editing?: boolean;
    // изменение edit формы согласно правилам;
    editingrule?: string;
    // Режим добавления/редактирования - all/insert/update/disabled
    editmode?: "all" | "insert" | "update" | "disabled" | "insert-editing" | "update-editing";
    // Режим редактирования дочерних элементов true = включен
    editmodepanel?: boolean;
    // Режим добавления/редактирования: inline - в строке; modalwindow - в модальном окне
    edittype?: "inline" | "modalwindow";
    // Дополнительные плагины для шлюза
    extraplugingate?: string;
    // Вариант выбора файлов для загрузки. multi - несколько файлов, single - по одному.
    filemode?: "multi" | "single";
    // Тип документа, доступный для выбора при mode = 8. Пример: pdf,docs,doc
    filetypes?: string;
    // Признак сохранения данных фильтра в кеше
    filtervaluessave?: boolean;
    // Формат данных Для дат номер от 1-6: 1 - ГГГГ 2 - МММ ГГГГ 3 - ДД.ММ.ГГГГ 4 - ДД.ММ.ГГГГ ЧЧ:00 5 - ДД.ММ.ГГГГ ЧЧ:МИ 6 - ДД.ММ.ГГГГ ЧЧ:МИ:CC
    format?: "1" | "2" | "3" | "4" | "5" | "6";
    // Наименование глобального параметра, который хранит значение для объекта
    getglobal?: string;
    // Наименование глобального параметра, который хранит список значений для combobox
    getgloballist?: string;
    // Список глобальных переменных(через запятую), передаваемых в filter сервиса на объекте.  Пример: Если указать gck_mo, то положит в json.filter.gck_mo Если указать gck_mo=ck_mo, то положит в json.filter.ck_mo
    getglobaltostore?: IBuilderAttrGlobalStore[];
    // Наименование параметра из мастера, который будет передан в json в виде "master": {"наименование_параметра":"значение"}
    getmastervalue?: IBuilderAttrGlobalStore[];
    // Обработчик в ExtJS onCreateChildWindowMaster - для вызова окна при создании onRowCreateChildWindowMaster - для вызова окна при редактировании onSimpleSaveWindow - сохранение данных по кнопке для модального окна onCloseWindow - закрытие модального окна onCloseWindowSilent - закрытие модального окна без сообщения onPrintHandleOnline - Онлайн печать onPrintHandleOffline - Отложенная печать free - общий обработчик для передачи данных в сервис
    handler?: string;
    // Статическая высота в пикселях (px)
    height?: string;
    // Признак скрытия объекта при инициализации true-скрыт
    hidden?: boolean;
    // Правила отображения объекта. Если правило вернет true, то объект скрывается. Синтаксис: == - равно != - не равно '>' - больше '<' - меньше '&&' - и '||' - или Пример: gck_mo>1   // если глобальная переменная gck_mo больше 1, то поле скроется
    hiddenrules?: string;
    // Признак скрытия всех кнопок (true/false)
    hideactions?: boolean;
    // Иконка (например, fa-plus)
    iconfont?: string;
    // Наименование класса или наименование колонки при динамике
    iconfontname?: "fa" | "mdi";
    // Наименование параметра, отвечающего за уникальность записей
    idproperty?: string;
    // Наименование параметра, указывающего на родительскую запись родителя
    idpropertyparent?: string;
    // Маска ввода, например: (999) 999-99-99   Если значение для маски пустое или несуществует, то поле будет скрыто
    imask?: string;
    // Дополнительная информация для полей ввода
    info?: string;
    // Значение при создании
    initvalue?: string;
    // Установка значение из локализационного пакета. Возможные значения: meta, message, static
    localization?: "meta" | "message" | "static";
    // Максимальный размер файла в байтах
    maxfile?: number;
    // Максимальная высота
    maxheight?: string;
    // Максимальное возможное количество выбранных элементов
    maxselected?: string;
    // Максимальное количество символов
    maxsize?: string;
    // Максимальное значение. Для значений с дробной частью использовать только точку
    maxvalue?: string;
    // Количество введенных символов для получения подсказок
    minchars?: number;
    // Минимальная высота
    minheight?: string;
    // Минимальное количество символов
    minsize?: string;
    // Минимальное значение
    minvalue?: string;
    // Тип операции 1 - Добавление 2 - Редактирование 3 - Удаление 4 - Вызов сервиса из атрибута updatequery 6 - Режим клонирования значений 7 - Режим выгрузки файла 8 - Режим загрузки файла
    mode?: "1" | "2" | "3" | "4" | "6" | "7" | "8";
    // Значение action, передаваемое в json вместо стандартных I,U,D
    modeaction?: string;
    // Не обращать внимание на form
    noform?: boolean;
    // Признак отключения глобального лоадера при загрузке сервиса
    noglobalmask?: boolean;
    // Отображается только иконка кнопки (true/false)
    onlyicon?: boolean;
    // Сортировка модели
    order?: IRecordsOrder[];
    // Количество выводимых строк (включает пагинатор)
    pagesize?: number;
    // Высота выпадающей таблицы/списка. По умолчанию 390
    pickerheight?: string;
    // Ширина выпадающей таблицы/списка
    pickerwidth?: string;
    // Позиция компонента
    position?:
        | "fixed"
        | "absolute"
        | "relative"
        | "static"
        | "sticky"
        | "top"
        | "bottom"
        | "window"
        | "theme"
        | "inside";
    // Пауза (в сек) до вызова сервиса с применением фильтра
    querydelay?: number;
    // Режим вызова сервиса: remote или local
    querymode?: "remote" | "local";
    // Наименование параметра, по которому фильтруются значения при вводе
    queryparam?: string;
    // Правила отображения объекта. Если правило вернет true, то объект перейдет в режим "Только чтение".  Синтаксис: == - равно != - не равно '>' - больше '<' - меньше '&&' - и '||' - или Пример: gck_mo>1   // если глобальная переменная gck_mo больше 1, то объект перейдет в режим "только чтение"
    readonlyrules?: string;
    // URL страницы, на которую будет произведен переход
    redirecturl?: string;
    // Наименование запроса, возвращающего cv_url для перехода
    redirectusequery?: string;
    // Признак перезагрузки всех данных после сохранения/обновления.   false - после сохранения/обновления запись подгружается одна без перезагрузки всего списка   true - список перегружается полнстью, при этом сама запись может не показать, если не попала под фильтр или пагинацию
    refreshallrecords?: boolean;
    // Регулярное выражение для проверки введенного значения
    regexp?: string;
    // Признак обновления родителя по мастеру
    reloadmaster?: boolean;
    // Количество обязательно заполненных полей в группе, требуемое для корректной валидации
    reqcount?: number;
    // Правила для изменения количества обязательно заполненных полей в группе. Имеет приоритет над reqcount
    reqcountrules?: string;
    // Признак зависимости от мастера (true/false)
    reqsel?: boolean;
    // Признак обязательности заполнения
    required?: boolean;
    // Правила обязательности объекта. Только глобальные переменные.  Синтаксис: == - равно != - не равно '>' - больше '<' - меньше '&&' - и '||' - или Пример: gck_mo>1   // если глобальная переменная gck_mo больше 1, то поле станет обязательным
    requiredrules?: string;
    // Признак доступности изменения ширины объекта (true/false)
    resizable?: boolean;
    // Отображение корня
    rootvisible?: boolean;
    // Наименование глобальной переменной. Должно начинаться с g
    setglobal?: IBuilderAttrGlobal[];
    // Наименование глобалки в которую добавляется выбранная строка.
    setrecordtoglobal?: string;
    // Пропуск проверки формы на ошибки
    skipvalidation?: boolean;
    // Признак отображения сплиттера (true/false)
    splitter?: boolean;
    // Наименование шага
    stepname?: string;
    // Наименование следующего шага Может принимать выражение вида: "выражение?верный-шаг:неверный-шаг"
    stepnamenext?: string;
    // Правила применения стилей для колонок.  Нужно возвращать валидный объект вида `{"color": "red"}`
    stylerules?: string;
    // Ширина Tab Panel
    tabwidth?: string;
    // Выводимое статическое сообщение в виде markdown
    text?: string;
    // Разделитель тысяч
    thousandseparator?: string;
    // Время ожидания выполнения запроса в секундах
    timeout?: number;
    // Подсказка у кнопки
    tipmsg?: string;
    // Заголовок
    title?: string;
    // Отступ от верха в пикселях
    top?: number;
    // Формат возвращаемого значения с сервиса. Значения: "URL", "HTML". Допускаются условия с учетом глобальных переменных.
    typeiframe?: "URL" | "HTML";
    // Тип вида кнопки: 1-primary 2-secondary
    uitype?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "11" | "12" | "14";
    // Наименование глобальной переменной для обновления
    updateglobal?: string;
    // Наименование сервиса для кастомных операций
    updatequery?: string;
    // Наименование параметра из внутреннего сервиса, значение которого будет передано для дальнейшей обработки
    valuefield?: IBuilderAttrGlobalStore[];
    // Признак отображения колонки
    visible?: boolean;
    // Ширина поля. Целое число от 1% до 100%. Обязательно добавлять %.
    width?: string;
    // Обновления связанных сторов (таблиц, панелей) при закрытии модального окна
    winreloadstores?: boolean;
    // Тип окна (влияет на ширину окна): narrow: 500px, default: 800px, wide: 1000px, xwide: 1200px, xlwide: 1600px, fullscreen
    wintype?: "narrow" | "default" | "wide" | "xwide" | "xlwide" | "fullscreen";
}
// BUILDER_CONFIG_END

export interface IBuilderConfig extends IBuilderBaseConfig {
    // Идентификатор класса
    ck_id?: string;
    // Ротельно класса
    ck_parent: string;
    ck_master?: string;
    ck_query?: string;
    ck_page_object: string;
    cv_displayed?: string;
    cv_name?: string;
    ck_object?: string;
    cn_order?: number;
    ck_view?: string;
    // Определяет класс в качестве мастера
    cl_is_master?: boolean;
    contentwidth?: string;
    // Вложенные элементы для построения контекстного меню
    contextmenus?: IBuilderConfig[];
    // Служебный параметр для иерархии
    bottombtn?: IBuilderConfig[];
    // Служебный параметр для иерархии
    childs?: IBuilderConfig[];
    // Служебный параметр для иерархии
    childwindow?: IBuilderConfig[];
    // Служебный параметр для иерархии
    columns?: IBuilderConfig[];
    // Служебный параметр для иерархии
    editors?: IBuilderConfig[] | "false";
    // Служебный параметр для иерархии
    filters?: IBuilderConfig[];
    // Служебный параметр для иерархии
    topbtn?: IBuilderConfig[];
    // Отображение панели с детализацией - Служебная информация
    detail?: IBuilderConfig[];
    // Служебный параметр для передачи статических значений
    records?: Record<string, unknown>[];
    // Служебный параметр не править
    type: string;
    // Признак Только чтение
    readonly?: boolean;
    // Interanal
    confirmquestionposition?: "right" | "top";
    // Internal
    iconsize?: "xs" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x";
    // Internal values for window store or etc.
    values?: unknown;
    // Internal Возможность выделения нескольких значений в GRID и TREEGRID SINGLE - только 1 значение SIMPLE - позволяет выбирать значения одно-за-другим. Каждое нажатие добавляет/удаляет значение. MULTI - позволяет комплексно выбирать значения, с учетом ctrl и shift
    selmode?: "MULTI";
}
