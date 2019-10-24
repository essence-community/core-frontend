// @flow
import {type Form} from "mobx-react-form";

/**
 * 1 - Создание
 * 2 - Редактирование
 * 3 - Удаление
 * 4 - Действие настраивается пользователем
 * 6 - Клонирование
 */
export type BuilderModeType = "1" | "2" | "3" | "4" | "6" | string;

export type BuilderBaseType = {
    ckObject: string,
    ckPageObject: string,
    ckMaster?: string,
    cvDisplayed?: string,
    cnOrder?: number,
    ckPage?: string,
    align?: string,
    className?: string,
    checkaddmore?: string,
    hiddenrules?: string,
    autoload?: "true" | "false",
    setglobal?: string,
    getglobal?: string,
    reqsel?: "false" | "true",
    disabledrules?: string,
    disabledemptymaster?: string,
    cvDescription?: string,
    cvName: string,
    edittype?: string,
    title?: string,
    customid?: string,
    clIsMaster?: number,
    extraplugingate?: string,
    idproperty?: string,
    ckDEndpoint?: string,
    ckQuery?: string,
    datatype?: string,
    // Ширина в формате 0-100%. Величина всегда в процентах.
    width?: string,
    handler?: string,
    height?: string,
    minheight?: string,
    maxheight?: string,
    ckwindow?: string,
    timeout?: string,
    modeaction?: string,
    updatequery?: string,
    type?: string,
    childs?: Array<BuilderBaseType>,
    collapsible?: "true" | "false",
    column?: string,
    contentview?: "hbox" | "vbox",
    getglobaltostore?: string,
    noglobalmask?: "true" | "false",
    // Показывать иконку с аудитом для грида
    btnaudit?: "true" | "false",
    // Признак сохранения данных фильтра в кеше
    filtervaluessave?: "true" | "false",
    // Признак скрытия колонки с действиями
    hideactions?: "true" | "false",
    // Признак перезагрузки всех данных после сохранения/обновления.
    refreshallrecords?: "true" | "false",
    // Флаг наличия сплитера
    spliter?: "true" | "false",
    wintype?: "default" | "narrow" | "wide" | "xlwide" | "xwide",

    mode?: BuilderModeType,

    decimalprecision?: string,
    decimalseparator?: string,
    thousandseparator?: string,
    currencysign?: string,

    // Внутрении атрибуты
    clearonsearch?: "true" | "false",
};

export type CkIdType = string | number;

export type FormOptionsType = {
    filter?: Array<Object>,
    reset?: boolean,
    form?: Form,
    noClean?: boolean,
    noLoad?: boolean,
    selectedRecordId?: CkIdType,
};
