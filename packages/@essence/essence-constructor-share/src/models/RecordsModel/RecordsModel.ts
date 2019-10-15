/* eslint-disable max-lines */
import {action, extendObservable} from "mobx";
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
import {camelCaseMemoized} from "../../utils";
import {loggerRoot, VAR_RECORD_ID} from "../../constants";
import {loadRecordsAction} from "./loadRecordsAction";

interface ILoadRecordsProps {
    selectedRecordId?: ICkId;
    status?: RecordsStateStatusType;
    isUserReload?: boolean;
}

const logger = loggerRoot.extend("RecordsModel");

export class RecordsModel implements IRecordsModel {
    selectedRecordId?: FieldValue;

    selectedRecord: IRecord | undefined;

    selectedRecrodValues: IRecord;

    recordsState: IRecordsState<IRecord>;

    recordsAll: IRecord[];

    records: IRecord[];

    hasSelected: boolean;

    selectedRecordIndex: -1 | number;

    pageNumber: number;

    recordsCount: number;

    order: IRecordsOrder;

    jsonMaster: Record<string, FieldValue>;

    pageSize: number | undefined;

    bc: IBuilderConfig;

    searchValues: Record<string, FieldValue>;

    pageStore?: IPageModel;

    applicationStore?: IApplicationModel;

    isLoading: boolean;

    filter?: Record<string, FieldValue>[];

    valueField: string = VAR_RECORD_ID;

    parentStore: IStoreBaseModel | undefined;

    noLoadChilds = false;

    loadCounter: number;

    route: IRouteRecord;

    constructor(bc: IBuilderConfig, options?: IOptions) {
        this.bc = bc;
        this.pageSize = bc.pagesize ? parseInt(bc.pagesize, 10) : undefined;

        if (options) {
            this.valueField = options.valueField || VAR_RECORD_ID;
            this.parentStore = options.parentStore;
            this.noLoadChilds = options.noLoadChilds || false;
            this.pageStore = options.pageStore;
            this.applicationStore = options.applicationStore;
        }
        // @ts-ignore
        const {records = []} = bc;

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
                get records(this: IRecordsModel) {
                    return this.recordsState.records;
                },
                recordsAll: records,
                get recordsCount() {
                    return (this.records[0] || {}).jnTotalCnt || 0;
                },
                recordsState: {
                    isUserReload: false,
                    records,
                    status: "init",
                },
                searchValues: {},
                selectedRecord: undefined,
                get selectedRecordId() {
                    return this.selectedRecord ? this.selectedRecord[this.valueField] : undefined;
                },
                selectedRecordIndex: -1,
                get selectedRecrodValues() {
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
            if (!this.bc.ckQuery) {
                logger("Не могу загрузить данны. Не задан ck_query для конфига:", this.bc);

                return Promise.resolve();
            }

            this.loadCounter += 1;

            return loadRecordsAction.call(this, {
                applicationStore: this.applicationStore,
                bc: this.bc,
                isUserReload,
                selectedRecordId,
                status,
            });
        },
    );

    setSelectionAction = action(
        "setSelectionAction",
        async (ckId?: FieldValue, key = VAR_RECORD_ID): Promise<number> => {
            const oldSelectedRecord = this.selectedRecord;
            const stringCkId = ckId === undefined ? "" : String(ckId);

            this.selectedRecordIndex = this.recordsState.records.findIndex(
                (record) => String(record[key]) === stringCkId,
            );
            this.selectedRecord = this.recordsState.records[this.selectedRecordIndex];

            if (this.parentStore && this.parentStore.afterSelected) {
                await this.parentStore.afterSelected();
            }

            setTimeout(() => {
                if (this.selectedRecord !== oldSelectedRecord && !this.noLoadChilds) {
                    this.reloadChildStoresAction(oldSelectedRecord);
                }
            });

            return this.selectedRecordIndex;
        },
    );

    reloadChildStoresAction = action("reloadChildsStoresAction", (oldSelectedRecord) => {
        if (!this.pageStore) {
            return false;
        }

        if (this.selectedRecord && oldSelectedRecord !== this.selectedRecord) {
            const promises: Array<Promise<any>> = [];

            this.pageStore.stores.forEach((store: IStoreBaseModel) => {
                if (store.bc && store.bc.ckMaster === this.bc.ckPageObject) {
                    const promise = store.reloadStoreAction();

                    if (promise) {
                        promises.push(promise);
                    }
                }
            });

            return Promise.all(promises).then(() => true);
        }

        if (this.selectedRecord === undefined) {
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

        if (this.pageStore) {
            this.pageStore.stores.forEach((store) => {
                if (store.bc && store.bc.ckMaster === this.bc.ckPageObject) {
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

        this.setSelectionAction(newRecord.ckId);
    });

    setPrevRecord = action("setPrevRecord", () => {
        const newRecord = this.recordsState.records[this.selectedRecordIndex - 1] || {};

        this.setSelectionAction(newRecord.ckId);
    });

    setNextRecord = action("setNextRecord", () => {
        const newRecord = this.recordsState.records[this.selectedRecordIndex + 1] || {};

        this.setSelectionAction(newRecord.ckId);
    });

    setLastRecord = action("setLastRecord", () => {
        const newRecord = this.recordsState.records[this.recordsState.records.length - 1] || {};

        this.setSelectionAction(newRecord.ckId);
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
        (values: Record<string, FieldValue>, options: IRecordsSearchOptions = {}): Promise<void | object> => {
            const {filter, reset, noLoad, resetFilter, selectedRecordId, status = "search", isUserReload} = options;

            /*
             * TODO: реализовать сравнение
             * if (!isEqual(this.searchValues, values) || !isEqual(this.filter, filter)) {
             *     this.pageNumber = 0;
             * }
             */
            this.searchValues = values;

            if (reset || resetFilter || filter !== undefined) {
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
        const property = camelCaseMemoized(this.order.property || "");
        const records = [...this.recordsState.records];

        records.sort((rec1, rec2) => {
            if (direction === "DESC") {
                // @ts-ignore
                return Number(rec1[property] < rec2[property]) || -Number(rec1[property] > rec2[property]);
            }

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
        const ids: Record<string, boolean> = {};
        const selectedRecordId = this.selectedRecord && this.selectedRecord[key];
        const storeRecords = reload ? this.recordsAll : this.recordsState.records;

        records.forEach((record) => {
            const recordId = record[key];

            if (typeof recordId === "string") {
                ids[recordId] = true;

                if (recordId === selectedRecordId) {
                    this.setSelectionAction();
                }
            }
        });

        this.recordsState = {
            isUserReload: false,
            records: storeRecords.filter((record) => {
                const recordId = record[key];

                return typeof recordId === "string" ? !ids[recordId] : true;
            }),
            status: "remove",
        };
    });

    setLoadingAction = action("setLoadingAction", (isLoading: boolean) => {
        this.isLoading = isLoading;
    });

    saveAction = action(
        "saveAction",
        (values: Record<string, FieldValue>, mode: IBuilderMode, options: ISaveActionOptions): Promise<string> =>
            saveAction.call(this, values, mode, {
                bc: this.bc,
                pageStore: this.pageStore,
                ...options,
            }),
    );

    downloadAction = () => {
        // eslint-disable-next-line no-console
        console.error("not implemented");

        return Promise.resolve("");
    };

    removeSelectedRecordAction = () => {
        // eslint-disable-next-line no-console
        console.error("not implemented");

        return true;
    };

    setRecordsAction = () => {
        // eslint-disable-next-line no-console
        console.error("not implemented");

        return true;
    };
}
