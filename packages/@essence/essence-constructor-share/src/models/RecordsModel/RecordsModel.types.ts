import {ObservableMap} from "mobx";
import {FieldValue, IBuilderConfig, RecordsStateStatusType, IRecordsOrder, IApplicationModel} from "../../types";
import {VAR_META_JN_FETCH, VAR_META_JN_OFFSET, VAR_META_JL_FILTER, VAR_META_JL_SORT} from "../../constants";

export interface IJson {
    filter: Record<string, FieldValue>;
    master?: Record<string, FieldValue>;
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
    [VAR_META_JL_FILTER]?: Record<string, FieldValue>[];
    [VAR_META_JL_SORT]: IRecordsOrder[];
    [VAR_META_JN_FETCH]: number;
    [VAR_META_JN_OFFSET]: number;
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
