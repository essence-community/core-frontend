// @flow
import {type BuilderModeType, type CkIdType, type FormOptionsType, type BuilderBaseType} from "../../BuilderType";
import {type PageModelType} from "../PageModel";

export type OrderType = {
    direction?: string,
    property?: string,
};

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
export type RecordsStateType<T> = {
    defaultValueSet?: "##alwaysfirst##" | "##first##",
    isUserReload: boolean,
    records: Array<T>,
    status: RecordsStateStatusType,
};

export type OptionsType = {
    valueField?: string,
    parentStore?: Object,
    noLoadChilds?: boolean,
};

export type LoadRecordsPropsType = {
    selectedRecordId?: CkIdType,
    status?: RecordsStateStatusType,
};

export type SaveActionOptionsType = {|
    action?: "dml" | "upload",
    actionBc: BuilderBaseType,
    query?: string,
    files?: File[],
    filesNames?: Array<string>,
|};

export interface RecordsModelInterface<T: {}> {
    name: "records";
    records: Array<T>;
    recordsState: RecordsStateType<T>;
    selectedRecordId: ?SelectedRecordIdType;
    selectedRecord: any | T;
    selectedRecrodValues: Object;
    hasSelected: boolean;
    selectedRecordIndex: -1 | number;
    pageNumber: number;
    recordsCount: number;
    order: OrderType;
    pageSize: ?number;
    bc: any;
    searchValues: Object;
    pageStore: PageModelType;
    isLoading: boolean;
    filter: Array<Object>;
    jsonMaster?: any;
    loadCounter: number;
    valueField: string;
    constructor(bc: Object, pageStore: PageModelType, options?: OptionsType): void;
    loadRecordsAction: (props?: LoadRecordsPropsType) => Promise<any>;
    clearRecordsAction: () => void;
    saveAction: (
        values: Object | Array<Object>,
        mode: BuilderModeType,
        options: SaveActionOptionsType,
    ) => Promise<?string>;
    downloadAction: (
        values: Object | Array<Object>,
        mode: BuilderModeType,
        options: SaveActionOptionsType,
    ) => Promise<?string>;
    setSelectionAction: (ckId: ?SelectedRecordIdType, key?: string) => Promise<number>;
    setRecordsAction: (records: Array<T>) => void;
    removeSelectedRecordAction: (options: SaveActionOptionsType) => boolean;
    setPageNumberAction: (pageNumber: number) => void;
    setFirstRecord: () => void;
    setPrevRecord: () => void;
    setNextRecord: () => void;
    setLastRecord: () => void;
    setOrderAction: (property: string) => void;
    searchAction: (values: Object, options?: FormOptionsType) => Promise<void | Object>;
    setSearchValuesAction: (values: Object) => void;
    +clearChildsStoresAction: () => void;
    sortRecordsAction: () => void;
    addRecordsAction: (records: Array<Object>) => void;
    removeRecordsAction: (records: Array<Object>, key: string, reload?: boolean) => void;
    setLoadingAction: (isLoading: boolean) => void;
}

export type RecordsModelType = $ReadOnly<RecordsModelInterface<Object>>;
export type RecordsModelInstanceType = RecordsModelInterface<Object>;
