import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CK_MAIN,
    VAR_RECORD_CL_WARNING,
    VAR_RECORD_CV_ACTION,
    META_PAGE_OBJECT,
} from "../constants";
import {baseRequest} from "../request/baseRequest";
import {IBuilderMode} from "../types";

interface IConfig {
    action?: string;
    mode: IBuilderMode;
    ck_page: string;
    ck_page_object: string;
    ck_main?: null | string;
    cl_warning?: number;
    session: string;
    query?: string;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
    plugin?: string;
    timeout?: string;
    formData?: FormData;
}

const actionModeMap = {
    1: "I",
    2: "U",
    3: "D",
    4: "U",
    6: "I",
    8: "I",
};

export function apiSaveAction(
    values: any,
    {
        mode,
        [VAR_RECORD_ROUTE_PAGE_ID]: pageId,
        [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
        [VAR_RECORD_CL_WARNING]: warningStatus = 0,
        session,
        [VAR_RECORD_CK_MAIN]: main,
        query = "Modify",
        onUploadProgress,
        plugin,
        timeout,
        formData,
        action,
    }: IConfig,
) {
    return baseRequest({
        [META_PAGE_OBJECT]: ckPageObject,
        action,
        formData,
        json: {
            data: values,
            service: {
                [VAR_RECORD_CK_MAIN]: main,
                [VAR_RECORD_CL_WARNING]: warningStatus,
                [VAR_RECORD_CV_ACTION]: actionModeMap[mode] || mode,
                [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
                [VAR_RECORD_ROUTE_PAGE_ID]: pageId,
            },
        },
        onUploadProgress,
        plugin,
        query,
        session,
        timeout,
    });
}
