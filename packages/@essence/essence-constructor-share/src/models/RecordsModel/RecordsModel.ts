import {action, extendObservable} from "mobx";
import {saveAction} from "../../actions/saveAction"
import {IBuilderConfig, IBuilderMode, ICkId, IOptions, IPageModel, IRecord, IRecordsModel, IRecordsOrder, IRecordsState, ISaveActionOptions, IStoreBaseModel, RecordsStateStatusType, SelectedRecordIdType} from "../../types";
import {loadRecordsAction} from "./loadRecordsAction";
import {camalize} from "./utils";

interface ILoadRecordsProps {
    selectedRecordId?: ICkId,
    status?: RecordsStateStatusType,
}

export class RecordsModel implements IRecordsModel {
    public name: "records";
    public selectedRecordId?: SelectedRecordIdType;
    public selectedRecord?: IRecord;
    public selectedRecrodValues: IRecord;
    public records: IRecord[];
    public recordsState: IRecordsState<IRecord>;
    public recordsAll: IRecord[];
    public hasSelected: boolean;
    public selectedRecordIndex: -1 | number;
    public pageNumber: number;
    public recordsCount: number;
    public order: IRecordsOrder;
    public pageSize?: number;
    public bc: IBuilderConfig;
    public searchValues: object;
    public pageStore: IPageModel;
    public isLoading: boolean;
    public filter: object[];
    public valueField: string;
    public parentStore?: IStoreBaseModel;
    public noLoadChilds: boolean = false;
    public loadCounter: number;

    public loadRecordsAction = action("loadRecordsAction", ({selectedRecordId, status = "load"}: ILoadRecordsProps = {}) => {
        if (!this.bc.ckQuery) {
            // tslint:disable-next-line:no-console
            console.warn("Не могу загрузить данны. Не задан ck_query для конфига:", this.bc);

            return Promise.resolve();
        }

        this.loadCounter += 1;

        return loadRecordsAction.call(this, {
            applicationStore: this.pageStore.applicationStore,
            bc: this.bc,
            selectedRecordId,
            status,
        });
    });

    public setSelectionAction = action(
        "setSelectionAction",
        async (ckId?: SelectedRecordIdType, key: string = "ckId"): Promise<number> => {
            const oldSelectedRecord = this.selectedRecord;
            const stringCkId = ckId === undefined ? "" : String(ckId);

            this.selectedRecordIndex = this.records.findIndex((record) => String(record[key]) === stringCkId);
            this.selectedRecord = this.records[this.selectedRecordIndex];

            this.selectedRecrodValues = this.selectedRecord || {};
            this.selectedRecordId = this.selectedRecord ? this.selectedRecord[this.valueField] : undefined;

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

    public reloadChildStoresAction = action("reloadChildsStoresAction", (oldSelectedRecord) => {
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

    public clearRecordsAction = action("clearRecordsAction", () => {
        this.recordsAll = [];
        this.recordsState = {
            isUserReload: false,
            records: [],
            status: "clear",
        };
        this.setSelectionAction();
    });

    public clearChildsStoresAction = action("clearChildsStoresAction", () => {
        this.selectedRecordIndex = -1;
        this.selectedRecord = undefined;
        this.selectedRecrodValues = {};
        this.selectedRecordId = undefined;

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
    });

    public setPageNumberAction = action("setPageNumberAction", (pageNumber: number) => {
        this.pageNumber = pageNumber;
        this.loadRecordsAction();
    });

    public setFirstRecord = action("setFirstRecord", () => {
        const newRecord = this.records[0] || {};

        this.setSelectionAction(newRecord.ckId);
    });

    public setPrevRecord = action("setPrevRecord", () => {
        const newRecord = this.records[this.selectedRecordIndex - 1] || {};

        this.setSelectionAction(newRecord.ckId);
    });

    public setNextRecord = action("setNextRecord", () => {
        const newRecord = this.records[this.selectedRecordIndex + 1] || {};

        this.setSelectionAction(newRecord.ckId);
    });

    public setLastRecord = action("setLastRecord", () => {
        const newRecord = this.records[this.records.length - 1] || {};

        this.setSelectionAction(newRecord.ckId);
    });

    public setOrderAction = action("setOrderAction", (property: string) => {
        let direction = "DESC";

        if (this.order.property === property && this.order.direction === "DESC") {
            direction = "ASC";
        }

        this.order = {direction, property};

        this.loadRecordsAction();
    });

    public searchAction = action(
        "searchAction",
        (values: object, options = {}): Promise<null | object> => {
            const {filter, reset, noLoad, resetFilter, selectedRecordId} = options;

            // TODO: реализовать сравнение
            // if (!isEqual(this.searchValues, values) || !isEqual(this.filter, filter)) {
            //     this.pageNumber = 0;
            // }
            this.searchValues = values;

            if (reset || resetFilter || filter !== undefined) {
                this.filter = filter;
            }

            if (reset) {
                this.clearRecordsAction();
            }

            return noLoad ? Promise.resolve(null) : this.loadRecordsAction({selectedRecordId});
        },
    );

    public setSearchValuesAction = action("setSearchValuesAction", (values: object) => {
        this.searchValues = values;
    });

    public sortRecordsAction = action("sortRecordsAction", () => {
        const {direction} = this.order;
        const property = camalize(this.order.property);
        const records = [...this.records];

        records.sort(
            (rec1, rec2) =>
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

    public addRecordsAction = action("addRecordsAction", (records: IRecord[]) => {
        this.recordsState = {
            isUserReload: false,
            records: this.recordsState.records.concat(records),
            status: "add",
        };
    });

    public removeRecordsAction = action("removeRecordsAction", (records: IRecord[], key: string, reload?: boolean) => {
        const ids: {[$key: string]: boolean} = {};
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

    public setLoadingAction = action("setLoadingAction", (isLoading: boolean) => {
        this.isLoading = isLoading;
    });

    public saveAction = action(
        "saveAction",
        (values: any, mode: IBuilderMode, options: ISaveActionOptions): Promise<string> =>
            saveAction.call(this, values, mode, {
                bc: this.bc,
                pageStore: this.pageStore,
                ...options,
            }),
    );

    constructor(bc: IBuilderConfig, pageStore: IPageModel, options?: IOptions) {
        this.bc = bc;
        this.pageStore = pageStore;
        this.pageSize = bc.pagesize ? parseInt(bc.pagesize, 10) : undefined;
        this.valueField = options.valueField || "ckId";
        this.parentStore = options.parentStore;
        this.noLoadChilds = options.noLoadChilds || false;

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
                    return this.recordsState.records;
                },
                recordsAll: [],
                get recordsCount() {
                    return (this.records[0] || {}).jnTotalCnt || 0;
                },
                recordsState: {
                    isUserReload: false,
                    records: [],
                    status: "init",
                },
                searchValues: {},
                selectedRecord: undefined,
                selectedRecordId: undefined,
                selectedRecordIndex: -1,
                selectedRecrodValues: {},
            },
            undefined,
            {deep: false},
        );
    }

    public downloadAction = () => {
        // tslint:disable-next-line:no-console
        console.error("not implemented");

        return Promise.resolve("");
    };

    public removeSelectedRecordAction = () => {
        // tslint:disable-next-line:no-console
        console.error("not implemented");

        return true;
    };

    public setRecordsAction = () => {
        // tslint:disable-next-line:no-console
        console.error("not implemented");

        return true;
    };
}
