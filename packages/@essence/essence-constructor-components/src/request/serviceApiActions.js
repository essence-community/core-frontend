// @flow
import isArray from "lodash/isArray";
import {type BuilderModeType} from "../BuilderType";
import {sendRequest} from "./baseRequest";

type ConfigType = {|
    action?: string,
    mode: BuilderModeType,
    ckPage: string,
    ckPageObject: string,
    ckMain?: null | string,
    clWarning?: number,
    session: string,
    query?: string,
    onUploadProgress?: (progressEvent: ProgressEvent) => void,
    plugin?: string,
    timeout?: string,
    formData?: FormData,
|};

/* eslint-disable quote-props */
const actionModeMap = {
    "1": "I",
    "2": "U",
    "3": "D",
    "4": "U",
    "6": "I",
    "8": "I",
};
/* eslint-enable quote-props */

// eslint-disable-next-line no-unused-vars
function getValues(values: Object | Array<*>, mode: BuilderModeType) {
    if (!isArray(values) && (mode === "6" || mode === "1")) {
        return {
            ...values,
            ckId: null,
        };
    }

    return values;
}

export function apiSaveAction(
    values: Object | Array<*>,
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
    }: ConfigType,
) {
    return sendRequest({
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
