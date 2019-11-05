// @flow
import get from "lodash/get";
import {snakeCaseKeys} from "@essence/essence-constructor-share/utils";
import {snackbarStore} from "@essence/essence-constructor-share/models";
import {type RecordsModelType} from "../RecordsModel";
import {
    getFilterData,
    getMasterObject,
    getMasterData,
    setMask,
    attachGlobalStore,
} from "../RecordsModel/loadRecordsAction";
import {sendRequest} from "../../request/baseRequest";
import {type GridModelType} from "./GridModelType";

type PrintExcelType = {
    bcBtn: Object,
    recordsStore: RecordsModelType,
    gridStore: GridModelType,
    values: Object,
};

export function printExcel({bcBtn, recordsStore, gridStore, values}: PrintExcelType): Promise<boolean> {
    const {bc, pageStore} = gridStore;
    const {idproperty = "ck_id", ckMaster, columns} = bc;
    const globalValues = get(pageStore, "globalValues");
    const json = {
        filter: getFilterData({
            filter: recordsStore.filter,
            order: recordsStore.order,
            pageNumber: 0,
            pageSize: 50000,
            searchValues: recordsStore.searchValues,
        }),
        master: getMasterData(getMasterObject(ckMaster, pageStore), idproperty, globalValues),
    };

    attachGlobalStore({bc, globalValues, json});

    const jsonbc = {
        columns: (columns || [])
            .filter(
                (obj) =>
                    obj.datatype !== "icon" &&
                    obj.datatype !== "checkbox" &&
                    obj.visible !== "false" &&
                    obj.hiddenrules !== "true",
            )
            .map((val) => ({
                column: val.column || "",
                currencysign: val.currencysign || "",
                cvDescription: val.cvDescription || "",
                cvDisplayed: val.cvDisplayed || "",
                datatype: val.datatype || "",
                decimalprecision: val.decimalprecision ? parseInt(val.decimalprecision, 10) : 2,
                decimalseparator: val.decimalseparator ? val.decimalseparator : ",",
                format: val.format || "",
                thousandseparator: val.thousandseparator ? val.thousandseparator : " ",
            })),
        cvDescription: bc.cvDescription || "",
        cvDisplayed: bc.cvDisplayed || "",
        excelname: values.excelname,
        type: bc.type || "",
    };
    const body = {
        exportexcel: "true",
        jsonbc: JSON.stringify(snakeCaseKeys(jsonbc)),
    };

    setMask("false", pageStore, true);

    return sendRequest({
        action: "sql",
        body,
        gate: bc.ckDEndpoint,
        json,
        pageObject: bc.ckPageObject,
        plugin: bcBtn.extraplugingate || bc.extraplugingate,
        query: bc.ckQuery || "",
        session: pageStore.applicationStore.session,
        timeout: bcBtn.timeout || "660",
    })
        .then((res) => {
            setMask("false", pageStore, false);
            const isValid: number = snackbarStore.checkValidResponseAction(res, pageStore.route);

            if (isValid) {
                window.open(res.cvUrlResponse);
            }

            return isValid > 0;
        })
        .catch(() => {
            setMask("false", pageStore, false);

            return false;
        });
}
