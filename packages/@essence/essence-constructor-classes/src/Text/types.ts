export interface IBuilderClassConfig {
    // Служебный параметр не править
    type: "TEXT";
    // Правила отображения объекта. Если правило вернет true, то объект станет неактивным.
    // Синтаксис:
    // == - равно
    // != - не равно
    // '>' - больше
    // '<' - меньше
    // '&&' - и
    // '||' - или
    // Пример:
    // gck_mo>1   // если глобальная переменная gck_mo больше 1, то поле заблокируется
    disabledrules?: string;
    // Признак скрытия объекта при инициализации
    // true-скрыт
    hidden: boolean;
    // Правила отображения объекта. Если правило вернет true, то объект скрывается.
    // Синтаксис:
    // == - равно
    // != - не равно
    // '>' - больше
    // '<' - меньше
    // '&&' - и
    // '||' - или
    // Пример:
    // gck_mo>1   // если глобальная переменная gck_mo больше 1, то поле скроется
    hiddenrules?: string;
    // Выводимое статическое сообщение в виде markdown
    text?: string;
    // Расчетное поле text
    textuseparameter?: boolean;
    // Признак блокировки объекта при инициализации
    // true-блокирован
    disabled: boolean;
    // Служебные параметры
    ck_parent: string;
    ck_page_object: string;
}
