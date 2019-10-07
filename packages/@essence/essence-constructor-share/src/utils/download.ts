// @flow
import axios from "axios";
import {setMask} from "../models/RecordsModel";
import {baseRequest} from "../request/baseRequest";
import {IPageModel} from "../types/PageModel";
import {ISnackbarModel} from "../types/SnackbarModel";

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
    values: {[key: string]: any};
    bcBtn: IPrintBC;
    bc: IPrintBC;
    isOnline: boolean;
    session: string;
    snackbarStore: ISnackbarModel;
    pageStore: IPageModel;
    reloadPageObject?: IReloadPageObject;
    timeout?: string;
}

export const print = async ({
    values: {...values},
    bc,
    bcBtn,
    isOnline,
    session,
    snackbarStore,
    pageStore,
    reloadPageObject,
    timeout,
}: IPrint) => {
    values.ckId = null;
    values.clOnline = Number(isOnline);
    setMask(bcBtn.noglobalmask, pageStore, true);
    const res = await baseRequest({
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
        session,
        timeout,
    });

    setMask(bcBtn.noglobalmask, pageStore, false);
    const isValid = snackbarStore.checkValidResponseAction(res, pageStore.route);

    if (isValid && isOnline) {
        window.open(res.cvUrl);
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

export const downloadImage = (url: string, filename?: string, expotType = "jpg") => {
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
