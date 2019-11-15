import {baseRequest} from "../request/baseRequest";
import {IBuilderMode} from "../types";

interface IConfig {
    action?: string;
    mode: IBuilderMode;
    ckPage: string;
    ckPageObject: string;
    ckMain?: null | string;
    clWarning?: number;
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
        ckPage,
        ckPageObject,
        clWarning = 0,
        session,
        ckMain,
        query = "Modify",
        onUploadProgress,
        plugin,
        timeout,
        formData,
        action,
    }: IConfig,
) {
    return baseRequest({
        action,
        formData,
        json: {
            data: values,
            service: {
                ckMain,
                ckPage,
                ckPageObject,
                clWarning,
                cvAction: actionModeMap[mode] || mode,
            },
        },
        onUploadProgress,
        pageObject: ckPageObject,
        plugin,
        query,
        session,
        timeout,
    });
}
