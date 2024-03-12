import {IBuilderConfig, IBuilderAttrGlobal} from "@essence-community/constructor-share/types";

export interface IBuilderClassConfig extends IBuilderConfig {
    // Расположение текста:
    // left - слева,
    // center - по центру,
    // right - справа
    align?: "left" | "right" | "center" | "top";
    // Ширина поля. Целое число от 1% до 100%. Обязательно добавлять %.
    width?: string;
    // Служебный параметр не править
    type: "FORMPANEL";
    // Наименование глобальной переменной для обновления
    updateglobal?: string;
    // Служебный параметр для иерархии
    childs?: IBuilderConfig[];
    // Наименование глобальной переменной. Должно начинаться с g
    setglobal?: IBuilderAttrGlobal[];
    // Вид наполнения:
    // hbox: горизонтальное
    // hbox-wrap: горизонтальное с переносом на следующую строку
    // vbox: вертикальное
    contentview?: "hbox" | "hbox-wrap" | "vbox";
    idproperty?: string;
    // Служебные параметры
    ck_parent: string;
    ck_page_object: string;
}
