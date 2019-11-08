import axios from "axios";
import {setMask} from "../models/RecordsModel/loadRecordsAction";
import {request} from "../request";
import {IPageModel} from "../types/PageModel";
import {ISnackbarModel} from "../types/SnackbarModel";
import {FieldValue, IRecord, IResponse, IApplicationModel} from "../types";
import {VAR_RECORD_RES_DOWNLOAD_URL} from "../constants";

interface IPrintBC {
    ckParent: string;
    updatequery?: string;
    ckDEndpoint?: string;
    updateQuery?: string;
    extraplugingate?: string;
    noglobalmask?: string;
}

interface IReloadPageObject {
    ckPage: string;
    ckPageObject: string;
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
    [VAR_RECORD_RES_DOWNLOAD_URL]: string | undefined;
}

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
    values.ckId = null;
    values.clOnline = Number(isOnline);
    setMask(true, bcBtn.noglobalmask, pageStore);
    const result: any = await request({
        action: "dml",
        gate: bc.ckDEndpoint,
        json: {
            data: values,
            reloadpageobject: reloadPageObject,
            service: {
                cvAction: "I",
            },
        },
        pageObject: bc.ckParent,
        plugin: bcBtn.extraplugingate || bc.extraplugingate,
        query: bcBtn.updatequery || "Modify",
        session: applicationStore.authStore.userInfo.session,
        timeout,
    });
    const res: IResult = result;

    setMask(false, bcBtn.noglobalmask, pageStore);
    const isValid = snackbarStore.checkValidResponseAction(res, pageStore.route, undefined, applicationStore);

    if (isValid && isOnline && res[VAR_RECORD_RES_DOWNLOAD_URL]) {
        window.open(res[VAR_RECORD_RES_DOWNLOAD_URL]);
    }

    return isValid;
};

export const downloadFile = (cvName: string, queryParams: string, gate: string) => {
    const form = document.createElement("form");

    form.setAttribute("method", "post");
    form.setAttribute("name", cvName);
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
