import axios from "axios";
import {isArray, isString} from "lodash";
import {stringify} from "qs";
import {camelCaseKeysAsync, snakeCaseKeys} from "../../utils";
import {IBaseRequest} from "./baseRequest";

const MILLISEC = 1000;

axios.defaults.timeout = 30000;
axios.defaults.baseURL = "/";

interface ICheckError {
    responseAllData: any;
    query: string;
    responseData: any[];
    list: boolean;
}

interface IParseResponse {
    responseData: any[];
    list: boolean;
}

const checkError = ({responseAllData, query, responseData, list}: ICheckError) => {
    let isError = false;

    if (responseAllData.success !== true && responseAllData.success !== "true") {
        isError = true;
    }

    if (list && !isArray(responseData)) {
        isError = true;
    }

    if (isError) {
        const error = new Error("Ошибка в разпознавании данных");

        // @ts-ignore
        error.query = query;
        // @ts-ignore
        error.responseError = responseAllData;

        throw error;
    }
};

const parseResponse = ({responseData, list}: IParseResponse) => {
    if (list) {
        return responseData;
    }

    const [responseSingleData] = responseData;

    if (responseSingleData && isString(responseSingleData.result)) {
        return JSON.parse(responseSingleData.result);
    }

    return responseSingleData;
};

export const baseAxiosRequest = async ({
    json,
    query = "",
    action = "dml",
    pageObject = "",
    session,
    body,
    list,
    onUploadProgress,
    plugin,
    timeout = "30",
    gate,
    method = "POST",
    formData,
    params,
}: IBaseRequest) => {
    const queryParams = {
        action: formData ? "upload" : action,
        plugin,
        query,
    };
    const data = {
        json: json ? JSON.stringify(snakeCaseKeys(json)) : undefined,
        // eslint-disable-next-line @typescript-eslint/camelcase
        out_result: "",
        // eslint-disable-next-line @typescript-eslint/camelcase, require-unicode-regexp, prefer-named-capture-group
        page_object: pageObject.replace(/^.*?[{(]?([0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12})[)}]?.*?$/gi, "$1"),
        session,
        ...snakeCaseKeys(body),
    };

    // @ts-ignore
    const response = await axios({
        data: formData ? formData : stringify(data),
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        method,
        onUploadProgress,
        params,
        timeout: parseInt(timeout, 10) * MILLISEC,
        url: `${gate}?${stringify(formData ? {...queryParams, ...data} : queryParams)}`,
    });

    const responseAllData: any = await camelCaseKeysAsync(response.data);
    const responseData = responseAllData.data;

    checkError({list, query, responseAllData, responseData});

    return parseResponse({list, responseData});
};
