// eslint-disable-next-line import/named
import {IObservableArray} from "mobx";
import {IForm} from "../Form";
import {IPopoverContext} from "../context";
import {IApplicationModel} from "./Application";
import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel";
import {IRecordsModel} from "./RecordsModel";
import {IRecord, ICkId, IBuilderMode} from "./Base";

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
    popoverCtx?: IPopoverContext;
}

export type HandlerType = (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => Promise<boolean>;

export interface IHandlers {
    [name: string]: HandlerType;
}

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
    selectedRecord?: IRecord;
    selectedEntries?: IObservableArray<[ICkId, IRecord]>;
    editing?: boolean;
    clearAction?: () => void;
    afterSelected?: () => void;
    reloadStoreAction: (checkParent?: boolean) => Promise<IRecord | undefined>;
    clearStoreAction: () => void;
    invokeHandler(name: string, args: [IBuilderMode, IBuilderConfig, IHandlerOptions]): Promise<boolean>;
}
