import axios from "axios";
import {setMask} from "../models/RecordsModel/loadRecordsAction";
import {request} from "../request";
import {IPageModel} from "../types/PageModel";
import {ISnackbarModel} from "../types/SnackbarModel";
import {FieldValue, IRecord, IResponse, IApplicationModel} from "../types";
import {VAR_RECORD_MASTER_ID, VAR_SETTING_GATE_URL} from "../constants/variables";
import {
    VAR_RECORD_URL,
    VAR_RECORD_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CL_ONLINE,
    VAR_RECORD_CV_ACTION,
    META_PAGE_OBJECT,
    VAR_RECORD_CK_D_ENDPOINT,
} from "../constants";
import {settingsStore} from "../models/SettingsModel";
import {getMasterObject} from "./getMasterObject";

interface IPrintBC {
    ck_parent: string;
    updatequery?: string;
    ck_d_endpoint?: string;
    update_query?: string;
    extraplugingate?: string;
    noglobalmask?: string;
    getmastervalue?: string;
    [VAR_RECORD_MASTER_ID]: string | undefined;
}

interface IReloadPageObject {
    [VAR_RECORD_ROUTE_PAGE_ID]: string;
    [VAR_RECORD_PAGE_OBJECT_ID]: string;
}

interface IPrint {
    applicationStore: IApplicationModel;
    values: Record<string, FieldValue>;
    bcBtn: IPrintBC;
    bc: IPrintBC;
    isOnline: boolean;
    snackbarStore: ISnackbarModel;
    pageStore: IPageModel;
    reloadPageObject?: IReloadPageObject;
    timeout?: string;
}

interface IResult extends IResponse, IRecord {
    [VAR_RECORD_URL]: string | undefined;
}

export const prepareUrl = (url: string, pageStore: IPageModel, record: Record<string, FieldValue> = {}) => {
    // eslint-disable-next-line require-unicode-regexp,  prefer-named-capture-group
    return url.replace(/{([^}]+)}/g, (_match, pattern): string => {
        if (pattern in record) {
            return record[pattern] as string;
        }

        const globalValue = pageStore.globalValues.get(pattern);

        if (typeof globalValue === "string") {
            return globalValue;
        }

        return "";
    });
};

export const print = async ({
    applicationStore,
    values: {...values},
    bc,
    bcBtn,
    isOnline,
    snackbarStore,
    pageStore,
    reloadPageObject,
    timeout,
}: IPrint) => {
    values[VAR_RECORD_ID] = null;
    values[VAR_RECORD_CL_ONLINE] = Number(isOnline);
    const getMasterValue = bcBtn.getmastervalue || bc.getmastervalue;

    setMask(true, bcBtn.noglobalmask, pageStore);
    const result: any = await request({
        [META_PAGE_OBJECT]: bc[VAR_RECORD_PARENT_ID],
        action: "dml",
        gate: bc[VAR_RECORD_CK_D_ENDPOINT],
        json: {
            data: values,
            master: getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, getMasterValue),
            reloadpageobject: reloadPageObject,
            service: {
                [VAR_RECORD_CV_ACTION]: "I",
                ...reloadPageObject,
            },
        },
        plugin: bcBtn.extraplugingate || bc.extraplugingate,
        query: bcBtn.updatequery || "Modify",
        session: applicationStore.authStore.userInfo.session,
        timeout,
    });
    const res: IResult = result;

    setMask(false, bcBtn.noglobalmask, pageStore);
    const isValid = snackbarStore.checkValidResponseAction(res, {
        applicationStore,
        route: pageStore.route,
    });

    const url = res[VAR_RECORD_URL];

    if (isValid && isOnline && url) {
        window.open(prepareUrl(url, pageStore, values));
    }

    return isValid;
};

export const downloadFile = (
    name: string,
    queryParams: string,
    gate: string = settingsStore.settings[VAR_SETTING_GATE_URL],
) => {
    const form = document.createElement("form");

    form.setAttribute("method", "post");
    form.setAttribute("name", name);
    form.setAttribute("action", `${gate}?${queryParams}`);
    if (document.body) {
        document.body.appendChild(form);
    }
    form.submit();
    if (document.body) {
        document.body.removeChild(form);
    }
};

const createLink = (blobURL: string, filename: string, expotType: string) => {
    const tempLink = document.createElement("a");

    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", `${filename || ""}.${expotType}`);

    if (typeof tempLink.download === "undefined") {
        tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
};

export const downloadImage = (url: string, filename = "", expotType = "jpg") => {
    if (url.indexOf("http") === -1) {
        createLink(url, filename, expotType);
    } else {
        axios({
            method: "GET",
            responseType: "blob",
            url,
        })
            .then((response) => response.data)
            .then((blob) => {
                createLink(URL.createObjectURL(blob), filename, expotType);
            });
    }
};
