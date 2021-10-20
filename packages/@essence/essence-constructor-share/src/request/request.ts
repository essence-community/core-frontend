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
} from "../constants";
import {IRequestFaultResponse} from "../types/Request";
import {ResponseError} from "./error";

const MILLISECOND = 1000;
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
        throw new ResponseError("static:63538aa4bcd748349defdf7510fc9c10", responseJSON, query);
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

const checkStatusError = (status: number, query: string, body: any) => {
    let json = typeof body === "object" ? body : {};

    if (typeof body === "string" && body.startsWith("{") && body.endsWith("}")) {
        try {
            json = JSON.parse(body);
        } catch (e) {
            logger(`Parse Error data: \n ${body}`, e);
        }
    }
    const responseJSON: IRequestFaultResponse = {
        [VAR_ERROR_CODE]: json[VAR_ERROR_CODE] || 500,
        [VAR_ERROR_ID]: json[VAR_ERROR_ID] || "",
        [VAR_ERROR_TEXT]:
            json[VAR_ERROR_TEXT] || `${typeof body === "object" || Array.isArray(body) ? JSON.stringify(body) : body}`,
        success: false,
    };

    logger(`Reponse status: ${status}, data: \n ${body}`);

    if (status === 401) {
        responseJSON[VAR_ERROR_CODE] = 201;
        throw new ResponseError("static:63538aa4bcd748349defdf7510fc9c10", responseJSON, query);
    }
    if (status === 403) {
        responseJSON[VAR_ERROR_CODE] = 403;
        throw new ResponseError("static:63538aa4bcd748349defdf7510fc9c10", responseJSON, query);
    }
    throw new ResponseError("static:63538aa4bcd748349defdf7510fc9c10", responseJSON, query);
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
    headers = {},
    mode,
    plugin,
    timeout = 30,
    gate = settingsStore.settings[VAR_SETTING_GATE_URL],
    method = "POST",
    formData,
    onUploadProgress,
}: IRequest): Promise<R> => {
    const queryParams = {
        action: query === "Modify" || mode === "8" ? (formData ? "upload" : action) : undefined,
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
            data: formData ? formData : stringify(data),
            headers: {
                ...headers,
                "Content-type": formData ? undefined : "application/x-www-form-urlencoded",
            },
            method,
            onUploadProgress,
            timeout: timeout * MILLISECOND,
            url,
            validateStatus: () => true,
        });

        if (response.status > 299 || response.status < 200) {
            checkStatusError(response.status, query, response.data);
        }
        responseJSON = response.data;
    } else {
        const controller = window.AbortController ? new window.AbortController() : undefined;
        const timeoutId = window.setTimeout(() => controller?.abort(), timeout * MILLISECOND);
        const response = await fetch(url, {
            body: formData ? formData : stringify(data),
            ...(formData
                ? {...(Object.keys(headers).length ? {headers} : {})}
                : {
                      headers: {
                          ...headers,
                          "Content-type": "application/x-www-form-urlencoded",
                      },
                  }),
            method,
            signal: controller?.signal,
        });

        clearTimeout(timeoutId);

        if (response.status > 299 || response.status < 200) {
            checkStatusError(response.status, query, await response.text());
        }

        responseJSON = await response.json();
    }

    checkError({list, query, responseJSON});

    return parseResponse({list, query, responseJSON});
};
