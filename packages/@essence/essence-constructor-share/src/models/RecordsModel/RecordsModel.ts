/* eslint-disable max-statements */
/* eslint-disable max-lines */
import {action, extendObservable, ObservableMap, observable} from "mobx";
import pLimit from "p-limit";
import {saveAction} from "../../actions/saveAction";
import {
    IBuilderConfig,
    IBuilderMode,
    ICkId,
    IOptions,
    IPageModel,
    IRecord,
    IRecordsModel,
    IRecordsOrder,
    IRecordsState,
    ISaveActionOptions,
    IStoreBaseModel,
    RecordsStateStatusType,
    FieldValue,
    IApplicationModel,
    IRecordsSearchOptions,
    IRouteRecord,
} from "../../types";
import {i18next, debounce, deepFind, getMasterObject, parseMemoize} from "../../utils";
import {
    loggerRoot,
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_JN_TOTAL_CNT,
    VAR_RECORD_PARENT_ID,
    VALUE_SELF_ROOT,
    VALUE_SELF_ALWAYSFIRST,
    VALUE_SELF_FIRST,
} from "../../constants";
import {download} from "../../actions/download";
import {IRecordFilter} from "../../types/RecordsModel";
import {filterFilesData, sortFilesData} from "../../utils/filter";
import {isDeepEqual, isEmpty} from "../../utils/base";
import {IGetValue} from "../../utils/parser";
import {loadRecordsAction} from "./loadRecordsAction";

interface ILoadRecordsProps {
    selectedRecordId?: ICkId;
    status?: RecordsStateStatusType;
    formData?: FormData;
    isUserReload?: boolean;
}

const logger = loggerRoot.extend("RecordsModel");
const WAIT_MULTI_SELECT = 300;

export class RecordsModel implements IRecordsModel {
    selectedRecordId?: FieldValue;

    selectedRecord: IRecord | undefined;

    selectedRecordValues: IRecord;

    @observable
    recordsState: IRecordsState<IRecord>;

    recordsAll: IRecord[];

    records: IRecord[];

    hasSelected: boolean;

    selectedRecordIndex: -1 | number;

    pageNumber: number;

    recordsCount: number;

    order: IRecordsOrder[];

    jsonMaster: Record<string, FieldValue> | Record<string, FieldValue>[];

    @observable
    pageSize: number | undefined;

    pageSizeRange?: number[];

    bc: IBuilderConfig;

    @observable
    searchValues: Record<string, FieldValue>;

    pageStore: IPageModel | null;

    applicationStore?: IApplicationModel | null;

    isLoading: boolean;

    filter?: IRecordFilter[];

    formData?: FormData;

    valueField: string;

    parentStore: IStoreBaseModel | undefined;

    noLoadChilds = false;

    loadCounter: number;

    route: IRouteRecord;

    recordId: string;

    @observable
    expansionRecords: ObservableMap<string, boolean>;
    @observable
    selectedRecords: ObservableMap<ICkId, IRecord>;

    recordsTree: Record<string, IRecord[]>;

    isTree = false;

    recordParentId = VAR_RECORD_PARENT_ID;

    abort?: () => void;

    constructor(bc: IBuilderConfig, options?: IOptions) {
        this.bc = bc;
        this.pageSize = bc.pagesize;
        if (this.pageSize && bc.pagesizerange && bc.pagesizerange.length) {
            this.pageSizeRange = [...bc.pagesizerange];
            if (this.pageSizeRange.indexOf(this.pageSize) < 0) {
                this.pageSizeRange.unshift(this.pageSize);
                this.pageSizeRange.sort((a, b) => a - b);
            }
        }
        this.recordId = bc.idproperty || VAR_RECORD_ID;
        this.recordParentId = bc.idpropertyparent || VAR_RECORD_PARENT_ID;
        this.valueField = this.recordId;
        this.isTree = this.bc.type === "TREEGRID";

        if (options) {
            this.valueField = options.valueField || this.recordId;
            this.parentStore = options.parentStore;
            this.noLoadChilds = options.noLoadChilds || false;
            this.pageStore = options.pageStore;
            this.applicationStore = options.applicationStore || options.pageStore?.applicationStore;
        }
        const {records = []} = bc;

        this.expansionRecords = observable.map({
            [VALUE_SELF_ROOT]: this.isTree,
        });
        this.selectedRecords = observable.map({});

        this.recordsState = {
            isUserReload: false,
            records,
            status: "init",
        };

        this.searchValues = options && options.searchValues ? options.searchValues : {};

        extendObservable(
            this,
            {
                filter: [],
                get hasSelected() {
                    return typeof this.selectedRecordId !== undefined;
                },
                isLoading: false,
                loadCounter: 0,
                order: bc.order,
                pageNumber: 0,
                get records() {
                    return (this as IRecordsModel).recordsState.records;
                },
                recordsAll: records,
                get recordsCount() {
                    return this.records.length ? this.records[0][VAR_RECORD_JN_TOTAL_CNT] || this.records.length : 0;
                },
                get recordsTree() {
                    return this.records.reduce((acc: Record<string, IRecord[]>, record: IRecord) => {
                        const parentId = record[this.recordParentId] as ICkId;

                        if (acc[parentId] === undefined) {
                            acc[parentId] = [];
                        }

                        acc[parentId].push(record);

                        return acc;
                    }, {});
                },
                selectedRecord: undefined,
                get selectedRecordId() {
                    return this.selectedRecord ? deepFind(this.selectedRecord, this.valueField)[1] : undefined;
                },
                selectedRecordIndex: -1,
                get selectedRecordValues() {
                    return this.selectedRecord || {};
                },
            },
            undefined,
            {deep: false},
        );

        if (records.length) {
            if (this.bc.querymode === "local") {
                this.localFilter();
            }
            if (this.bc.defaultvalue || this.bc.defaultvaluerule) {
                this.setLocalDefaultValue();
            }
            this.recordsState.records.forEach((rec) => {
                if (rec.expanded === "true" || rec.expanded === true) {
                    this.expansionRecords.set(String(deepFind(rec, this.valueField)[1]), true);
                }
            });
        }
    }

    getValue: IGetValue["get"] = (key: string) => {
        return this.pageStore?.globalValues.get(key);
    };

    setGetValue = (getValue: IGetValue["get"]): void => {
        this.getValue = getValue;
    };

    @action
    setPageSize = (pageSize: number) => {
        this.pageSize = pageSize;
        this.pageNumber = 0;
        this.loadRecordsAction();
    };

    @action
    loadRecordsAction = ({selectedRecordId, status = "load", isUserReload}: ILoadRecordsProps = {}) => {
        this.loadCounter += 1;
        if (!this.bc[VAR_RECORD_QUERY_ID]) {
            logger(i18next.t("static:0d43efb6fc3546bbba80c8ac24ab3031"), this.bc);

            if (this.bc.records) {
                this.recordsState = {
                    isUserReload: isUserReload ? isUserReload : false,
                    records: [...this.bc.records],
                    status,
                };
            }

            if (this.bc.querymode === "local") {
                this.localFilter();
            }

            this.setLocalDefaultValue();

            return this.selectedRecord;
        }

        if (
            this.bc[VAR_RECORD_MASTER_ID] &&
            !this.bc.autoload &&
            this.bc.reqsel &&
            this.bc.getmastervalue &&
            this.bc.getmastervalue?.length > 0
        ) {
            const masterValues = getMasterObject(this.bc[VAR_RECORD_MASTER_ID], this.pageStore, this.bc.getmastervalue);

            if (
                masterValues &&
                (Object.keys(masterValues).length === 0 ||
                    Object.values(masterValues).filter((val) => !isEmpty(val)).length === 0)
            ) {
                this.clearRecordsAction();

                return this.selectedRecord;
            }
        }

        this.abort?.();

        return loadRecordsAction.call(this, {
            applicationStore: this.applicationStore,
            bc: this.bc,
            isUserReload,
            recordId: this.recordId,
            registerAbortCallback: (fn) => {
                this.abort = () => {
                    try {
                        fn();
                    } catch (e) {
                        logger(e);
                    }
                    this.abort = undefined;
                };
            },
            selectedRecordId,
            status,
        });
    };

    @action
    setSelectionAction = async (ckId?: FieldValue, key = this.recordId): Promise<number> => {
        const oldSelectedRecord = this.selectedRecord;
        const stringCkId = ckId === undefined ? "" : String(ckId);

        this.selectedRecordIndex = this.recordsState.records.findIndex((record) => String(record[key]) === stringCkId);
        this.selectedRecord = this.recordsState.records[this.selectedRecordIndex];

        if (this.parentStore && this.parentStore.afterSelected) {
            await this.parentStore.afterSelected();
        }

        this.setRecordToGlobal();
        setTimeout(() => {
            if (this.selectedRecord !== oldSelectedRecord && !this.noLoadChilds) {
                this.reloadChildStoresAction(oldSelectedRecord);
            }
        });

        return this.selectedRecordIndex;
    };

    @action
    setSelectionsAction = async (records: IRecord[], key = this.recordId, isMode = "default"): Promise<number> => {
        const firstRecord = records[0];
        const stringCkId = firstRecord === undefined || isMode === "delete" ? "" : String(firstRecord[key]);

        this.selectedRecordIndex = this.recordsState.records.findIndex((record) => String(record[key]) === stringCkId);
        this.selectedRecord = this.recordsState.records[this.selectedRecordIndex];

        if (isMode === "default") {
            this.selectedRecords.clear();

            records.forEach((rec) => {
                this.selectedRecords.set(rec[key] as ICkId, rec);
            });
        } else if (isMode === "append") {
            records.forEach((rec) => {
                this.selectedRecords.set(rec[key] as ICkId, rec);
            });
        } else if (isMode === "delete") {
            records.forEach((rec) => {
                this.selectedRecords.delete(rec[key] as ICkId);
            });
        }

        if (this.parentStore && this.parentStore.afterSelected) {
            await this.parentStore.afterSelected();
        }

        this.setRecordToGlobal();
        if (!this.noLoadChilds) {
            this.debounceReloadChildStoresAction();
        }

        return this.selectedRecordIndex;
    };

    debounceReloadChildStoresAction = debounce(() => this.reloadChildStoresAction(), WAIT_MULTI_SELECT);

    @action
    reloadChildStoresAction = async (oldSelectedRecord?: IRecord): Promise<boolean> => {
        if (!this.pageStore) {
            return false;
        }
        const isReload =
            this.bc.selmode === "MULTI" || this.bc.collectionvalues === "array"
                ? this.selectedRecords.size > 0
                : this.selectedRecord && oldSelectedRecord !== this.selectedRecord;

        if (isReload) {
            const promises: Array<Promise<any>> = [];

            this.pageStore.stores.forEach((store: IStoreBaseModel) => {
                if (store.bc && store.bc[VAR_RECORD_MASTER_ID] === this.bc[VAR_RECORD_PAGE_OBJECT_ID]) {
                    const promise = store.reloadStoreAction();

                    if (promise) {
                        promises.push(promise);
                    }
                }
            });

            return Promise.all(promises).then(() => true);
        }
        const isClean =
            this.bc.selmode === "MULTI" || this.bc.collectionvalues === "array"
                ? this.selectedRecords.size === 0
                : this.selectedRecord === undefined;

        if (isClean) {
            this.clearChildsStoresAction();
        }

        return true;
    };

    @action
    clearRecordsAction = (): void => {
        this.recordsAll = [];
        this.recordsState = {
            isUserReload: false,
            records: [],
            status: "clear",
        };
        this.setSelectionsAction([]);
        this.setSelectionAction();
    };

    @action
    clearChildsStoresAction = (): void => {
        this.selectedRecordIndex = -1;
        this.selectedRecord = undefined;
        this.setRecordToGlobal();

        if (this.pageStore) {
            this.pageStore.stores.forEach((store) => {
                if (store.bc && store.bc[VAR_RECORD_MASTER_ID] === this.bc[VAR_RECORD_PAGE_OBJECT_ID]) {
                    store.clearStoreAction();

                    if (store.recordsStore) {
                        store.recordsStore.recordsAll = [];
                        store.recordsStore.recordsState = {
                            isUserReload: false,
                            records: [],
                            status: "clear",
                        };
                    }
                }
            });
        }
    };

    @action
    setPageNumberAction = (pageNumber: number): void => {
        this.pageNumber = pageNumber;
        this.loadRecordsAction();
    };

    @action
    setFirstRecord = (): void => {
        const newRecord = this.recordsState.records[0] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    };

    @action
    setPrevRecord = (): void => {
        const newRecord = this.recordsState.records[this.selectedRecordIndex - 1] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    };

    @action
    setNextRecord = (): void => {
        const newRecord = this.recordsState.records[this.selectedRecordIndex + 1] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    };

    @action
    setLastRecord = (): void => {
        const newRecord = this.recordsState.records[this.recordsState.records.length - 1] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    };

    @action
    setOrderAction = (order: IRecordsOrder[]): Promise<void> => {
        this.order = order;

        return this.loadRecordsAction();
    };

    @action
    searchAction = async (
        values: Record<string, FieldValue>,
        options: IRecordsSearchOptions = {},
    ): Promise<void | IRecord> => {
        const {filter, reset, noLoad, selectedRecordId, status = "search", isUserReload, formData} = options;

        if (
            reset ||
            !isDeepEqual(this.searchValues, values) ||
            (filter !== undefined && !isDeepEqual(this.filter, filter))
        ) {
            this.pageNumber = 0;
        }
        this.searchValues = values;

        if (reset || filter !== undefined) {
            this.filter = filter;
        }

        if (reset || formData !== undefined) {
            this.formData = formData;
        }

        if (reset) {
            this.clearRecordsAction();
        }
        let res = null;

        if (!noLoad) {
            res = await this.loadRecordsAction({isUserReload, selectedRecordId, status});
        }

        return res;
    };

    @action
    setLocalDefaultValue = (): Promise<number> => {
        const {defaultvaluerule, defaultvalue} = this.bc;
        const valueField = this.valueField;
        const records = this.recordsState.records;
        let isDefault: "##alwaysfirst##" | "##first##" | undefined = undefined;
        let recordIdValue = undefined;
        let record = undefined;
        let selectedRecordIndex = 0;
        let findOldSelectedRecordIndex = -1;

        if (this.selectedRecordId !== undefined) {
            findOldSelectedRecordIndex = records.findIndex(
                (val) => `${val[this.recordId]} === ${this.selectedRecordId}`,
            );
        }

        switch (true) {
            case defaultvalue === VALUE_SELF_ALWAYSFIRST:
                isDefault = VALUE_SELF_ALWAYSFIRST;
                selectedRecordIndex = this.isTree ? records.findIndex((val) => isEmpty(val[this.recordParentId])) : 0;

                record = records[selectedRecordIndex];
                recordIdValue = record ? deepFind(record, valueField)[1] : undefined;
                break;
            case this.selectedRecordId !== undefined &&
                (findOldSelectedRecordIndex > -1 ||
                    (findOldSelectedRecordIndex === -1 && isEmpty(defaultvalue) && isEmpty(defaultvaluerule))):
                recordIdValue = this.selectedRecordId;
                break;
            case defaultvalue === VALUE_SELF_FIRST:
                isDefault = VALUE_SELF_FIRST;
                selectedRecordIndex = this.isTree ? records.findIndex((val) => isEmpty(val[this.recordParentId])) : 0;

                record = records[selectedRecordIndex];
                recordIdValue = record ? deepFind(record, valueField)[1] : undefined;
                break;
            case !isEmpty(defaultvalue) && defaultvalue !== VALUE_SELF_FIRST && defaultvalue !== VALUE_SELF_ALWAYSFIRST:
                selectedRecordIndex = records.findIndex((val) => `${deepFind(val, valueField)[1]} === ${defaultvalue}`);
                if (selectedRecordIndex > -1) {
                    record = records[selectedRecordIndex];
                    recordIdValue = record ? deepFind(record, valueField)[1] : undefined;
                }
                break;
            case !isEmpty(defaultvaluerule):
                const value = parseMemoize(defaultvaluerule!).runer({
                    get: (name: string) => {
                        return this.pageStore?.globalValues.get(name);
                    },
                });

                selectedRecordIndex = records.findIndex((val) => `${deepFind(val, valueField)[1]} === ${value}`);
                if (selectedRecordIndex > -1) {
                    record = records[selectedRecordIndex];
                    recordIdValue = record ? deepFind(record, valueField)[1] : undefined;
                }
                break;
            default:
                recordIdValue = undefined;
        }

        this.recordsState = {
            ...this.recordsState,
            defaultValueSet: isDefault && recordIdValue !== undefined ? isDefault : undefined,
            isDefault,
            record: record,
        };

        return this.setSelectionAction(recordIdValue, valueField);
    };

    @action
    localFilter = (): void => {
        let records = [...this.recordsState.records];

        if (!records || records.length <= 0) {
            return;
        }

        if (this.filter) {
            records = records.filter(filterFilesData(this.filter));
        }
        if (this.order) {
            records.sort(sortFilesData(this.order));
        }

        this.recordsState = {
            ...this.recordsState,
            records,
        };
    };

    @action
    setSearchValuesAction = (values: Record<string, FieldValue>): void => {
        this.searchValues = values;
    };

    @action
    setFormDataAction = (formData: FormData): void => {
        this.formData = formData;
    };

    @action
    sortRecordsAction = (): void => {
        const records = [...this.recordsState.records];

        records.sort(sortFilesData(this.order));

        this.recordsState = {
            isUserReload: false,
            records,
            status: "sort",
        };
    };

    @action
    addRecordsAction = (records: IRecord[]): void => {
        this.recordsState = {
            isUserReload: false,
            records: this.recordsState.records.concat(records),
            status: "add",
        };
    };

    @action
    removeRecordsAction = (records: IRecord[], key: string, reload?: boolean): void => {
        const ids: Record<ICkId, boolean> = {};
        const fieldKey = key || this.recordId;
        const selectedRecordId = this.selectedRecord && this.selectedRecord[key];
        const storeRecords = reload ? this.recordsAll : this.recordsState.records;

        records.forEach((record) => {
            const recordId = record[fieldKey] as ICkId;

            ids[recordId] = true;

            if (recordId === selectedRecordId) {
                this.setSelectionAction();
            }
        });

        this.recordsState = {
            isUserReload: false,
            records: storeRecords.filter((record) => {
                const recordId = record[fieldKey] as ICkId;

                return !ids[recordId];
            }),
            status: "remove",
        };
    };

    setRecordToGlobal = (): void => {
        if (this.bc.setrecordtoglobal && this.pageStore) {
            this.pageStore.updateGlobalValues({
                [this.bc.setrecordtoglobal]: this.selectedRecord || null,
            });
        }
    };

    @action
    setLoadingAction = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    @action
    saveAction = async (
        values: IRecord | IRecord[],
        mode: IBuilderMode,
        options: ISaveActionOptions,
    ): Promise<boolean> => {
        const {
            files,
            query,
            actionBc: {updatequery},
        } = options;

        if (files && files.length) {
            // TODO: брать из syssettings
            const limit = pLimit(3);
            const promises = files.map((file: File) => {
                const formData = new FormData();

                formData.append("upload_file", file);

                return limit(() =>
                    saveAction.call(this, values, mode, {
                        bc: this.bc,
                        filesNames: [file.name],
                        formData,
                        pageStore: this.pageStore,
                        query: query || updatequery,
                        recordId: this.recordId,
                        ...options,
                    }),
                );
            });

            const statuses = await Promise.all(promises);

            return statuses.every(Boolean);
        }

        return saveAction.call(this, values, mode, {
            bc: this.bc,
            pageStore: this.pageStore,
            query: query || updatequery,
            recordId: this.recordId,
            ...options,
        });
    };

    downloadAction = (
        values: IRecord | IRecord[],
        mode: IBuilderMode,
        options: ISaveActionOptions,
    ): Promise<boolean> => {
        return download.call(this, values, mode, {
            actionBc: options.actionBc,
            bc: this.bc,
            files: options.files,
            form: options.form,
            formData: options.formData,
            pageStore: this.pageStore,
            query: options.query || options.actionBc.updatequery,
            recordId: this.recordId,
        });
    };

    removeSelectedRecordAction = (options: ISaveActionOptions): Promise<boolean> => {
        if (this.selectedRecord) {
            return this.saveAction(this.selectedRecord, "3", {...options, query: options.actionBc.updatequery});
        }

        return Promise.resolve(false);
    };

    @action
    setRecordsAction = (records: IRecord[]): boolean => {
        this.recordsState = {
            isUserReload: false,
            records,
            status: "set",
        };

        if (this.bc.querymode === "local") {
            this.localFilter();
        }

        if (this.bc.defaultvalue || this.bc.defaultvaluerule) {
            this.setLocalDefaultValue();
        }

        return true;
    };
}
