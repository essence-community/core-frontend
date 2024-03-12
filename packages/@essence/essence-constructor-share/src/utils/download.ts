/* eslint-disable max-statements */
import axios from "axios";
import {setMask} from "../models/RecordsModel/loadRecordsAction";
import {request} from "../request";
import {IPageModel} from "../types/PageModel";
import {ISnackbarModel} from "../types/SnackbarModel";
import {FieldValue, IRecord, IResponse, IApplicationModel, IBuilderConfig} from "../types";
import {META_PAGE_ID, VAR_RECORD_MASTER_ID} from "../constants/variables";
import {
    VAR_RECORD_URL,
    VAR_RECORD_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CL_ONLINE,
    VAR_RECORD_CV_ACTION,
    META_PAGE_OBJECT,
} from "../constants";
import {getMasterObject} from "./getMasterObject";
import {prepareUrl} from "./redirect";

interface IReloadPageObject {
    [VAR_RECORD_ROUTE_PAGE_ID]: string;
    [VAR_RECORD_PAGE_OBJECT_ID]: string;
}

interface IPrint {
    applicationStore: IApplicationModel;
    values: Record<string, FieldValue>;
    bcBtn: IBuilderConfig;
    bc: IBuilderConfig;
    isOnline: boolean;
    snackbarStore: ISnackbarModel;
    pageStore: IPageModel;
    reloadPageObject?: IReloadPageObject;
    timeout?: number;
}

interface IResult extends IResponse, IRecord {
    [VAR_RECORD_URL]: string | undefined;
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
    values[VAR_RECORD_ID] = null;
    values[VAR_RECORD_CL_ONLINE] = Number(isOnline);
    const getMasterValue = bcBtn.getmastervalue || bc.getmastervalue;

    setMask(true, bcBtn.noglobalmask, pageStore);
    const result: any = await request({
        [META_PAGE_ID]: bc[VAR_RECORD_ROUTE_PAGE_ID],
        [META_PAGE_OBJECT]: bc[VAR_RECORD_PARENT_ID],
        action: bcBtn.actiongate,
        json: {
            data: values,
            master: getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, getMasterValue),
            reloadpageobject: reloadPageObject,
            service: {
                [VAR_RECORD_CV_ACTION]: "I",
                ...reloadPageObject,
            },
        },
        list: false,
        plugin: bcBtn.extraplugingate || bc.extraplugingate,
        query: bcBtn.updatequery || "Modify",
        session: applicationStore.authStore.userInfo.session,
        timeout,
    }).catch((error) => {
        snackbarStore.checkExceptResponse(error, pageStore.route, pageStore.applicationStore);
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

const createLink = (blobURL: string, filename: string, expotType: string) => {
    const tempLink = document.createElement("a");

    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", `${filename || ""}${expotType ? `.${expotType}` : ""}`);

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
