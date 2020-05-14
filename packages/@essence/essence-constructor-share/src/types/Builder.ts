import {FieldValue} from "./Field";

/* eslint-disable max-len */

// BUILDER_CONFIG_START
export interface IBuilderBaseConfig {
    // Правила для выбора активного элемента
    activerules?: string;
    // Расположение текста: left - слева, center - по центру, right - справа
    align?: string;
    // Префикс-метка для нового значения. Пример: "allownew" = "NEW:", на сервер уйдет значение "NEW:введенное значение"
    allownew?: string;
    // Признак автозагрузки сервиса
    autoload?: string;
    // Наименование параметра, определяющего уникальность возвращаемых данных.  Если этот столбец есть в filter и заполнен, то сработает автовыбор первой записи
    autoselectidentity?: string;
    // Отображение кнопки "Информация" (true/false)
    btnaudit?: string;
    // Признак сбора статических кнопок в коллектор
    btncollectorall?: string;
    // Отображение кнопки "Удалить" (true/false)
    btndelete?: string;
    // Отображение кнопки "Экспорт в Excel" (true/false)
    btnexcel?: string;
    // Отображение кнопки "Обновить" (true/false)
    btnrefresh?: string;
    // Отображение кнопки "Настройки" (true/false)
    btnsettings?: string;
    // Признак "Добавить еще". Если не заполнен = false
    checkaddmore?: string;
    // Идентификатор для поиска окна в мастере
    ckwindow?: string;
    // Свернута ли панель при инициализации  true = свернута
    collapsed?: string;
    // Признак возможности сворачивания панели true/false
    collapsible?: string;
    // Тип  сбора значений: object - виде объекта array - массив строк
    collectionvalues?: string;
    // Наименование параметра для отображения данных и передачи в Modify
    column?: string;
    // Наименование параметра - конца периода
    columnend?: string;
    // Список полей, по которым будет происходит фильтрация данных. Перечисление через запятую без пробела
    columnsfilter?: string;
    // Наименование параметра - начала периода
    columnstart?: string;
    // Вопрос на подтверждение операции
    confirmquestion?: string;
    // Вид наполнения: hbox: горизонтальное hbox-wrap: горизонтальное с переносом на следующую строку vbox: вертикальное
    contentview?: string;
    // Ширина вложенных полей. Целое число от 1% до 100%. Обязательно добавлять %.
    contentwidth?: string;
    // Подпись для отображения Пример: к деньгам добавляем " руб."
    currencysign?: string;
    // Тип данных колонки
    datatype?: string;
    // Точность после запятой. Если не заполнен, то точность равна 2
    decimalprecision?: string;
    // Разделитель дробного остатка
    decimalseparator?: string;
    // Значение по умолчанию CheckBox: true/false DateField: sysdate - текущее время или дата в формате ISO 8601 2005-08-09T18:31:42 для выбора первой записи указать значение "##first##"  для выбора первой записи всегда - указать значение "##alwaysfirst##"
    defaultvalue?: string;
    // Сервис для запроса значения по умолчанию
    defaultvaluequery?: string;
    // Признак блокировки объекта при инициализации true-блокирован
    disabled?: string;
    // Признак блокировки, если мастер вернул пустое значение
    disabledemptymaster?: string;
    // Правила отображения объекта. Если правило вернет true, то объект станет неактивным. Синтаксис: == - равно != - не равно '>' - больше '<' - меньше '&&' - и '||' - или Пример: gck_mo>1   // если глобальная переменная gck_mo больше 1, то поле заблокируется
    disabledrules?: string;
    // Наименование параметра, который будет отображен
    displayfield?: string;
    // Признак автоматического применения фильтра
    dynamicfilter?: string;
    // Признак изменения вида иконки от данных
    dynamicicon?: string;
    // Режим добавления/редактирования - all/insert/update/disabled
    editmode?: string;
    // Режим редактирования дочерних элементов true = включен
    editmodepanel?: string;
    // Режим добавления/редактирования: inline - в строке; modalwindow - в модальном окне
    edittype?: string;
    // Дополнительные плагины для шлюза
    extraplugingate?: string;
    // Вариант выбора файлов для загрузки. multi - несколько файлов, single - по одному.
    filemode?: string;
    // Тип документа, доступный для выбора при mode = 8. Пример: pdf,docs,doc
    filetypes?: string;
    // Признак сохранения данных фильтра в кеше
    filtervaluessave?: string;
    // Формат данных Для дат номер от 1-6: 1 - ГГГГ 2 - МММ ГГГГ 3 - ДД.ММ.ГГГГ 4 - ДД.ММ.ГГГГ ЧЧ:00 5 - ДД.ММ.ГГГГ ЧЧ:МИ 6 - ДД.ММ.ГГГГ ЧЧ:МИ:CC
    format?: string;
    // Наименование глобального параметра, который хранит значение для объекта
    getglobal?: string;
    // Наименование глобального параметра, который хранит список значений для combobox
    getgloballist?: string;
    // Список глобальных переменных(через запятую), передаваемых в filter сервиса на объекте.  Пример: Если указать gck_mo, то положит в json.filter.gck_mo Если указать gck_mo=ck_mo, то положит в json.filter.ck_mo
    getglobaltostore?: string;
    // Данные получаемые из мастера
    getmastervalue?: string;
    // Обработчик в ExtJS onCreateChildWindowMaster - для вызова окна при создании onRowCreateChildWindowMaster - для вызова окна при редактировании onSimpleSaveWindow - сохранение данных по кнопке для модального окна onCloseWindow - закрытие модального окна onCloseWindowSilent - закрытие модального окна без сообщения onPrintHandleOnline - Онлайн печать onPrintHandleOffline - Отложенная печать
    handler?: string;
    // Статическая высота в пикселях (px)
    height?: string;
    // Признак скрытия объекта при инициализации true-скрыт
    hidden?: string;
    // Правила отображения объекта. Если правило вернет true, то объект скрывается. Синтаксис: == - равно != - не равно '>' - больше '<' - меньше '&&' - и '||' - или Пример: gck_mo>1   // если глобальная переменная gck_mo больше 1, то поле скроется
    hiddenrules?: string;
    // Признак скрытия всех кнопок (true/false)
    hideactions?: string;
    // Иконка (например, fa-plus)
    iconfont?: string;
    // Наименование класса или наименование колонки при динамике
    iconfontname?: string;
    // Наименование параметра из мастера, который будет передан в json в виде "master":{"наименование_параметра":"значение"}
    idproperty?: string;
    // Маска ввода, например: (999) 999-99-99
    imask?: string;
    // Дополнительная информация для полей ввода
    info?: string;
    // Установка значение из локализационного пакета. Возможные значения: meta, message
    localization?: string;
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
    // Минимальное количество символов
    minsize?: string;
    // Минимальное значение
    minvalue?: string;
    // Тип операции 1 - Добавление 2 - Редактирование 3 - Удаление 4 - Вызов сервиса из атрибута updatequery 5 - Вызов меню с информацией 6 - Режим клонирования значений 7 - Режим выгрузки файла 8 - Режим загрузки файла
    mode?: string;
    // Значение action, передаваемое в json вместо стандартных I,U,D
    modeaction?: string;
    // Признак отключения глобального лоадера при загрузке сервиса
    noglobalmask?: string;
    // Отображается только иконка кнопки (true/false)
    onlyicon?: string;
    // Направление сортировки: ASC / DESC
    orderdirection?: string;
    // Наименование параметра, по которому осуществляется сортировка при инициализации
    orderproperty?: string;
    // Количество выводимых строк (включает пагинатор)
    pagesize?: string;
    // Высота выпадающей таблицы/списка. По умолчанию 390
    pickerheight?: string;
    // Ширина выпадающей таблицы/списка
    pickerwidth?: string;
    // Позиция компонента
    position?: string;
    // Пауза (в сек) до вызова сервиса с применением фильтра
    querydelay?: string;
    // Режим вызова сервиса: remote или local
    querymode?: string;
    // Наименование параметра, по которому фильтруются значения при вводе
    queryparam?: string;
    // Признак Только чтение
    readonly?: string;
    // Правила отображения объекта. Если правило вернет true, то объект перейдет в режим "Только чтение".  Синтаксис: == - равно != - не равно '>' - больше '<' - меньше '&&' - и '||' - или Пример: gck_mo>1   // если глобальная переменная gck_mo больше 1, то объект перейдет в режим "только чтение"
    readonlyrules?: string;
    // Список Ключ-Значения в Combo
    records?: Record<string, FieldValue>[];
    // URL страницы, на которую будет произведен переход
    redirecturl?: string;
    // Наименование запроса, возвращающего cv_url для перехода
    redirectusequery?: string;
    // Признак перезагрузки всех данных после сохранения/обновления.   false - после сохранения/обновления запись подгружается одна без перезагрузки всего списка   true - список перегружается полнстью, при этом сама запись может не показать, если не попала под фильтр или пагинацию
    refreshallrecords?: string;
    // Регулярное выражение для проверки введенного значения
    regexp?: string;
    // Признак обновления родителя по мастеру
    reloadmaster?: string;
    // Количество обязательно заполненных полей в группе, требуемое для корректной валидации
    reqcount?: string;
    // Правила для изменения количества обязательно заполненных полей в группе. Имеет приоритет над reqcount
    reqcountrules?: string;
    // Признак зависимости от мастера (true/false)
    reqsel?: string;
    // Признак обязательности заполнения
    required?: string;
    // Правила обязательности объекта. Только глобальные переменные.  Синтаксис: == - равно != - не равно '>' - больше '<' - меньше '&&' - и '||' - или Пример: gck_mo>1   // если глобальная переменная gck_mo больше 1, то поле станет обязательным
    requiredrules?: string;
    // Признак доступности изменения ширины объекта (true/false)
    resizable?: string;
    // Отображение корня
    rootvisible?: string;
    // Возможность выделения нескольких значений в GRID и TREEGRID SINGLE - только 1 значение SIMPLE - позволяет выбирать значения одно-за-другим. Каждое нажатие добавляет/удаляет значение. MULTI - позволяет комплексно выбирать значения, с учетом ctrl и shift
    selmode?: string;
    // Наименование глобальной переменной. Должно начинаться с g
    setglobal?: string;
    // Наименование глобальной переменной. Должно начинаться с g
    setrecordtoglobal?: string;
    // Наименование парамента, по которому будет осуществлена сортировка вместо column
    sortcolumn?: string;
    // Признак отображения сплиттера (true/false)
    splitter?: string;
    // Наименование шага
    stepname?: string;
    // Наименование следующего шага Может принимать выражение вида: "выражение?верный-шаг:неверный-шаг"
    stepnamenext?: string;
    // Правила применения стилей для колонок.  Нужно возвращать валидный объект вида `{"color": "red"}`
    stylerules?: string;
    // Ширина Tab Panel
    tabwidth?: string;
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
    // Формат возвращаемого значения с сервиса. Значения: "URL", "HTML". Допускаются условия с учетом глобальных переменных.
    typeiframe?: string;
    // Тип вида кнопки: 1-primary 2-secondary
    uitype?: string;
    // Наименование глобальной переменной для обновления
    updateglobal?: string;
    // Наименование сервиса для кастомных операций
    updatequery?: string;
    // Наименование параметра, содержащего уникальный идентификатор записи
    valuefield?: string;
    // Признак отображения колонки
    visible?: string;
    // Признак отображения в автособираемом окне неактивных полей (анализирует editmode)
    visibleinwindow?: string;
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
    records?: Record<string, FieldValue>[];
    // Interanal
    confirmquestionposition?: "right" | "top";
    // Internal
    iconsize?: "xs";
}

export type IBuilderMode = "1" | "2" | "3" | "4" | "6" | "7" | "8";

export interface IBuilderFilter extends IBuilderBaseConfig {
    dynamicfilter?: string;
}
