import {IBuilderMode} from "../types";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CK_MAIN,
    VAR_RECORD_CL_WARNING,
    VAR_RECORD_CV_ACTION,
    META_PAGE_OBJECT,
} from "../constants";
import {request} from "./request";

interface IRequestConfig {
    action?: string;
    mode: IBuilderMode;
    master?: Record<string, any>;
    ck_page: string;
    ck_page_object: string;
    ck_main?: null | string;
    cl_warning?: number;
    session: string;
    query?: string;
    plugin?: string;
    timeout?: string;
    formData?: FormData;
}

/* eslint-disable quote-props */
const actionModeMap = {
    "1": "I",
    "2": "U",
    "3": "D",
    "4": "U",
    "6": "I",
};
/* eslint-enable quote-props */

export function requestCore(
    values: object | object[],
    {
        mode,
        master,
        [VAR_RECORD_ROUTE_PAGE_ID]: pageId,
        [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
        [VAR_RECORD_CL_WARNING]: warningStatus = 0,
        session,
        [VAR_RECORD_CK_MAIN]: main,
        query = "Modify",
        plugin,
        timeout,
        formData,
        action,
    }: IRequestConfig,
) {
    return request({
        [META_PAGE_OBJECT]: ckPageObject,
        action,
        formData,
        json: {
            data: values,
            master,
            service: {
                [VAR_RECORD_CK_MAIN]: main,
                [VAR_RECORD_CL_WARNING]: warningStatus,
                [VAR_RECORD_CV_ACTION]: actionModeMap[mode] || mode,
                [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
                [VAR_RECORD_ROUTE_PAGE_ID]: pageId,
            },
        },
        plugin,
        query,
        session,
        timeout,
    });
}
