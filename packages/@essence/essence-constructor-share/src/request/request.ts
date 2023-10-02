import {stringify} from "qs";
import axios from "axios";
import {IRequest, IRequestCheckError, IRequestCheckSuccessResult} from "../types";
import {settingsStore} from "../models/SettingsModel";
import {IRecord} from "../types/Base";
import {
    VAR_SETTING_GATE_URL,
    META_OUT_RESULT,
    META_PAGE_OBJECT,
    VAR_ERROR_CODE,
    VAR_ERROR_TEXT,
    VAR_ERROR_ID,
    loggerRoot,
    META_PAGE_ID,
    MILLISECOND,
} from "../constants";
import {ResponseError} from "./error";
import {checkInterceptor} from "./interceptors";

const logger = loggerRoot.extend("Request");

const checkError = ({responseJSON, query, list}: IRequestCheckError) => {
    let isError = false;

    if (responseJSON.success !== true && responseJSON.success !== "true") {
        isError = true;
    }

    if (
        list &&
        (responseJSON.success === true || responseJSON.success === "true") &&
        !Array.isArray(responseJSON.data)
    ) {
        isError = true;
    }

    if (isError) {
        throw new ResponseError("static:63538aa4bcd748349defdf7510fc9c10", responseJSON, query, {
            requestId: responseJSON.metaData?.requestId,
        });
    }
};

const parseResponse = ({responseJSON, list}: IRequestCheckSuccessResult) => {
    const {data} = responseJSON;

    if (list) {
        return data;
    }

    const responseSingleData = Array.isArray(data) ? data[0] : undefined;

    if (responseSingleData && typeof responseSingleData === "object" && typeof responseSingleData.result === "string") {
        return JSON.parse(responseSingleData.result);
    }

    return responseSingleData;
};

// eslint-disable-next-line max-statements
export const request = async <R = IRecord | IRecord[]>(requestParams: IRequest): Promise<R> => {
    const {
        json,
        query,
        action = query === "Modify" || requestParams.mode === "8"
            ? requestParams.formData
                ? "upload"
                : "dml"
            : undefined,
        [META_PAGE_ID]: pageIdName = "",
        [META_PAGE_OBJECT]: pageObjectName = "",
        session,
        body,
        list = true,
        headers = {},
        plugin,
        timeout = 30,
        gate = settingsStore.settings[VAR_SETTING_GATE_URL],
        method = "POST",
        formData,
        onUploadProgress,
        registerAbortCallback,
    } = requestParams;
    const queryParams = {
        action,
        plugin,
        query,
    };
    const data = {
        [META_OUT_RESULT]: "",
        [META_PAGE_ID]: pageIdName,
        [META_PAGE_OBJECT]: pageObjectName.replace(
            // eslint-disable-next-line prefer-named-capture-group, no-useless-escape
            /^.*?[{(]?([0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12})[\)\}]?.*?$/giu,
            "$1",
        ),
        json: json ? JSON.stringify(json) : undefined,
        session,
        ...(body ? body : {}),
    };

    if (formData) {
        Object.entries(data).forEach(([key, val]) => {
            formData.append(key, val || "");
        });
    }
    const url = `${gate}?${stringify(queryParams)}`;
    let responseJSON: any = undefined;

    // fallback to xhr for upload progress
    if (onUploadProgress) {
        const response = await axios({
            cancelToken: registerAbortCallback ? new axios.CancelToken(registerAbortCallback) : undefined,
            data: formData ? formData : stringify(data),
            headers: {
                ...(headers || {}),
                "Content-type": formData ? undefined : "application/x-www-form-urlencoded",
            },
            method,
            onUploadProgress,
            timeout: timeout * MILLISECOND,
            url,
            validateStatus: () => true,
        });

        await checkInterceptor(requestParams, {
            data: response.data,
            headers: response.headers,
            status: response.status,
        });

        responseJSON = response.data;
    } else {
        const controller = window.AbortController ? new window.AbortController() : undefined;
        const timeoutId = window.setTimeout(() => controller?.abort(), timeout * MILLISECOND);

        if (registerAbortCallback) {
            registerAbortCallback(controller?.abort);
        }
        const response = await fetch(url, {
            body: formData ? formData : stringify(data),
            ...(formData
                ? {...(headers && Object.keys(headers).length ? {headers} : {})}
                : {
                      headers: {
                          ...(headers || {}),
                          "Content-type": "application/x-www-form-urlencoded",
                      },
                  }),
            method,
            signal: controller?.signal,
        });

        clearTimeout(timeoutId);

        const res = await response.text();

        await checkInterceptor(requestParams, {
            data: res,
            headers: response.headers,
            status: response.status,
        });

        try {
            responseJSON = JSON.parse(res);
        } catch (e) {
            logger(`Parse Error data: \n ${res}`, e);
            responseJSON = {
                [VAR_ERROR_CODE]: 500,
                [VAR_ERROR_ID]: "Parse Error data",
                [VAR_ERROR_TEXT]: "Parse Error data",
                metaData: {},
                success: false,
            };
        }
    }

    checkError({list, query, responseJSON});

    return parseResponse({list, query, responseJSON});
};
