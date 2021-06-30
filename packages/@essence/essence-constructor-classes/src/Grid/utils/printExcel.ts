/* eslint-disable max-statements */
import {i18next, getMasterObject, prepareUrl} from "@essence-community/constructor-share/utils";
import {snackbarStore, settingsStore} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_CV_DESCRIPTION,
    META_PAGE_OBJECT,
    VAR_RECORD_CV_URL_RESPONSE,
    VAR_RECORD_URL,
    VAR_SETTING_GATE_URL,
} from "@essence-community/constructor-share/constants";
import {IBuilderConfig, IRecordsModel, IRecord} from "@essence-community/constructor-share/types";
import {
    getFilterData,
    attachGlobalStore,
    setMask,
} from "@essence-community/constructor-share/models/RecordsModel/loadRecordsAction";
import {request} from "@essence-community/constructor-share/request";
import {appendInputForm} from "@essence-community/constructor-share/actions/download";
import {stringify} from "qs";
import {IGridModel} from "../stores/GridModel/GridModel.types";

interface IPrintExcelType {
    bcBtn: IBuilderConfig;
    recordsStore: IRecordsModel;
    gridStore: IGridModel;
    values: IRecord;
}

export function printExcel({bcBtn, recordsStore, gridStore, values}: IPrintExcelType): Promise<boolean> {
    const {bc, pageStore} = gridStore;
    const {getmastervalue, columns} = bc;
    const {globalValues} = pageStore;
    const displayed = bc[VAR_RECORD_DISPLAYED];
    const description = bc[VAR_RECORD_CV_DESCRIPTION];
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
        [VAR_RECORD_CV_DESCRIPTION]: (description && i18next.t(description)) || "",
        [VAR_RECORD_DISPLAYED]: (displayed && i18next.t(displayed)) || "",
        columns: (columns || [])
            .filter(
                (obj) =>
                    obj.datatype !== "icon" && obj.datatype !== "checkbox" && obj.visible && obj.hiddenrules !== "true",
            )
            .map((val) => ({
                [VAR_RECORD_CV_DESCRIPTION]: val[VAR_RECORD_CV_DESCRIPTION] || "",
                [VAR_RECORD_DISPLAYED]: i18next.t(val[VAR_RECORD_DISPLAYED]) || "",
                column: val.column || "",
                currencysign: val.currencysign || "",
                datatype: val.datatype || "",
                decimalprecision: val.decimalprecision ?? 2,
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

    if (bc.btnexcel === "file") {
        const queryStr = {
            action: "file",
            plugin: [bcBtn.extraplugingate, bc.extraplugingate].join(","),
            query: bc[VAR_RECORD_QUERY_ID] || "",
        };
        const form = document.createElement("form");

        form.setAttribute("method", "post");
        form.setAttribute("action", `${settingsStore.settings[VAR_SETTING_GATE_URL]}?${stringify(queryStr)}`);
        if (recordsStore.formData) {
            form.setAttribute("enctype", "multipart/form-data");
            if ((recordsStore.formData as any).keys) {
                for (const key of (recordsStore.formData as any).keys()) {
                    const value = (recordsStore.formData as any).getAll(key);

                    if (typeof value[0] === "object") {
                        appendInputForm({
                            files: value,
                            form,
                            name: key,
                            type: "file",
                        });
                    } else {
                        appendInputForm({
                            form,
                            name: key,
                            value: value[0],
                        });
                    }
                }
            }
        }
        appendInputForm({
            form,
            name: "page_object",
            value: bc[VAR_RECORD_PAGE_OBJECT_ID],
        });
        appendInputForm({
            form,
            name: "session",
            value: pageStore?.applicationStore.authStore.userInfo.session || "",
        });
        appendInputForm({
            form,
            name: "json",
            value: JSON.stringify(json),
        });
        Object.entries(body).forEach(([key, value]) => {
            appendInputForm({
                form,
                name: key,
                value: value,
            });
        });
        if (document.body) {
            document.body.appendChild(form);
        }
        form.submit();
        if (document.body) {
            document.body.removeChild(form);
        }

        return Promise.resolve(true);
    }
    setMask(true, false, pageStore);

    return request({
        [META_PAGE_OBJECT]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        body,
        formData: recordsStore.formData,
        // Gate: bc[VAR_RECORD_CK_D_ENDPOINT],
        json,
        list: false,
        plugin: bcBtn.extraplugingate || bc.extraplugingate,
        query: bc[VAR_RECORD_QUERY_ID] || "",
        session: pageStore.applicationStore.authStore.userInfo.session,
        timeout: bcBtn.timeout ?? 660,
    })
        .then((res: any) => {
            setMask(false, false, pageStore);
            const isValid: number = snackbarStore.checkValidResponseAction(res, {
                applicationStore: pageStore.applicationStore,
                route: pageStore.route,
            });

            const url = res[VAR_RECORD_CV_URL_RESPONSE] || res[VAR_RECORD_URL];

            if (isValid && url) {
                window.open(prepareUrl(url, pageStore));
            }

            return isValid > 0;
        })
        .catch((error) => {
            snackbarStore.checkExceptResponse(error, pageStore.route, pageStore.applicationStore);
            setMask(false, false, pageStore);

            return false;
        });
}
