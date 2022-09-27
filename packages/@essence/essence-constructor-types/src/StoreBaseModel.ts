import type {IObservableArray} from "mobx";
import type {IApplicationModel} from "./Application";
import type {IBuilderConfig, IRecord, ICkId, IBuilderMode} from "./Builder";
import type {IPageModel} from "./PageModel";
import type {IRecordsModel} from "./RecordsModel";

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

export type IHandlerOptions = Record<string, unknown>;

export type HandlerType = <O extends IHandlerOptions>(
    mode: IBuilderMode,
    btnBc: IBuilderConfig,
    options: O,
) => Promise<boolean>;

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
    handleNextStepAction?: () => void;
    invokeHandler(name: string, args: [IBuilderMode, IBuilderConfig, IHandlerOptions]): Promise<boolean>;
}
