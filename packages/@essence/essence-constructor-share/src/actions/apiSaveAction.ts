import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CK_MAIN,
    VAR_RECORD_CL_WARNING,
    VAR_RECORD_CV_ACTION,
    META_PAGE_OBJECT,
} from "../constants";
import {baseRequest} from "../request/baseRequest";
import {IBuilderMode, FieldValue} from "../types";

interface IConfig {
    [VAR_RECORD_ROUTE_PAGE_ID]: string;
    [VAR_RECORD_PAGE_OBJECT_ID]: string;
    [VAR_RECORD_CK_MAIN]: FieldValue;
    [VAR_RECORD_CL_WARNING]: number | undefined;
    action?: string;
    mode: IBuilderMode;
    session: string;
    master?: Record<string, FieldValue>;
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
    7: "I",
    8: "I",
};

export function apiSaveAction(
    values: any,
    {
        master,
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
            master,
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
