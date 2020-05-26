import {IForm} from "../Form";

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

export type FieldValue = number | string | object | undefined | null | boolean;

export interface IFormOptions {
    filter?: Record<string, FieldValue>[];
    reset?: boolean;
    form?: IForm;
    redirect?: boolean;
    noLoad?: boolean;
    selectedRecordId?: ICkId;
}
export interface IRecord {
    [$key: string]: FieldValue;
}
