import {FieldValue} from "./Field";

export type ICkId = number | string;

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

export interface IFormOptions {
    filter?: object[];
    reset?: boolean;
    form?: any;
    noClean?: boolean;
    noLoad?: boolean;
    selectedRecordId?: ICkId;
}

export type Field = any;
export type FormType = any;

export type WindowModelType = any;
export type StoreModelTypes = any;

export interface IRecord {
    [$key: string]: FieldValue;
}
