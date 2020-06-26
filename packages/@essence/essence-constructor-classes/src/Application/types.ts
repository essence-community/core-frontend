import {IBuilderConfig, IBuilderAttrGlobalStore} from "@essence-community/constructor-share/types";

export interface IBuilderClassConfig {
    // Правила для выбора активного элемента
    activerules?: string;
    // URL страницы, на которую будет произведен переход
    redirecturl?: string;
    // Значение по умолчанию
    // CheckBox: true/false
    // DateField: sysdate - текущее время или дата в формате ISO 8601 2005-08-09T18:31:42
    // для выбора первой записи указать значение "##first##"
    //  для выбора первой записи всегда - указать значение "##alwaysfirst##"
    defaultvalue: string;
    // Служебный параметр для иерархии
    childwindow?: IBuilderConfig[];
    // Наименование глобалки в которую добавляется выбранная строка.
    setrecordtoglobal?: string;
    // Наименование параметра из мастера,
    // который будет передан в json в виде "master": {"наименование_параметра":"значение"}
    getmastervalue: IBuilderAttrGlobalStore[];
    // Служебный параметр для иерархии
    childs?: IBuilderConfig[];
    // Наименование параметра, отвечающего за уникальность записей
    idproperty: string;
    // Служебный параметр не править
    type: "APPLICATION";
    // Служебные параметры
    ck_parent: string;
    ck_page_object: string;
}
