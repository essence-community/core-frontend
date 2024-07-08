/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-lines */
import {v4} from "uuid";
import {isEqual} from "lodash";
import {toJS} from "mobx";
import {request} from "../../request";
import {IRecordsModel, FieldValue, IResponse, IRecord} from "../../types";
import {i18next, getMasterObject, deepFind, setMask, toString} from "../../utils";
import {
    VALUE_SELF_FIRST,
    VALUE_SELF_ALWAYSFIRST,
    loggerRoot,
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    META_PAGE_OBJECT,
    VAR_META_JN_FETCH,
    VAR_META_JN_OFFSET,
    VAR_META_JL_FILTER,
    VAR_META_JL_SORT,
    VAR_RECORD_JN_TOTAL_CNT,
    VAR_RECORD_ROUTE_PAGE_ID,
    META_PAGE_ID,
} from "../../constants";
import {snackbarStore} from "../SnackbarModel";
import {isEmpty} from "../../utils/base";
import {parseMemoize} from "../../utils/parser";
import {
    IGetFilterData,
    IGetFilterDataOptions,
    IAttachGlobalStore,
    ILoadRecordsAction,
    IJson,
} from "./RecordsModel.types";
import {CheckLoading, CYCLE_TIMEOUT} from "./checkLoading";

const logger = loggerRoot.extend("loadRecordsAction");

// 2 frames (16ms)
const WAIT_TIME = 32;

export const sleep = (time: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

export function getPageFilter(pageSize?: number, pageNumber = 0) {
    return pageSize
        ? {
              [VAR_META_JN_FETCH]: pageSize,
              [VAR_META_JN_OFFSET]: pageSize * pageNumber,
          }
        : {
              [VAR_META_JN_FETCH]: 1000,
              [VAR_META_JN_OFFSET]: 0,
          };
}

function getNotEmptyData(searchValues: Record<string, FieldValue>) {
    const values: Record<string, FieldValue> = {};

    Object.keys(searchValues).forEach((key) => {
        if (searchValues[key] !== "") {
            values[key] = searchValues[key];
        }
    });

    return values;
}

export function getFilterData({
    filter,
    order,
    searchValues,
    pageSize,
    pageNumber,
}: IGetFilterDataOptions): IGetFilterData {
    return {
        [VAR_META_JL_FILTER]: filter,
        [VAR_META_JL_SORT]: order,
        ...getNotEmptyData(searchValues),
        ...getPageFilter(pageSize, pageNumber),
    };
}

export function attachGlobalStore({bc, json, getValue, globalValues}: IAttachGlobalStore): void {
    if (bc.getglobaltostore && globalValues) {
        bc.getglobaltostore.forEach(({in: keyIn, out}) => {
            const name = out || keyIn;

            if (typeof json.filter[name] === "undefined") {
                if (out) {
                    json.filter[name] = parseMemoize(keyIn).runer({get: getValue});
                } else {
                    json.filter[name] = toJS(globalValues.get(keyIn));
                }
            }
        });
    }
}

export function checkPageNumber(
    recordsStore: IRecordsModel,
    master: Record<string, FieldValue> | Record<string, FieldValue>[] = {},
) {
    if (!isEqual(master, recordsStore.jsonMaster)) {
        recordsStore.jsonMaster = master;
        recordsStore.pageNumber = 0;
    }
}

export const getAttachedRecords = (
    records: Record<string, FieldValue>[],
    newRecord?: Record<string, FieldValue>,
    recordId: string = VAR_RECORD_ID,
) => {
    if (newRecord) {
        const firstRecord = records[0] || {};
        const recordIndex = records.findIndex((rec) => rec[recordId] === newRecord[recordId]);
        const record = {...newRecord, [VAR_RECORD_JN_TOTAL_CNT]: firstRecord[VAR_RECORD_JN_TOTAL_CNT]};

        if (recordIndex === -1) {
            return [record, ...records];
        }

        return [...records.slice(0, recordIndex), record, ...records.slice(recordIndex + 1)];
    }

    return records;
};

export function prepareRequst(
    recordsStore: IRecordsModel,
    {bc, recordId, status, selectedRecordId}: ILoadRecordsAction,
) {
    const {getmastervalue, noglobalmask} = bc;
    const globalValues = recordsStore.pageStore ? recordsStore.pageStore.globalValues : undefined;
    const master = getMasterObject(bc[VAR_RECORD_MASTER_ID], recordsStore.pageStore, getmastervalue);
    const filterData: IGetFilterDataOptions =
        status === "attach"
            ? {
                  filter: [],
                  order: recordsStore.order,
                  pageNumber: 0,
                  pageSize: 1,
                  searchValues: {[recordId]: selectedRecordId},
              }
            : {
                  filter: recordsStore.filter,
                  order: recordsStore.order,
                  pageNumber: recordsStore.pageNumber,
                  pageSize: recordsStore.pageSize,
                  searchValues: recordsStore.searchValues,
              };

    checkPageNumber(recordsStore, master);

    const json: IJson = {
        filter: getFilterData(filterData),
        master,
    };

    attachGlobalStore({bc, getValue: recordsStore.getValue, globalValues, json});

    setMask(true, noglobalmask, recordsStore.pageStore);

    return {json};
}

export function loadRecordsAction(
    this: IRecordsModel,
    {
        applicationStore,
        bc,
        selectedRecordId,
        status,
        recordId = VAR_RECORD_ID,
        isUserReload = false,
        registerAbortCallback,
    }: ILoadRecordsAction,
): Promise<IRecord | undefined> {
    const {noglobalmask, defaultvalue, defaultvaluerule} = bc;
    const isWaiting = bc[VAR_RECORD_MASTER_ID] || bc.getglobaltostore;
    const {formData} = this;

    this.setLoadingAction(true);

    // Should be logic for wainting unfinished master request
    return Promise.resolve()
        .then(() => {
            if (!isWaiting) {
                return true;
            }

            return sleep(WAIT_TIME)
                .then(() => new CheckLoading({bc, masterId: bc[VAR_RECORD_MASTER_ID], pageStore: this.pageStore}))
                .then((checkLoading) => checkLoading.wait());
        })
        .catch(() => {
            logger(
                i18next.t("static:344bbb5fb4a84d89b93c448a5c29e1d7", {
                    query: bc[VAR_RECORD_QUERY_ID],
                    timeout: CYCLE_TIMEOUT,
                }),
            );
        })
        .then(() => {
            const {json} = prepareRequst(this, {applicationStore, bc, recordId, selectedRecordId, status});

            return request<IResponse[]>({
                [META_PAGE_ID]: this.pageStore?.pageId || bc[VAR_RECORD_ROUTE_PAGE_ID],
                [META_PAGE_OBJECT]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                action: this.bc.actiongate,
                formData,
                json,
                list: true,
                plugin: bc.extraplugingate,
                query: bc[VAR_RECORD_QUERY_ID] || "",
                registerAbortCallback,
                session: applicationStore ? applicationStore.authStore.userInfo.session : "",
                timeout: bc.timeout,
            });
        })
        .then((response: IResponse[]) => {
            if (
                snackbarStore.checkValidResponseAction(response[0], {
                    applicationStore,
                    route: this.pageStore?.route,
                })
            ) {
                const records = (response || []).map((record: Record<string, FieldValue>) => {
                    if (record[recordId] === undefined || record[recordId] === null) {
                        record[recordId] = `auto-${v4()}`;
                    }

                    return record;
                });

                if (bc.pagesize !== undefined && records[0] && !records[0][VAR_RECORD_JN_TOTAL_CNT]) {
                    snackbarStore.snackbarOpenAction(
                        {
                            status: "error",
                            text: i18next.t("static:44e3485c6b0c47dc8a0792c90af62962"),
                        },
                        this.pageStore ? this.pageStore.route : undefined,
                    );
                }

                return records;
            }

            return [];
        })
        .catch((response: IResponse): Record<string, FieldValue>[] => {
            snackbarStore.checkExceptResponse(
                response,
                this.pageStore ? this.pageStore.route : undefined,
                applicationStore,
            );

            return [];
        })
        .then((records: Record<string, FieldValue>[]) => {
            const valueField = status === "attach" ? recordId : this.valueField;
            const beforeSelectedRecord = this.selectedRecord;
            const defaultValue = isEmpty(defaultvaluerule)
                ? defaultvalue
                : parseMemoize(defaultvaluerule).runer({
                      get: this.getValue,
                  });
            let isDefault: "##alwaysfirst##" | "##first##" | undefined = undefined;
            let recordIdValue = undefined;
            let record = undefined;
            let selectedRecordIndex = 0;
            let findNewSelectedRecordIndex = -1;
            let findOldSelectedRecordIndex = -1;
            const recordIdValueGetGlobal = isEmpty(this.bc.getglobal)
                ? undefined
                : parseMemoize(this.bc.getglobal).runer({get: this.getValue});
            const foundGetGlobalRec = isEmpty(recordIdValueGetGlobal)
                ? undefined
                : records.find((rec) => toString(recordIdValueGetGlobal) === toString(deepFind(rec, valueField)[1]));

            if (selectedRecordId !== undefined) {
                findNewSelectedRecordIndex = records.findIndex(
                    (val) => toString(val[this.recordId]) === toString(selectedRecordId),
                );
            }
            if (this.selectedRecordId !== undefined) {
                findOldSelectedRecordIndex = records.findIndex(
                    (val) => toString(val[this.recordId]) === toString(this.selectedRecordId),
                );
            }

            switch (true) {
                case defaultValue === VALUE_SELF_ALWAYSFIRST:
                    isDefault = VALUE_SELF_ALWAYSFIRST;
                    selectedRecordIndex = this.isTree
                        ? records.findIndex((val) => isEmpty(val[this.recordParentId]))
                        : 0;

                    record = records[selectedRecordIndex];
                    recordIdValue = record ? deepFind(record, valueField)[1] : undefined;
                    break;
                case selectedRecordId !== undefined && findNewSelectedRecordIndex > -1:
                    recordIdValue = selectedRecordId;
                    record = records[findNewSelectedRecordIndex];
                    break;
                case this.selectedRecordId !== undefined &&
                    (findOldSelectedRecordIndex > -1 ||
                        (findOldSelectedRecordIndex === -1 && isEmpty(foundGetGlobalRec) && isEmpty(defaultValue))):
                    recordIdValue = this.selectedRecordId;
                    record = records[findOldSelectedRecordIndex];
                    break;
                case !isEmpty(foundGetGlobalRec):
                    recordIdValue = deepFind(foundGetGlobalRec, valueField)[1];
                    record = foundGetGlobalRec;
                    break;
                case defaultValue === VALUE_SELF_FIRST:
                    isDefault = VALUE_SELF_FIRST;
                    selectedRecordIndex = this.isTree
                        ? records.findIndex((val) => isEmpty(val[this.recordParentId]))
                        : 0;

                    record = records[selectedRecordIndex];
                    recordIdValue = record ? deepFind(record, valueField)[1] : undefined;
                    break;
                case !isEmpty(defaultValue) &&
                    defaultValue !== VALUE_SELF_FIRST &&
                    defaultValue !== VALUE_SELF_ALWAYSFIRST:
                    selectedRecordIndex = records.findIndex(
                        (val) => toString(deepFind(val, valueField)[1]) === toString(defaultValue),
                    );
                    if (selectedRecordIndex > -1) {
                        record = records[selectedRecordIndex];
                        recordIdValue = record ? deepFind(record, valueField)[1] : undefined;
                    }
                    break;
                default:
                    recordIdValue = undefined;
            }

            this.recordsState = {
                defaultValueSet: isDefault && recordIdValue !== undefined ? isDefault : undefined,
                isDefault,
                isUserReload,
                record,
                records:
                    status === "attach" ? getAttachedRecords(this.recordsState.records, records[0], recordId) : records,
                status,
            };
            this.recordsAll = this.recordsState.records;

            if (this.bc.querymode === "local") {
                this.localFilter();
            }
            /*
             * We can call setSelectionAction in listen for recordsState.
             * check this handle by verify selectedRecord
             * We use this for combo field
             */
            if (beforeSelectedRecord !== this.selectedRecord) {
                return this.selectedRecordIndex;
            }

            return this.setSelectionAction(recordIdValue, valueField);
        })
        .then(() => {
            return this.selectedRecord;
        })
        .finally(() => {
            setMask(false, noglobalmask, this.pageStore);
            this.setLoadingAction(false);
        });
}
