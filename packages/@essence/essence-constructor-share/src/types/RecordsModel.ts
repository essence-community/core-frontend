import {IBuilderMode, ICkId, IRecord} from "./Base";
import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel";
import {IStoreBaseModel} from "./StoreBaseModel";
import {FieldValue} from "./Field";
import {IApplicationModel} from "./Application";
import {IRouteRecord} from "./RoutesModel";

export interface IRecordsOrder {
    direction?: string;
    property?: string;
}

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
    defaultValueSet?: "alwaysfirst" | "first";
    isUserReload: boolean;
    records: T[];
    status: RecordsStateStatusType;
}

export interface IOptions {
    valueField?: string;
    parentStore?: IStoreBaseModel;
    noLoadChilds?: boolean;
    pageStore: IPageModel | null;
    applicationStore: IApplicationModel | null;
}

export interface ILoadRecordsProps {
    selectedRecordId?: ICkId;
    status?: RecordsStateStatusType;
    isUserReload?: boolean;
}

export interface ISaveActionOptions {
    action?: "dml" | "upload";
    actionBc: IBuilderConfig;
    query?: string;
    noReload?: boolean;
    files?: File[];
}

export interface IRecordsSearchOptions {
    filter?: Record<string, FieldValue>[];
    reset?: boolean;
    noLoad?: boolean;
    resetFilter?: boolean;
    selectedRecordId?: string;
    status?: RecordsStateStatusType;
    isUserReload?: boolean;
}

export interface IRecordsModel {
    recordsAll: IRecord[];
    records: IRecord[];
    recordsState: IRecordsState<IRecord>;
    selectedRecordId?: FieldValue;
    selectedRecord?: IRecord;
    selectedRecrodValues: object;
    hasSelected: boolean;
    selectedRecordIndex: -1 | number;
    pageNumber: number;
    recordsCount: number;
    order: IRecordsOrder;
    jsonMaster: Record<string, FieldValue>;
    pageSize?: number;
    bc: IBuilderConfig;
    searchValues: Record<string, FieldValue>;
    pageStore: IPageModel | null;
    applicationStore: IApplicationModel | null;
    isLoading: boolean;
    filter?: Record<string, FieldValue>[];
    loadCounter: number;
    valueField: string;
    route: IRouteRecord;
    loadRecordsAction: (props: ILoadRecordsProps) => Promise<any>;
    clearRecordsAction: () => void;
    saveAction: (values: object | object[], mode: IBuilderMode, options: ISaveActionOptions) => Promise<string>;
    downloadAction: (values: object | object[], mode: IBuilderMode, options: ISaveActionOptions) => Promise<string>;
    setSelectionAction: (ckId: FieldValue, key?: string) => Promise<number>;
    setRecordsAction: (records: IRecord[]) => void;
    removeSelectedRecordAction: (options: ISaveActionOptions) => boolean;
    setPageNumberAction: (pageNumber: number) => void;
    setFirstRecord: () => void;
    setPrevRecord: () => void;
    setNextRecord: () => void;
    setLastRecord: () => void;
    setOrderAction: (property: string) => void;
    searchAction: (values: Record<string, FieldValue>, options?: IRecordsSearchOptions) => Promise<void | object>;
    setSearchValuesAction: (values: object) => void;
    clearChildsStoresAction: () => void;
    sortRecordsAction: () => void;
    addRecordsAction: (records: object[]) => void;
    removeRecordsAction: (records: object[], key: string, reload?: boolean) => void;
    setLoadingAction: (isLoading: boolean) => void;
}

export type IRecordsModelConstructor = new (bc: object, pageStore: IPageModel, options?: IOptions) => IRecordsModel;
