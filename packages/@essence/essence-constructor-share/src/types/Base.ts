import {IForm} from "../Form";
import {IRecordFilter} from "./RecordsModel";

export type ICkId = number | string;

/**
 * 1 - Создание
 * 2 - Редактирование
 * 3 - Удаление
 * 4 - Действие настраивается пользователем
 * 6 - Клонирование
 * 7 - Download файла
 * 8 - Upload файла
 */
export type IBuilderMode = "1" | "2" | "3" | "4" | "6" | "7" | "8" | string;

export type FieldValue = number | string | Record<string, any> | undefined | null | boolean | any[];

export interface IFormOptions {
    filter?: IRecordFilter[];
    formData?: FormData;
    reset?: boolean;
    form?: IForm;
    redirect?: boolean;
    noLoad?: boolean;
    selectedRecordId?: ICkId;
}
export interface IRecord {
    [$key: string]: FieldValue;
}
