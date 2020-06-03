/* eslint-disable max-lines */
import {v4} from "uuid";
import {isEqual} from "lodash";
import {request} from "../../request";
import {IPageModel, IRecordsModel, FieldValue, IResponse} from "../../types";
import {findGetGlobalKey} from "../../utils/findKey";
import {i18next, getMasterObject} from "../../utils";
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
} from "../../constants";
import {snackbarStore} from "../SnackbarModel";
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
        [VAR_META_JL_SORT]: [order],
        ...getNotEmptyData(searchValues),
        ...getPageFilter(pageSize, pageNumber),
    };
}

export function attachGlobalStore({bc, json, globalValues}: IAttachGlobalStore): void {
    if (bc.getglobaltostore && globalValues) {
        const globalKeys: Record<string, string> = findGetGlobalKey(bc.getglobaltostore);

        Object.keys(globalKeys).forEach((fieldName: string) => {
            const globaleKey = globalKeys[fieldName];

            if (typeof json.filter[fieldName] === "undefined") {
                json.filter[fieldName] = globalValues.get(globaleKey);
            }
        });
    }
}

export function setMask(isLoading: boolean, noglobalmask?: boolean, pageStore?: IPageModel | null) {
    if (!noglobalmask && pageStore) {
        pageStore.setLoadingAction(isLoading);
    }
}

export function checkPageNumber(recordsStore: IRecordsModel, master: Record<string, FieldValue> = {}) {
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

    attachGlobalStore({bc, globalValues, json});

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
    }: ILoadRecordsAction,
): Promise<object | undefined> {
    const {noglobalmask, defaultvalue} = bc;
    const isWaiting = bc[VAR_RECORD_MASTER_ID] || bc.getglobaltostore;

    this.isLoading = true;

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
                [META_PAGE_OBJECT]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                action: "sql",
                json,
                list: true,
                plugin: bc.extraplugingate,
                query: bc[VAR_RECORD_QUERY_ID] || "",
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
            let isDefault: "##alwaysfirst##" | "##first##" | undefined = undefined;
            let recordIdValue = undefined;
            let record = undefined;

            switch (true) {
                case defaultvalue === VALUE_SELF_ALWAYSFIRST:
                    isDefault = VALUE_SELF_ALWAYSFIRST;
                    [record] = records;
                    recordIdValue = records[0] ? records[0][valueField] : undefined;
                    break;
                case selectedRecordId !== undefined:
                    recordIdValue = selectedRecordId;
                    break;
                case this.selectedRecordId !== undefined:
                    recordIdValue = this.selectedRecordId;
                    break;
                case defaultvalue === VALUE_SELF_FIRST:
                    isDefault = VALUE_SELF_FIRST;
                    recordIdValue = records[0] ? records[0][valueField] : undefined;
                    [record] = records;
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
            setMask(false, noglobalmask, this.pageStore);
            this.isLoading = false;

            return this.selectedRecord;
        });
}
