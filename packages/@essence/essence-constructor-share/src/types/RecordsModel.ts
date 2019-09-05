import {IBuilderMode, ICkId, IFormOptions, IRecord} from "./Base";
import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel"
import {IStoreBaseModel} from "./StoreBaseModel";

export interface IRecordsOrder {
    direction?: string,
    property?: string,
}

export type SelectedRecordIdType = number | string;
export type RecordsStateStatusType =
    | "init"
    | "autoload"
    | "reload"
    | "load"
    | "firstload"
    | "search"
    | "add"
    | "remove"
    | "clear"
    | "sort"
    | "set"
    | "attach"
    | "save-any";
export interface IRecordsState<T> {
    defaultValueSet?: "alwaysfirst" | "first",
    isUserReload: boolean,
    records: T[],
    status: RecordsStateStatusType,
}

export interface IOptions {
    valueField?: string,
    parentStore?: IStoreBaseModel,
    noLoadChilds?: boolean,
}

export interface ILoadRecordsProps {
    selectedRecordId?: ICkId,
    status?: RecordsStateStatusType,
}

export interface ISaveActionOptions {
    action?: "dml" | "upload",
    actionBc: IBuilderConfig,
    query?: string,
    formData?: any,
    noReload?: boolean,
}

export interface IRecordsModel {
    name: "records";
    records: IRecord[];
    recordsState: IRecordsState<IRecord>;
    selectedRecordId?: SelectedRecordIdType;
    selectedRecord?: IRecord;
    selectedRecrodValues: object;
    hasSelected: boolean;
    selectedRecordIndex: -1 | number;
    pageNumber: number;
    recordsCount: number;
    order: IRecordsOrder;
    pageSize?: number;
    bc: IBuilderConfig;
    searchValues: object;
    pageStore: IPageModel;
    isLoading: boolean;
    filter: object[];
    jsonMaster?: any;
    loadCounter: number;
    valueField: string;
    loadRecordsAction: (props: ILoadRecordsProps) => Promise<any>;
    clearRecordsAction: () => void;
    saveAction: (
        values: object | object[],
        mode: IBuilderMode,
        options: ISaveActionOptions,
    ) => Promise<string>;
    downloadAction: (
        values: object | object[],
        mode: IBuilderMode,
        options: ISaveActionOptions,
    ) => Promise<string>;
    setSelectionAction: (ckId?: SelectedRecordIdType, key?: string) => Promise<number>;
    setRecordsAction: (records: IRecord[]) => void;
    removeSelectedRecordAction: (options: ISaveActionOptions) => boolean;
    setPageNumberAction: (pageNumber: number) => void;
    setFirstRecord: () => void;
    setPrevRecord: () => void;
    setNextRecord: () => void;
    setLastRecord: () => void;
    setOrderAction: (property: string) => void;
    searchAction: (values: object, options?: IFormOptions) => Promise<void | object>;
    setSearchValuesAction: (values: object) => void;
    clearChildsStoresAction: () => void;
    sortRecordsAction: () => void;
    addRecordsAction: (records: object[]) => void;
    removeRecordsAction: (records: object[], key: string, reload?: boolean) => void;
    setLoadingAction: (isLoading: boolean) => void;
}

export type IRecordsModelConstructor = new (bc: object, pageStore: IPageModel, options?: IOptions) => IRecordsModel;
