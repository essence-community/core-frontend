// eslint-disable-next-line import/named
import {IObservableArray} from "mobx";
import {Form} from "mobx-react-form";
import {IApplicationModel} from "./Application";
import {IBuilderConfig, IBuilderMode} from "./Builder";
import {FieldValue} from "./Field";
import {IPageModel} from "./PageModel";
import {IRecordsModel} from "./RecordsModel";

export interface IStoreBaseModelProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    applicationStore?: IApplicationModel;
    disabled?: boolean;
    hidden?: boolean;
}

export type StoreBaseModelNameType =
    | "base"
    | "grid"
    | "filePanel"
    | "itemselector"
    | "combofield"
    | "panelForm"
    | "window"
    | "filter";

export interface IHandlerOptions {
    form?: Form;
    files?: File[];
    values?: Record<string, FieldValue>;
}

export type HandlerType = (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => Promise<boolean>;

export interface IHandlers {
    [name: string]: HandlerType;
}

export type RowRecord = Record<string, FieldValue>;
/**
 * Базовая модель для построения сторов
 *
 * reloadStoreAction - Запускается при изменения зависимого стора/поля по ck_master
 *  checkParent - Позволяет обновлять стор вверх
 * clearStoreAction - Запускается при очистки зависимого стора/поля по ck_master
 */
export interface IStoreBaseModel {
    name?: StoreBaseModelNameType;
    hidden?: boolean;
    disabled?: boolean;
    pageStore: IPageModel;
    bc: IBuilderConfig;
    handlers: IHandlers;
    recordsStore?: IRecordsModel;
    applicationStore?: IApplicationModel;
    selectedRecord?: RowRecord;
    selectedEntries?: IObservableArray<RowRecord>;
    afterSelected?: () => void;
    reloadStoreAction: (checkParent?: boolean) => Promise<object | undefined>;
    clearStoreAction: () => void;
}
