import {stringify} from "qs";
import axios from "axios";
import {IRequest, IRequestCheckError} from "../types";
import {settingsStore} from "../models";
import {IRecord} from "../types/Base";
import {VAR_SETTING_GATE_URL, META_OUT_RESULT, META_PAGE_OBJECT} from "../constants";
import {ResponseError} from "./error";

const MILLISECOND = 1000;

const checkError = ({responseJSON, query, list}: IRequestCheckError) => {
    let isError = false;

    if (responseJSON.success !== true && responseJSON.success !== "true") {
        isError = true;
    }

    if (list && !Array.isArray(responseJSON.data)) {
        isError = true;
    }

    if (isError) {
        throw new ResponseError("static:63538aa4bcd748349defdf7510fc9c10", responseJSON, query);
    }
};

const parseResponse = ({responseJSON, list}: IRequestCheckError) => {
    const {data} = responseJSON;

    if (list) {
        return data;
    }

    const responseSingleData = Array.isArray(data) ? data[0] : undefined;

    if (responseSingleData && typeof responseSingleData.result === "string") {
        return JSON.parse(responseSingleData.result);
    }

    return responseSingleData;
};

// eslint-disable-next-line max-statements
export const request = async <R = IRecord | IRecord[]>({
    json,
    query,
    action = "dml",
    [META_PAGE_OBJECT]: pageObjectName = "",
    session,
    body,
    list = true,
    plugin,
    timeout = "30",
    gate = settingsStore.settings[VAR_SETTING_GATE_URL],
    method = "POST",
    formData,
    onUploadProgress,
}: IRequest): Promise<R> => {
    const queryParams = {
        action: formData ? "upload" : action,
        plugin,
        query,
    };
    const data = {
        [META_OUT_RESULT]: "",
        [META_PAGE_OBJECT]: pageObjectName.replace(
            // eslint-disable-next-line prefer-named-capture-group, no-useless-escape
            /^.*?[{(]?([0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12})[\)\}]?.*?$/giu,
            "$1",
        ),
        json: json ? JSON.stringify(json) : undefined,
        session,
        ...(body ? body : {}),
    };
    const url = `${gate}?${stringify(formData ? {...queryParams, ...data} : queryParams)}`;
    let responseJSON: any = undefined;

    // fallback to xhr for upload progress
    if (onUploadProgress) {
        const response = await axios({
            data: formData ? formData : stringify(data),
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            },
            method,
            onUploadProgress,
            timeout: parseInt(timeout, 10) * MILLISECOND,
            url: `${gate}?${stringify(formData ? {...queryParams, ...data} : queryParams)}`,
        });

        responseJSON = response.data;
    } else {
        const controller = window.AbortController ? new window.AbortController() : undefined;
        const timeoutId = window.setTimeout(() => controller?.abort(), parseInt(timeout, 10) * MILLISECOND);
        const response = await fetch(url, {
            body: formData ? formData : stringify(data),
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            },
            method,
            signal: controller?.signal,
        });

        clearTimeout(timeoutId);

        responseJSON = await response.json();
    }

    checkError({list, query, responseJSON});

    return parseResponse({list, query, responseJSON});
};
