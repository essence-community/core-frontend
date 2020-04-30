/* eslint-disable max-lines */
// @flow
import {extendObservable, action, observable} from "mobx";
import findIndex from "lodash/findIndex";
import isUndefined from "lodash/isUndefined";
import toString from "lodash/toString";
import isEqual from "lodash/isEqual";
import get from "lodash/get";
import noop from "lodash/noop";
import omit from "lodash/omit";
import pLimit from "p-limit";
import {i18next} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_JN_TOTAL_CNT,
    VAR_RECORD_PARENT_ID,
    VALUE_SELF_ROOT,
} from "@essence-community/constructor-share/constants";
import {loggerRoot} from "../../constants";
import {isEmpty} from "../../utils/base";
import {type BuilderModeType} from "../../BuilderType";
import {saveAction} from "../actions/saveAction";
import {downloadAction} from "../actions/downloadAction";
import {type PageModelType} from "../PageModel";
import {
    type OrderType,
    type SelectedRecordIdType,
    type RecordsModelInterface,
    type OptionsType,
    type RecordsStateType,
    type SaveActionOptionsType,
} from "./RecordsModelType";
import {loadRecordsAction} from "./loadRecordsAction";

const logger = loggerRoot.extend("recordsActions");

export class RecordsModel implements RecordsModelInterface<Object> {
    name = "records";

    selectedRecordId: ?SelectedRecordIdType;

    selectedRecord: ?Object;

    selectedRecordValues: Object;

    records: Array<any>;

    recordsState: RecordsStateType<any>;

    recordsAll: Array<any>;

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

    valueField: string;

    parentStore: ?Object;

    noLoadChilds: boolean = false;

    loadCounter: number;

    recordId: string;

    // eslint-disable-next-line max-lines-per-function, max-statements
    constructor(bc: Object, pageStore: PageModelType, options: OptionsType = {}) {
        this.bc = bc;
        this.recordId = bc.idproperty || VAR_RECORD_ID;
        this.pageStore = pageStore;
        this.pageSize = bc.pagesize ? parseInt(bc.pagesize, 10) : undefined;
        this.valueField = options.valueField || this.recordId;
        this.parentStore = options.parentStore;
        this.noLoadChilds = options.noLoadChilds || false;
        this.applicationStore = pageStore.applicationStore;
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
                    return !isUndefined(this.selectedRecordId);
                },
                isLoading: false,
                loadCounter: 0,
                order: {
                    direction: bc.orderdirection || "ASC",
                    property: bc.orderproperty,
                },
                pageNumber: 0,
                get records() {
                    return this.recordsState.records;
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
                    return this.records.reduce((acc, record) => {
                        const parentId = record[VAR_RECORD_PARENT_ID];

                        if (acc[parentId] === undefined) {
                            acc[parentId] = [];
                        }

                        acc[parentId].push(record);

                        return acc;
                    }, {});
                },
                searchValues: {},
                selectedRecord: undefined,
                selectedRecordId: undefined,
                selectedRecordIndex: -1,
                selectedRecordValues: {},
            },
            undefined,
            {deep: false},
        );
    }

    loadRecordsAction = action("loadRecordsAction", ({selectedRecordId, status = "load"} = {}) => {
        if (isEmpty(this.bc[VAR_RECORD_QUERY_ID])) {
            logger(i18next.t("static:0d43efb6fc3546bbba80c8ac24ab3031"), this.bc);

            return Promise.resolve();
        }

        this.loadCounter += 1;

        return loadRecordsAction.call(this, {
            applicationStore: this.pageStore.applicationStore,
            bc: this.bc,
            recordId: this.recordId,
            selectedRecordId,
            status,
        });
    });

    setSelectionAction = action(
        "setSelectionAction",
        async (ckId: ?SelectedRecordIdType, key: string = this.recordId): Promise<number> => {
            const oldSelectedRecord = this.selectedRecord;
            const stringCkId = isUndefined(ckId) ? "" : toString(ckId);

            this.selectedRecordIndex = findIndex(this.records, (record) => toString(record[key]) === stringCkId);
            this.selectedRecord = this.records[this.selectedRecordIndex];

            this.selectedRecordValues = this.selectedRecord || {};
            this.selectedRecordId = this.selectedRecord ? this.selectedRecord[this.valueField] : undefined;

            await get(this.parentStore, "afterSelected", noop)();

            setTimeout(() => {
                if (this.selectedRecord !== oldSelectedRecord && !this.noLoadChilds) {
                    this.reloadChildStoresAction(oldSelectedRecord);
                }
            });

            this.setRecordToGlobal();

            return this.selectedRecordIndex;
        },
    );

    reloadChildStoresAction = action("reloadChildsStoresAction", (oldSelectedRecord) => {
        if (!this.pageStore) {
            return false;
        }

        if (this.selectedRecord && oldSelectedRecord !== this.selectedRecord) {
            const promises = [];

            this.pageStore.stores.forEach((store) => {
                if (store.bc && store.bc[VAR_RECORD_MASTER_ID] === this.bc[VAR_RECORD_PAGE_OBJECT_ID]) {
                    const promise = store.reloadStoreAction();

                    if (promise) {
                        promises.push(promise);
                    }
                }
            });

            return Promise.all(promises).then(() => true);
        }

        if (isEmpty(this.selectedRecord)) {
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
        this.selectedRecordValues = {};
        this.selectedRecordId = undefined;
        this.setRecordToGlobal();

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
    });

    saveAction = action(
        "saveAction",
        async (
            values: Object | Array<Object>,
            mode: BuilderModeType,
            {files, ...options}: SaveActionOptionsType,
        ): ?Object => {
            if (files) {
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
                recordId: this.recordId,
                ...options,
            });
        },
    );

    downloadAction = action(
        "downloadAction",
        (values: Object | Array<Object>, mode: BuilderModeType, options: SaveActionOptionsType): ?Object =>
            downloadAction.call(this, values, mode, {
                bc: this.bc,
                pageStore: this.pageStore,
                recordId: this.recordId,
                ...omit(options, ["formData"]),
            }),
    );

    removeSelectedRecordAction = action("removeSelectedRecordAction", async (options: SaveActionOptionsType) => {
        let result = false;

        if (this.selectedRecord) {
            result = await this.saveAction(this.selectedRecord, "3", {...options, query: options.actionBc.updatequery});
        }

        return result;
    });

    setPageNumberAction = action("setPageNumberAction", (pageNumber: number) => {
        this.pageNumber = pageNumber;
        this.loadRecordsAction();
    });

    setFirstRecord = action("setFirstRecord", () => {
        const newRecord = this.records[0] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    });

    setPrevRecord = action("setPrevRecord", () => {
        const newRecord = this.records[this.selectedRecordIndex - 1] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    });

    setNextRecord = action("setNextRecord", () => {
        const newRecord = this.records[this.selectedRecordIndex + 1] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    });

    setLastRecord = action("setLastRecord", () => {
        const newRecord = this.records[this.records.length - 1] || {};

        this.setSelectionAction(newRecord[this.recordId]);
    });

    setOrderAction = action("setOrderAction", (property) => {
        let direction = "DESC";

        if (this.order.property === property && this.order.direction === "DESC") {
            direction = "ASC";
        }

        this.order = {direction, property};

        this.loadRecordsAction();
    });

    searchAction = action("searchAction", (values: Object, options = {}): Promise<null | Object> => {
        const {filter, reset, noLoad, resetFilter, selectedRecordId} = options;

        if (!isEqual(this.searchValues, values) || !isEqual(this.filter, filter)) {
            this.pageNumber = 0;
        }
        this.searchValues = values;

        if (reset || resetFilter || !isUndefined(filter)) {
            this.filter = filter;
        }

        if (reset) {
            this.clearRecordsAction();
        }

        return noLoad ? Promise.resolve(null) : this.loadRecordsAction({selectedRecordId});
    });

    setSearchValuesAction = action("setSearchValuesAction", (values: Object) => {
        this.searchValues = values;
    });

    setRecordToGlobal = () => {
        if (this.bc.setrecordtoglobal) {
            this.pageStore.updateGlobalValues({
                [this.bc.setrecordtoglobal]: this.selectedRecord || null,
            });
        }
    };

    sortRecordsAction = action("sortRecordsAction", () => {
        const {direction} = this.order;
        const {property} = this.order;
        const records = [...this.records];

        records.sort((rec1, rec2) =>
            direction === "DESC"
                ? Number(rec1[property] < rec2[property]) || -Number(rec1[property] > rec2[property])
                : Number(rec1[property] > rec2[property]) || -Number(rec1[property] < rec2[property]),
        );

        this.recordsState = {
            isUserReload: false,
            records,
            status: "sort",
        };
    });

    addRecordsAction = action("addRecordsAction", (records) => {
        this.recordsState = {
            isUserReload: false,
            records: this.recordsState.records.concat(records),
            status: "add",
        };
    });

    removeRecordsAction = action("removeRecordsAction", (records: Array<*>, key: string, reload?: boolean) => {
        const ids = {};
        const selectedRecordId = this.selectedRecord && this.selectedRecord[key];
        const storeRecords = reload ? this.recordsAll : this.records;

        records.forEach((record) => {
            const recordId = record[key];

            ids[recordId] = true;

            if (recordId === selectedRecordId) {
                this.setSelectionAction();
            }
        });

        this.recordsState = {
            isUserReload: false,
            records: storeRecords.filter((record) => !ids[record[key]]),
            status: "remove",
        };
    });

    setRecordsAction = action("setRecordsAction", (records: Array<*>) => {
        this.recordsState = {
            isUserReload: false,
            records,
            status: "set",
        };
    });

    setLoadingAction = action("setLoadingAction", (isLoading: boolean) => {
        this.isLoading = isLoading;
    });
}
