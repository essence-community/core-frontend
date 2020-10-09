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
import {i18next, debounce} from "../../utils";
import {
    loggerRoot,
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_JN_TOTAL_CNT,
    VAR_RECORD_PARENT_ID,
    VALUE_SELF_ROOT,
} from "../../constants";
import {download} from "../../actions/download";
import {loadRecordsAction} from "./loadRecordsAction";

interface ILoadRecordsProps {
    selectedRecordId?: ICkId;
    status?: RecordsStateStatusType;
    isUserReload?: boolean;
}

const logger = loggerRoot.extend("RecordsModel");
const WAIT_MULTI_SELECT = 300;

export class RecordsModel implements IRecordsModel {
    selectedRecordId?: FieldValue;

    selectedRecord: IRecord | undefined;

    selectedRecordValues: IRecord;

    recordsState: IRecordsState<IRecord>;

    recordsAll: IRecord[];

    records: IRecord[];

    hasSelected: boolean;

    selectedRecordIndex: -1 | number;

    pageNumber: number;

    recordsCount: number;

    order: IRecordsOrder;

    jsonMaster: Record<string, FieldValue> | Record<string, FieldValue>[];

    pageSize: number | undefined;

    bc: IBuilderConfig;

    searchValues: Record<string, FieldValue>;

    pageStore: IPageModel | null;

    applicationStore?: IApplicationModel | null;

    isLoading: boolean;

    filter?: Record<string, FieldValue>[];

    valueField: string;

    parentStore: IStoreBaseModel | undefined;

    noLoadChilds = false;

    loadCounter: number;

    route: IRouteRecord;

    recordId: string;

    expansionRecords: ObservableMap<string, boolean>;

    selectedRecords: ObservableMap<string, IRecord>;

    recordsTree: Record<string, IRecord[]>;

    constructor(bc: IBuilderConfig, options?: IOptions) {
        this.bc = bc;
        this.pageSize = bc.pagesize;
        this.recordId = bc.idproperty || VAR_RECORD_ID;
        this.valueField = this.recordId;

        if (options) {
            this.valueField = options.valueField || this.recordId;
            this.parentStore = options.parentStore;
            this.noLoadChilds = options.noLoadChilds || false;
            this.pageStore = options.pageStore;
            this.applicationStore = options.applicationStore;
        }
        const {records = []} = bc;

        extendObservable(this, {
            expansionRecords: observable.map({
                [VALUE_SELF_ROOT]: this.bc.type === "TREEGRID",
            }),
            selectedRecords: observable.map({}),
        });

        extendObservable(
            this,
            {
                filter: [],
                get hasSelected() {
                    return typeof this.selectedRecordId !== undefined;
                },
                isLoading: false,
                loadCounter: 0,
                order: {
                    direction: bc.orderdirection || "ASC",
                    property: bc.orderproperty,
                },
                pageNumber: 0,
                get records() {
                    return (this as IRecordsModel).recordsState.records;
                },
                recordsAll: records,
                get recordsCount() {
                    return (this.records[0] || {})[VAR_RECORD_JN_TOTAL_CNT] || 0;
                },
                recordsState: {
                    isUserReload: false,
                    records,
                    status: "init",
                },
                get recordsTree() {
                    return this.records.reduce((acc: Record<string, IRecord[]>, record: IRecord) => {
                        const parentId = record[VAR_RECORD_PARENT_ID] as ICkId;

                        if (acc[parentId] === undefined) {
                            acc[parentId] = [];
                        }

                        acc[parentId].push(record);

                        return acc;
                    }, {});
                },
                searchValues: {},
                selectedRecord: undefined,
                get selectedRecordId() {
                    return this.selectedRecord ? this.selectedRecord[this.valueField] : undefined;
                },
                selectedRecordIndex: -1,
                get selectedRecordValues() {
                    return this.selectedRecord || {};
                },
            },
            undefined,
            {deep: false},
        );
    }

    loadRecordsAction = action(
        "loadRecordsAction",
        ({selectedRecordId, status = "load", isUserReload}: ILoadRecordsProps = {}) => {
            if (!this.bc[VAR_RECORD_QUERY_ID]) {
                logger(i18next.t("static:0d43efb6fc3546bbba80c8ac24ab3031"), this.bc);

                return Promise.resolve();
            }

            this.loadCounter += 1;

            return loadRecordsAction.call(this, {
                applicationStore: this.applicationStore,
                bc: this.bc,
                isUserReload,
                recordId: this.recordId,
                selectedRecordId,
                status,
            });
        },
    );

    setSelectionAction = action(
        "setSelectionAction",
        async (ckId?: FieldValue, key = this.recordId): Promise<number> => {
            const oldSelectedRecord = this.selectedRecord;
            const stringCkId = ckId === undefined ? "" : String(ckId);

            this.selectedRecordIndex = this.recordsState.records.findIndex(
                (record) => String(record[key]) === stringCkId,
            );
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
        },
    );

    @action
    setSelectionsAction = async (records: IRecord[], key = this.recordId, isMode = "default"): Promise<number> => {
        const firstRecord = records[0];
        const stringCkId = firstRecord === undefined || isMode === "delete" ? "" : String(firstRecord[key]);

        this.selectedRecordIndex = this.recordsState.records.findIndex((record) => String(record[key]) === stringCkId);
        this.selectedRecord = this.recordsState.records[this.selectedRecordIndex];

        if (isMode === "default") {
            this.selectedRecords.clear();

            records.forEach((rec) => {
                this.selectedRecords.set(String(rec[key]), rec);
            });
        } else if (isMode === "append") {
            records.forEach((rec) => {
                this.selectedRecords.set(String(rec[key]), rec);
            });
        } else if (isMode === "delete") {
            records.forEach((rec) => {
                this.selectedRecords.delete(String(rec[key]));
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

    reloadChildStoresAction = action("reloadChildsStoresAction", async (oldSelectedRecord?: IRecord) => {
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
    });

    clearRecordsAction = action("clearRecordsAction", () => {
        this.recordsAll = [];
        this.recordsState = {
            isUserReload: false,
            records: [],
            status: "clear",
        };
        this.setSelectionAction();
    });

    clearChildsStoresAction = action("clearChildsStoresAction", () => {
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
    });

    setPageNumberAction = action("setPageNumberAction", (pageNumber: number) => {
        this.pageNumber = pageNumber;
        this.loadRecordsAction();
    });

    setFirstRecord = action("setFirstRecord", () => {
        const newRecord = this.recordsState.records[0] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    });

    setPrevRecord = action("setPrevRecord", () => {
        const newRecord = this.recordsState.records[this.selectedRecordIndex - 1] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    });

    setNextRecord = action("setNextRecord", () => {
        const newRecord = this.recordsState.records[this.selectedRecordIndex + 1] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    });

    setLastRecord = action("setLastRecord", () => {
        const newRecord = this.recordsState.records[this.recordsState.records.length - 1] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    });

    setOrderAction = action("setOrderAction", (property: string) => {
        let direction = "DESC";

        if (this.order.property === property && this.order.direction === "DESC") {
            direction = "ASC";
        }

        this.order = {direction, property};

        this.loadRecordsAction();
    });

    searchAction = action(
        "searchAction",
        (values: Record<string, FieldValue>, options: IRecordsSearchOptions = {}): Promise<void | IRecord> => {
            const {filter, reset, noLoad, selectedRecordId, status = "search", isUserReload} = options;

            /*
             * TODO: реализовать сравнение
             * if (!isEqual(this.searchValues, values) || !isEqual(this.filter, filter)) {
             *     this.pageNumber = 0;
             * }
             */
            this.searchValues = values;

            if (reset || filter !== undefined) {
                this.filter = filter;
            }

            if (reset) {
                this.clearRecordsAction();
            }

            return noLoad ? Promise.resolve(null) : this.loadRecordsAction({isUserReload, selectedRecordId, status});
        },
    );

    setSearchValuesAction = action("setSearchValuesAction", (values: Record<string, FieldValue>) => {
        this.searchValues = values;
    });

    sortRecordsAction = action("sortRecordsAction", () => {
        const {direction} = this.order;
        const {property = ""} = this.order;
        const records = [...this.recordsState.records];

        records.sort((rec1, rec2) => {
            if (direction === "DESC") {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return Number(rec1[property] < rec2[property]) || -Number(rec1[property] > rec2[property]);
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return Number(rec1[property] > rec2[property]) || -Number(rec1[property] < rec2[property]);
        });

        this.recordsState = {
            isUserReload: false,
            records,
            status: "sort",
        };
    });

    addRecordsAction = action("addRecordsAction", (records: IRecord[]) => {
        this.recordsState = {
            isUserReload: false,
            records: this.recordsState.records.concat(records),
            status: "add",
        };
    });

    removeRecordsAction = action("removeRecordsAction", (records: IRecord[], key: string, reload?: boolean) => {
        const ids: Record<ICkId, boolean> = {};
        const selectedRecordId = this.selectedRecord && this.selectedRecord[key];
        const storeRecords = reload ? this.recordsAll : this.recordsState.records;

        records.forEach((record) => {
            const recordId = record[key] as ICkId;

            ids[recordId] = true;

            if (recordId === selectedRecordId) {
                this.setSelectionAction();
            }
        });

        this.recordsState = {
            isUserReload: false,
            records: storeRecords.filter((record) => {
                const recordId = record[key] as ICkId;

                return !ids[recordId];
            }),
            status: "remove",
        };
    });

    setRecordToGlobal = () => {
        if (this.bc.setrecordtoglobal && this.pageStore) {
            this.pageStore.updateGlobalValues({
                [this.bc.setrecordtoglobal]: this.selectedRecord || null,
            });
        }
    };

    setLoadingAction = action("setLoadingAction", (isLoading: boolean) => {
        this.isLoading = isLoading;
    });

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
        return download(values, mode, {
            actionBc: options.actionBc,
            bc: this.bc,
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
    setRecordsAction = (records: IRecord[]) => {
        this.recordsState = {
            isUserReload: false,
            records,
            status: "set",
        };

        return true;
    };
}
