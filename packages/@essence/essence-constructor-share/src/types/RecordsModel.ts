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
    defaultValueSet?: "##alwaysfirst##" | "##first##";
    isUserReload: boolean;
    isDefault?: "##alwaysfirst##" | "##first##";
    records: T[];
    record?: T;
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
    recordId: string;
    records: IRecord[];
    recordsState: IRecordsState<IRecord>;
    selectedRecordId?: FieldValue;
    selectedRecord?: IRecord;
    selectedRecrodValues: IRecord;
    hasSelected: boolean;
    selectedRecordIndex: -1 | number;
    pageNumber: number;
    recordsCount: number;
    order: IRecordsOrder;
    jsonMaster: IRecord;
    pageSize?: number;
    bc: IBuilderConfig;
    searchValues: IRecord;
    pageStore: IPageModel | null;
    applicationStore: IApplicationModel | null;
    isLoading: boolean;
    filter?: IRecord[];
    loadCounter: number;
    valueField: string;
    route: IRouteRecord;
    loadRecordsAction: (props: ILoadRecordsProps) => Promise<undefined | IRecord>;
    clearRecordsAction: () => void;
    saveAction: (values: IRecord | IRecord[], mode: IBuilderMode, options: ISaveActionOptions) => Promise<string>;
    downloadAction: (values: IRecord | IRecord[], mode: IBuilderMode, options: ISaveActionOptions) => Promise<string>;
    setSelectionAction: (ckId: FieldValue, key?: string) => Promise<number>;
    setRecordsAction: (records: IRecord[]) => void;
    removeSelectedRecordAction: (options: ISaveActionOptions) => boolean;
    setPageNumberAction: (pageNumber: number) => void;
    setFirstRecord: () => void;
    setPrevRecord: () => void;
    setNextRecord: () => void;
    setLastRecord: () => void;
    setOrderAction: (property: string) => void;
    searchAction: (values: IRecord, options?: IRecordsSearchOptions) => Promise<void | object>;
    setSearchValuesAction: (values: IRecord) => void;
    clearChildsStoresAction: () => void;
    sortRecordsAction: () => void;
    addRecordsAction: (records: IRecord[]) => void;
    removeRecordsAction: (records: IRecord[], key: string, reload?: boolean) => void;
    setLoadingAction: (isLoading: boolean) => void;
}

export type IRecordsModelConstructor = new (
    bc: IBuilderConfig,
    pageStore: IPageModel,
    options?: IOptions,
) => IRecordsModel;
