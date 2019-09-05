/* eslint max-lines: ["error", 500]*/
// @flow
import get from "lodash/get";
import isString from "lodash/isString";
import uuidv4 from "uuid/v4";
import pickBy from "lodash/pickBy";
import forEach from "lodash/forEach";
import isUndefined from "lodash/isUndefined";
import isEqual from "lodash/isEqual";
import {loggerRoot} from "../../constants";
import {type CkIdType} from "../../BuilderType";
import {isEmpty, sleep} from "../../utils/base";
import {type PageModelType} from "../PageModel";
import {sendRequestList} from "../../request/baseRequest";
import {findSetKey, findGetGlobalKey} from "../../utils/findKey";
import {type RecordsModelType, type RecordsModelInstanceType, type RecordsStateStatusType} from "./RecordsModelType";
import {CheckLoading, CYCLE_TIMEOUT} from "./checkLoading";

type GetFilterDataType = {
    filter: $PropertyType<RecordsModelType, "filter">,
    order: $PropertyType<RecordsModelType, "order">,
    searchValues: $PropertyType<RecordsModelType, "searchValues">,
    pageSize: $PropertyType<RecordsModelType, "pageSize">,
    pageNumber: $PropertyType<RecordsModelType, "pageNumber">,
};

type AttachGlobalStore = {
    bc: $PropertyType<RecordsModelType, "bc">,
    json: Object,
    globalValues: Map<string, string>,
};

type LoadRecordsActionType = {
    bc: $PropertyType<RecordsModelType, "bc">,
    applicationStore: Object,
    recordId?: any,
    selectedRecordId?: CkIdType,
    isUserReload?: boolean,
    status: RecordsStateStatusType,
};

const logger = loggerRoot.extend("recordsActions");
// 2 frames (16ms)
const WAIT_TIME = 32;

export const getMasterData = (masterObject?: Object, idproperty?: string, globalValues?: Object) => {
    const master = {};

    if (isEmpty(idproperty)) {
        return master;
    }

    forEach(findSetKey(idproperty || ""), (fieldName: string, globaleKey: string) => {
        if (masterObject && masterObject[globaleKey]) {
            const value = masterObject[globaleKey];

            master[fieldName] = isString(value) && value.indexOf("auto-") === 0 ? undefined : value;
        } else if (globalValues && globalValues.has(globaleKey)) {
            const value = globalValues.get(globaleKey);

            master[fieldName] = isString(value) && value.indexOf("auto-") === 0 ? undefined : value;
        }

        if (isEmpty(master[fieldName])) {
            master[fieldName] = undefined;
        }
    });

    return master;
};

export function getMasterObject(ckMaster?: string, pageStore?: PageModelType): typeof undefined | Object {
    return ckMaster && pageStore
        ? {
              ...get(pageStore.stores.get(ckMaster), "selectedRecord", {}),
              ...(pageStore.fieldValueMaster.has(ckMaster) ? {ckId: pageStore.fieldValueMaster.get(ckMaster)} : {}),
          }
        : undefined;
}

export function getPageFilter(pageSize: ?number, pageNumber: number) {
    return pageSize
        ? {
              jnFetch: pageSize,
              jnOffset: pageSize * pageNumber,
          }
        : {
              jnFetch: 1000,
              jnOffset: 0,
          };
}

export function getFilterData({filter, order, searchValues, pageSize, pageNumber}: GetFilterDataType): Object {
    return {
        jlFilter: filter,
        jlSort: [order],
        ...pickBy(searchValues, (value) => value !== ""),
        ...getPageFilter(pageSize, pageNumber),
    };
}

export function attachGlobalStore({bc, json, globalValues}: AttachGlobalStore): void {
    if (bc.getglobaltostore && globalValues) {
        forEach(findGetGlobalKey(bc.getglobaltostore), (globaleKey, fieldName) => {
            if (typeof json.filter[fieldName] === "undefined") {
                json.filter[fieldName] = globalValues.get(globaleKey);
            }
        });
    }
}

export function setMask(noglobalmask?: string, pageStore?: PageModelType, isLoading: boolean) {
    if (noglobalmask !== "true" && pageStore) {
        pageStore.setLoadingAction(isLoading);
    }
}

export function checkPageNumber(recordsStore: RecordsModelInstanceType, master: Object) {
    if (!isEqual(master, recordsStore.jsonMaster)) {
        recordsStore.jsonMaster = master;
        recordsStore.pageNumber = 0;
    }
}

export const getAttachedRecords = (records: Array<Object>, newRecord?: Object) => {
    if (newRecord) {
        const {ckId} = newRecord;
        const firstRecord = records[0] || {};
        const recordIndex = records.findIndex((rec) => rec.ckId === ckId);
        const record = {...newRecord, jnTotalCnt: firstRecord.jnTotalCnt};

        if (recordIndex === -1) {
            return [record, ...records];
        }

        return [...records.slice(0, recordIndex), record, ...records.slice(recordIndex + 1)];
    }

    return records;
};

export function prepareRequst(
    recordsStore: RecordsModelInstanceType,
    {bc, status, selectedRecordId}: LoadRecordsActionType,
) {
    const {idproperty = "ck_id", ckMaster, noglobalmask} = bc;
    const globalValues = get(recordsStore.pageStore, "globalValues");
    const master = getMasterData(getMasterObject(ckMaster, recordsStore.pageStore), idproperty, globalValues);
    const filterData =
        status === "attach"
            ? {
                  filter: [],
                  order: recordsStore.order,
                  pageNumber: 0,
                  pageSize: 1,
                  searchValues: {ckId: selectedRecordId},
              }
            : {
                  filter: recordsStore.filter,
                  order: recordsStore.order,
                  pageNumber: recordsStore.pageNumber,
                  pageSize: recordsStore.pageSize,
                  searchValues: recordsStore.searchValues,
              };

    checkPageNumber(recordsStore, master);

    const json = {
        filter: getFilterData(filterData),
        master,
    };

    attachGlobalStore({bc, globalValues, json});

    setMask(noglobalmask, recordsStore.pageStore, true);

    return {json};
}

function loadRecordsResolve(noglobalmask: string) {
    setMask(noglobalmask, this.pageStore, false);
    this.isLoading = false;

    return this.selectedRecord;
}

export function loadRecordsAction({
    bc,
    applicationStore,
    selectedRecordId,
    status,
    isUserReload = false,
}: LoadRecordsActionType): Promise<*> {
    const {ckMaster, noglobalmask, defaultvalue, reloadservice} = bc;
    const isWaiting = ckMaster || bc.getglobaltostore;
    const resolve = loadRecordsResolve.bind(this);

    this.isLoading = true;

    return Promise.resolve()
        .then(() => {
            if (!isWaiting) {
                return true;
            }

            return sleep(WAIT_TIME).then(() => new CheckLoading({bc, ckMaster, pageStore: this.pageStore}));
        })
        .catch(() => {
            logger(
                `Ожидание загрузки привышено ${CYCLE_TIMEOUT}ms,` +
                    ` проверьте циклиность использования глобальных переменных для сервиса ${bc.ckQuery}`,
            );
        })
        .then(() => {
            const {json} = prepareRequst(this, {applicationStore, bc, selectedRecordId, status});

            if (reloadservice === "true" && this.prevFetchJson && isEqual(this.prevFetchJson, json)) {
                return resolve(noglobalmask);
            }
            this.prevFetchJson = json;

            return sendRequestList({
                action: "sql",
                json,
                pageObject: bc.ckPageObject,
                plugin: bc.extraplugingate,
                query: bc.ckQuery,
                session: applicationStore.session,
                timeout: bc.timeout,
            });
        })
        .then((response) => {
            if (
                applicationStore.snackbarStore.checkValidResponseAction(
                    response[0],
                    this.pageStore && this.pageStore.route,
                )
            ) {
                const records = (response || []).map((record) => {
                    if (!record.ckId && isEmpty(record.ckId)) {
                        record.ckId = `auto-${uuidv4()}`;
                    }

                    return record;
                });

                if (bc.pagesize && records[0] && !records[0].jnTotalCnt) {
                    applicationStore.snackbarStore.snackbarOpenAction(
                        {
                            status: "error",
                            text: "Неизвестное количество страниц",
                        },
                        this.pageStore && this.pageStore.route,
                    );
                }

                return records;
            }

            return [];
        })
        .catch((response) => {
            applicationStore.snackbarStore.checkExceptResponse(response, this.pageStore && this.pageStore.route);

            return [];
        })
        .then((records) => {
            const valueField = status === "attach" ? "ckId" : this.valueField;
            let isDefault = false;
            let recordId = null;

            switch (true) {
                case defaultvalue === "alwaysfirst":
                    isDefault = true;
                    recordId = records[0] ? records[0][valueField] : null;
                    break;
                case !isUndefined(selectedRecordId):
                    recordId = selectedRecordId;
                    break;
                case !isUndefined(this.selectedRecordId):
                    recordId = this.selectedRecordId;
                    break;
                case defaultvalue === "first":
                    isDefault = true;
                    recordId = records[0] ? records[0][valueField] : null;
                    break;
                default:
                    recordId = null;
            }

            this.recordsState = {
                defaultValueSet: isDefault && !isEmpty(recordId) ? defaultvalue : undefined,
                isUserReload,
                records: status === "attach" ? getAttachedRecords(this.recordsState.records, records[0]) : records,
                status,
            };
            this.recordsAll = this.recordsState.records;

            return this.setSelectionAction(recordId, valueField);
        })
        .then(() => resolve(noglobalmask));
}
