import {v4} from "uuid";
import {isEqual} from "lodash";
import {request} from "../../request";
import {
    IBuilderConfig,
    ICkId,
    IPageModel,
    IRecord,
    IRecordsModel,
    IRecordsOrder,
    RecordsStateStatusType,
} from "../../types";
import {CheckLoading, CYCLE_TIMEOUT} from "./checkLoading";
import {findGetGlobalKey, findSetKey, sleep} from "./utils";

type FilterType = object[];
type GlobalValuesType = Map<string, string>;
interface IObjectValues {[$key: string]: any}
interface IMasterObject {[$key: string]: any}
interface IGlobalKeys {[$key: string]: any}
interface IFilterData {[$key: string]: any}
interface IJson {
    filter: IFilterData;
    master: IMasterObject;
}

interface IGetFilterData {
    filter: FilterType;
    order: IRecordsOrder;
    searchValues: object;
    pageSize?: number;
    pageNumber: number;
}

interface IAttachGlobalStore {
    bc: IBuilderConfig;
    json: IJson;
    globalValues: GlobalValuesType;
}

export interface ILoadRecordsAction {
    bc: IBuilderConfig;
    applicationStore: any;
    recordId?: any;
    selectedRecordId?: ICkId;
    isUserReload?: boolean;
    status: RecordsStateStatusType;
}

// 2 frames (16ms)
const WAIT_TIME = 32;

export const getMasterData = (masterObject?: IMasterObject, idproperty?: string, globalValues?: GlobalValuesType) => {
    const master: IMasterObject = {};

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

export function getMasterObject(ckMaster?: string, pageStore?: IPageModel): typeof undefined | object {
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

export function getPageFilter(pageSize?: number, pageNumber: number = 0) {
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

function getNotEmptyData(searchValues: IObjectValues) {
    const values: IObjectValues = {};

    Object.keys(searchValues).forEach((key) => {
        if (searchValues[key] !== "") {
            values[key] = searchValues[key];
        }
    });

    return values;
}

export function getFilterData({filter, order, searchValues, pageSize, pageNumber}: IGetFilterData): object {
    return {
        jlFilter: filter,
        jlSort: [order],
        ...getNotEmptyData(searchValues),
        ...getPageFilter(pageSize, pageNumber),
    };
}

export function attachGlobalStore({bc, json, globalValues}: IAttachGlobalStore): void {
    if (bc.getglobaltostore && globalValues) {
        const globalKeys: IGlobalKeys = findGetGlobalKey(bc.getglobaltostore);

        Object.keys(globalKeys).forEach((fieldName: string) => {
            const globaleKey = globalKeys[fieldName];

            if (typeof json.filter[fieldName] === "undefined") {
                json.filter[fieldName] = globalValues.get(globaleKey);
            }
        });
    }
}

export function setMask(noglobalmask?: string, pageStore?: IPageModel, isLoading?: boolean) {
    if (noglobalmask !== "true" && pageStore) {
        pageStore.setLoadingAction(isLoading);
    }
}

export function checkPageNumber(recordsStore: IRecordsModel, master: object) {
    if (!isEqual(master, recordsStore.jsonMaster)) {
        recordsStore.jsonMaster = master;
        recordsStore.pageNumber = 0;
    }
}

export const getAttachedRecords = (records: IRecord[], newRecord?: IRecord) => {
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
    const {globalValues} = recordsStore.pageStore;
    const master = getMasterData(getMasterObject(ckMaster, recordsStore.pageStore), idproperty, globalValues);
    const filterData: IGetFilterData =
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

    setMask(noglobalmask, recordsStore.pageStore, true);

    return {json};
}

export function loadRecordsAction({
    bc,
    applicationStore,
    selectedRecordId,
    status,
    isUserReload = false,
}: ILoadRecordsAction): Promise<object | undefined> {
    const {ckMaster, noglobalmask, defaultvalue} = bc;
    const isWaiting = ckMaster || bc.getglobaltostore;

    this.isLoading = true;

    return Promise.resolve()
        .then(
            (): boolean | Promise<boolean> => {
                if (!isWaiting) {
                    return true;
                }

                return sleep(WAIT_TIME).then(() => new CheckLoading({bc, ckMaster, pageStore: this.pageStore}).wait());
            },
        )
        .catch(() => {
            // tslint:disable-next-line:no-console
            console.error(
                `Ожидание загрузки привышено ${CYCLE_TIMEOUT}ms,` +
                    ` проверьте циклиность использования глобальных переменных для сервиса ${bc.ckQuery}`,
            );
        })
        .then(() => {
            const {json} = prepareRequst(this, {applicationStore, bc, selectedRecordId, status});

            return request({
                action: "sql",
                gate: applicationStore.configs.baseUrl,
                json,
                list: true,
                pageObject: bc.ckPageObject,
                plugin: bc.extraplugingate,
                query: bc.ckQuery,
                session: applicationStore.session,
                timeout: bc.timeout,
            });
        })
        .then((response: any) => {
            if (
                applicationStore.snackbarStore.checkValidResponseAction(
                    response[0],
                    this.pageStore && this.pageStore.route,
                )
            ) {
                const records = (response || []).map((record: IRecord) => {
                    if (record.ckId === undefined) {
                        record.ckId = `auto-${v4()}`;
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
        .catch(
            (response: any): any => {
                applicationStore.snackbarStore.checkExceptResponse(response, this.pageStore && this.pageStore.route);

                return [];
            },
        )
        .then((records: any) => {
            const valueField = status === "attach" ? "ckId" : this.valueField;
            let isDefault = false;
            let recordId;

            switch (true) {
                case defaultvalue === "alwaysfirst":
                    isDefault = true;
                    recordId = records[0] ? records[0][valueField] : undefined;
                    break;
                case selectedRecordId !== undefined:
                    recordId = selectedRecordId;
                    break;
                case this.selectedRecordId !== undefined:
                    recordId = this.selectedRecordId;
                    break;
                case defaultvalue === "first":
                    isDefault = true;
                    recordId = records[0] ? records[0][valueField] : undefined;
                    break;
                default:
                    recordId = undefined;
            }

            this.recordsState = {
                defaultValueSet: isDefault && recordId === undefined ? defaultvalue : undefined,
                isUserReload,
                records: status === "attach" ? getAttachedRecords(this.recordsState.records, records[0]) : records,
                status,
            };
            this.recordsAll = this.recordsState.records;

            return this.setSelectionAction(recordId, valueField);
        })
        .then(() => {
            setMask(noglobalmask, this.pageStore, false);
            this.isLoading = false;

            return this.selectedRecord;
        });
}
