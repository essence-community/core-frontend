// eslint-disable-next-line import/named
import {IObservableArray} from "mobx";
import {IForm} from "../Form";
import {IApplicationModel} from "./Application";
import {IBuilderConfig, IBuilderMode} from "./Builder";
import {FieldValue} from "./Field";
import {IPageModel} from "./PageModel";
import {IRecordsModel} from "./RecordsModel";
import {IRecord} from "./Base";

export interface IStoreBaseModelProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    applicationStore?: IApplicationModel | null;
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
    form?: IForm;
    files?: File[];
    record?: IRecord;
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
    recordId: string;
    pageStore: IPageModel;
    bc: IBuilderConfig;
    handlers: IHandlers;
    recordsStore?: IRecordsModel;
    applicationStore?: IApplicationModel | null;
    selectedRecord?: RowRecord;
    selectedEntries?: IObservableArray<RowRecord>;
    editing?: boolean;
    afterSelected?: () => void;
    reloadStoreAction: (checkParent?: boolean) => Promise<IRecord | undefined>;
    clearStoreAction: () => void;
}
