// @flow
import get from "lodash/get";
import {i18next, getMasterObject} from "@essence-community/constructor-share/utils";
import {snackbarStore} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_CV_DESCRIPTION,
    META_PAGE_OBJECT,
    VAR_RECORD_CK_D_ENDPOINT,
    VAR_RECORD_CV_URL_RESPONSE,
} from "@essence-community/constructor-share/constants";
import {type RecordsModelType} from "../RecordsModel";
import {getFilterData, setMask, attachGlobalStore} from "../RecordsModel/loadRecordsAction";
import {sendRequest} from "../../request/baseRequest";
import {type GridModelType} from "./GridModelType";

type PrintExcelType = {
    bcBtn: Object,
    recordsStore: RecordsModelType,
    gridStore: GridModelType,
    values: Object,
};

// eslint-disable-next-line max-lines-per-function
export function printExcel({bcBtn, recordsStore, gridStore, values}: PrintExcelType): Promise<boolean> {
    const {bc, pageStore} = gridStore;
    const {getmastervalue, columns} = bc;
    const globalValues = get(pageStore, "globalValues");
    const json = {
        filter: getFilterData({
            filter: recordsStore.filter,
            order: recordsStore.order,
            pageNumber: 0,
            pageSize: 50000,
            searchValues: recordsStore.searchValues,
        }),
        master: getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, getmastervalue),
    };

    attachGlobalStore({bc, globalValues, json});

    const jsonbc = {
        [VAR_RECORD_CV_DESCRIPTION]: i18next.t(bc[VAR_RECORD_CV_DESCRIPTION]) || "",
        [VAR_RECORD_DISPLAYED]: i18next.t(bc[VAR_RECORD_DISPLAYED]) || "",
        columns: (columns || [])
            .filter(
                (obj) =>
                    obj.datatype !== "icon" &&
                    obj.datatype !== "checkbox" &&
                    obj.visible !== "false" &&
                    obj.hiddenrules !== "true",
            )
            .map((val) => ({
                [VAR_RECORD_CV_DESCRIPTION]: val[VAR_RECORD_CV_DESCRIPTION] || "",
                [VAR_RECORD_DISPLAYED]: i18next.t(val[VAR_RECORD_DISPLAYED]) || "",
                column: val.column || "",
                currencysign: val.currencysign || "",
                datatype: val.datatype || "",
                decimalprecision: val.decimalprecision ? parseInt(val.decimalprecision, 10) : 2,
                decimalseparator: val.decimalseparator ? val.decimalseparator : ",",
                format: val.format || "",
                thousandseparator: val.thousandseparator ? val.thousandseparator : " ",
            })),
        excelname: values.excelname,
        type: bc.type || "",
    };
    const body = {
        exportexcel: "true",
        jsonbc: JSON.stringify(jsonbc),
    };

    setMask("false", pageStore, true);

    return sendRequest({
        [META_PAGE_OBJECT]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        action: "sql",
        body,
        gate: bc[VAR_RECORD_CK_D_ENDPOINT],
        json,
        plugin: bcBtn.extraplugingate || bc.extraplugingate,
        query: bc[VAR_RECORD_QUERY_ID] || "",
        session: pageStore.applicationStore.session,
        timeout: bcBtn.timeout || "660",
    })
        .then((res) => {
            setMask("false", pageStore, false);
            const isValid: number = snackbarStore.checkValidResponseAction(
                res,
                pageStore.route,
                undefined,
                pageStore.applicationStore,
            );

            if (isValid) {
                window.open(res[VAR_RECORD_CV_URL_RESPONSE]);
            }

            return isValid > 0;
        })
        .catch(() => {
            setMask("false", pageStore, false);

            return false;
        });
}
