import {ObservableMap} from "mobx";
import {v4} from "uuid";
import {isEqual} from "lodash";
import {request} from "../../request";
import {IPageModel, IRecordsModel, FieldValue, IResponse} from "../../types";
import {findSetKey, findGetGlobalKey} from "../../utils/findKey";
import {snackbarStore} from "../SnackbarModel";
import {
    IGetFilterData,
    IGetFilterDataOptions,
    IAttachGlobalStore,
    ILoadRecordsAction,
    IJson,
} from "./RecordsModel.types";

export const getMasterData = (
    masterObject?: Record<string, FieldValue>,
    idproperty?: string,
    globalValues?: ObservableMap<string, FieldValue>,
) => {
    const master: Record<string, FieldValue> = {};

    if (!idproperty) {
        return master;
    }

    const idPropertyValues = findSetKey(idproperty || "");

    Object.keys(idPropertyValues).forEach((globaleKey: string) => {
        const fieldName = idPropertyValues[globaleKey];

        if (masterObject && masterObject[globaleKey]) {
            const value = masterObject[globaleKey];

            master[fieldName] = typeof value === "string" && value.indexOf("auto-") === 0 ? undefined : value;
        } else if (globalValues && globalValues.has(globaleKey)) {
            const value = globalValues.get(globaleKey);

            master[fieldName] = typeof value === "string" && value.indexOf("auto-") === 0 ? undefined : value;
        }
    });

    return master;
};

export function getMasterObject(ckMaster?: string, pageStore?: IPageModel): undefined | Record<string, FieldValue> {
    if (!ckMaster || !pageStore) {
        return undefined;
    }

    const masterObject = pageStore.stores.get(ckMaster);
    const selectedRecord = masterObject ? masterObject.selectedRecord : {};

    return {
        ...selectedRecord,
        ...(pageStore.fieldValueMaster.has(ckMaster) ? {ckId: pageStore.fieldValueMaster.get(ckMaster)} : {}),
    };
}

export function getPageFilter(pageSize?: number, pageNumber = 0) {
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
        jlFilter: filter,
        jlSort: [order],
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

export function setMask(isLoading: boolean, noglobalmask?: string, pageStore?: IPageModel) {
    if (noglobalmask !== "true" && pageStore) {
        pageStore.setLoadingAction(isLoading);
    }
}

export function checkPageNumber(recordsStore: IRecordsModel, master: Record<string, FieldValue>) {
    if (!isEqual(master, recordsStore.jsonMaster)) {
        recordsStore.jsonMaster = master;
        recordsStore.pageNumber = 0;
    }
}

export const getAttachedRecords = (records: Record<string, FieldValue>[], newRecord?: Record<string, FieldValue>) => {
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

export function prepareRequst(recordsStore: IRecordsModel, {bc, status, selectedRecordId}: ILoadRecordsAction) {
    const {idproperty = "ck_id", ckMaster, noglobalmask} = bc;
    const globalValues = recordsStore.pageStore && recordsStore.pageStore.globalValues;
    const master = getMasterData(getMasterObject(ckMaster, recordsStore.pageStore), idproperty, globalValues);
    const filterData: IGetFilterDataOptions =
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
    {bc, selectedRecordId, status, isUserReload = false}: ILoadRecordsAction,
): Promise<object | undefined> {
    const {noglobalmask, defaultvalue} = bc;

    this.isLoading = true;

    // Should be logic for wainting unfinished master request
    return Promise.resolve()
        .then(() => {
            const {json} = prepareRequst(this, {bc, selectedRecordId, status});

            return request({
                action: "sql",
                json,
                list: true,
                pageObject: bc.ckPageObject,
                plugin: bc.extraplugingate,
                query: bc.ckQuery || "",
                session: this.applicationStore ? this.applicationStore.authStore.userInfo.session : "",
                timeout: bc.timeout,
            });
        })
        .then((response: IResponse[]) => {
            if (
                snackbarStore.checkValidResponseAction(
                    response[0],
                    this.pageStore && this.pageStore.route,
                    undefined,
                    this.applicationStore,
                )
            ) {
                const records = (response || []).map((record: Record<string, FieldValue>) => {
                    if (record.ckId === undefined) {
                        record.ckId = `auto-${v4()}`;
                    }

                    return record;
                });

                if (bc.pagesize && records[0] && !records[0].jnTotalCnt) {
                    snackbarStore.snackbarOpenAction(
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
        .catch((response: IResponse): Record<string, FieldValue>[] => {
            snackbarStore.checkExceptResponse(response, this.pageStore && this.pageStore.route, this.applicationStore);

            return [];
        })
        .then((records: Record<string, FieldValue>[]) => {
            const valueField = status === "attach" ? "ckId" : this.valueField;
            let isDefault: "alwaysfirst" | "first" | undefined = undefined;
            let recordId = undefined;

            switch (true) {
                case defaultvalue === "alwaysfirst":
                    isDefault = "alwaysfirst";
                    recordId = records[0] ? records[0][valueField] : undefined;
                    break;
                case selectedRecordId !== undefined:
                    recordId = selectedRecordId;
                    break;
                case this.selectedRecordId !== undefined:
                    recordId = this.selectedRecordId;
                    break;
                case defaultvalue === "first":
                    isDefault = "first";
                    recordId = records[0] ? records[0][valueField] : undefined;
                    break;
                default:
                    recordId = undefined;
            }

            this.recordsState = {
                defaultValueSet: isDefault && recordId === undefined ? isDefault : undefined,
                isUserReload,
                records: status === "attach" ? getAttachedRecords(this.recordsState.records, records[0]) : records,
                status,
            };
            this.recordsAll = this.recordsState.records;

            return this.setSelectionAction(recordId, valueField);
        })
        .then(() => {
            setMask(false, noglobalmask, this.pageStore);
            this.isLoading = false;

            return this.selectedRecord;
        });
}
