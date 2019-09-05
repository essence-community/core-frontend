import {IBuilderMode} from "../types";
import {request} from "./request";

interface IRequestConfig {
    action?: string;
    mode: IBuilderMode;
    ckPage: string;
    ckPageObject: string;
    ckMain?: null | string;
    clWarning?: number;
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
        ckPage,
        ckPageObject,
        clWarning = 0,
        session,
        ckMain,
        query = "Modify",
        plugin,
        timeout,
        formData,
        action,
    }: IRequestConfig,
) {
    return request({
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
        pageObject: ckPageObject,
        plugin,
        query,
        session,
        timeout,
    });
}
