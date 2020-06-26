import {IBuilderConfig} from "@essence-community/constructor-share/types";

export interface IBuilderClassConfig {
    // Служебный параметр не править
    type: "AUTH_FORM";
    // Служебный параметр для иерархии
    childs?: IBuilderConfig[];
    // Служебный параметр для иерархии
    bottombtn?: IBuilderConfig[];
    // Служебные параметры
    ck_parent: string;
    ck_page_object: string;
}
