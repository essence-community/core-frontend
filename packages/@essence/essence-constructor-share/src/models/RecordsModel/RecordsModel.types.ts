import {ObservableMap} from "mobx";
import {FieldValue, IBuilderConfig, RecordsStateStatusType, IRecordsOrder, IApplicationModel} from "../../types";

export interface IJson {
    filter: Record<string, FieldValue>;
    master: Record<string, FieldValue>;
    [key: string]: FieldValue;
}

export interface IGetFilterDataOptions {
    filter?: Record<string, FieldValue>[];
    order: IRecordsOrder;
    searchValues: Record<string, FieldValue>;
    pageSize?: number;
    pageNumber: number;
}

export interface IGetFilterData {
    jlFilter?: Record<string, FieldValue>[];
    jlSort: IRecordsOrder[];
    jnFetch: number;
    jnOffset: number;
    [searchKey: string]: FieldValue;
}

export interface IAttachGlobalStore {
    bc: IBuilderConfig;
    json: IJson;
    globalValues?: ObservableMap<string, FieldValue>;
}

export interface ILoadRecordsAction {
    applicationStore: IApplicationModel | null;
    bc: IBuilderConfig;
    recordId?: string;
    selectedRecordId?: string;
    isUserReload?: boolean;
    status: RecordsStateStatusType;
}
