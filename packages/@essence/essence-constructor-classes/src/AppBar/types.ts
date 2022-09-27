import {IBuilderConfig} from "@essence-community/constructor-share/types";

export interface IBuilderClassConfig {
    // Ширина поля. Целое число от 1% до 100%. Обязательно добавлять %.
    width?: string;
    maxheight?: string;
    maxwidth?: string;
    minheight?: string;
    minwidth?: string;
    // Тип вида кнопки: 1-primary 2-secondary
    uitype: "1" | "2" | "3" | "4";
    // Позиция компонента
    position: "fixed" | "absolute" | "relative" | "static" | "sticky";
    // Статическая высота в пикселях (px)
    height: string;
    // Вид наполнения:
    // hbox: горизонтальное
    // hbox-wrap: горизонтальное с переносом на следующую строку
    // vbox: вертикальное
    contentview: "hbox" | "hbox-wrap" | "vbox";
    // Служебный параметр не править
    type: "APP_BAR";
    // Служебный параметр для иерархии
    childs?: IBuilderConfig[];
    // Служебные параметры
    ck_parent: string;
    ck_page_object: string;
}
