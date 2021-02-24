import {ObservableMap} from "mobx";
import {IForm} from "../Form";
import {IBuilderMode, ICkId, IRecord, FieldValue} from "./Base";
import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel";
import {IStoreBaseModel} from "./StoreBaseModel";
import {IApplicationModel} from "./Application";
import {IRouteRecord} from "./RoutesModel";

export interface IRecordsOrder {
    direction: "ASC" | "DESC";
    datatype?: string;
    format?: string;
    property: string;
}

export interface IRecordFilter extends Record<string, FieldValue> {
    datatype?: string;
    format?: string;
    operator: string;
    property: string;
    value: FieldValue;
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
    searchValues?: IRecord;
    applicationStore?: IApplicationModel | null;
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
    formData?: FormData;
    form?: IForm;
}

export interface IRecordsSearchOptions {
    filter?: IRecordFilter[];
    reset?: boolean;
    formData?: FormData;
    noLoad?: boolean;
    selectedRecordId?: ICkId;
    status?: RecordsStateStatusType;
    isUserReload?: boolean;
}

export interface IRecordsModelLite {
    records: IRecord[];
    recordsState: IRecordsState<IRecord>;
    loadCounter: number;
    bc: IBuilderConfig;
    isLoading: boolean;
    recordId: string;
    loadRecordsAction: (props: ILoadRecordsProps) => Promise<void>;
}

export interface IRecordsModel {
    recordsAll: IRecord[];
    recordId: string;
    records: IRecord[];
    recordsState: IRecordsState<IRecord>;
    selectedRecordId?: FieldValue;
    selectedRecord?: IRecord;
    selectedRecordValues: IRecord;
    hasSelected: boolean;
    selectedRecordIndex: -1 | number;
    pageNumber: number;
    recordsCount: number;
    order: IRecordsOrder[];
    jsonMaster: IRecord | Record<string, FieldValue>[];
    pageSize?: number;
    bc: IBuilderConfig;
    searchValues: IRecord;
    pageStore: IPageModel | null;
    applicationStore?: IApplicationModel | null;
    isLoading: boolean;
    filter?: IRecord[];
    formData?: FormData;
    loadCounter: number;
    valueField: string;
    route: IRouteRecord;
    expansionRecords: ObservableMap<ICkId, boolean>;
    selectedRecords: ObservableMap<ICkId, IRecord>;
    recordsTree: Record<string, IRecord[]>;
    loadRecordsAction: (props: ILoadRecordsProps) => Promise<undefined | IRecord>;
    clearRecordsAction: () => void;
    localFilter: () => void;
    saveAction: (values: IRecord | IRecord[], mode: IBuilderMode, options: ISaveActionOptions) => Promise<boolean>;
    removeSelectedRecordAction: (options: ISaveActionOptions) => Promise<boolean>;
    downloadAction: (values: IRecord | IRecord[], mode: IBuilderMode, options: ISaveActionOptions) => Promise<boolean>;
    reloadChildStoresAction: (oldSelect?: IRecord) => Promise<boolean>;
    setSelectionAction: (ckId: FieldValue, key?: string) => Promise<number>;
    setSelectionsAction: (
        records: IRecord[],
        key?: string,
        isMode?: "default" | "append" | "delete",
    ) => Promise<number>;
    setRecordsAction: (records: IRecord[]) => void;
    setPageNumberAction: (pageNumber: number) => void;
    setFirstRecord: () => void;
    setPrevRecord: () => void;
    setNextRecord: () => void;
    setLastRecord: () => void;
    setOrderAction: (order: IRecordsOrder[]) => Promise<void>;
    setRecordToGlobal: () => void;
    searchAction: (values: IRecord, options?: IRecordsSearchOptions) => Promise<void | IRecord>;
    setSearchValuesAction: (values: IRecord) => void;
    clearChildsStoresAction: () => void;
    sortRecordsAction: () => void;
    addRecordsAction: (records: IRecord[]) => void;
    removeRecordsAction: (records: IRecord[], key: string, reload?: boolean) => void;
    setLoadingAction: (isLoading: boolean) => void;
    setFormDataAction: (formData: FormData) => void;
}

export type IRecordsModelConstructor = new (
    bc: IBuilderConfig,
    pageStore: IPageModel,
    options?: IOptions,
) => IRecordsModel;
