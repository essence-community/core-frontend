// @flow
import axios from "axios";
import {stringify} from "qs";
import isString from "lodash/isString";
import isArray from "lodash/isArray";
import {snakeCaseKeys, camelCaseKeysAsync} from "@essence/essence-constructor-share/utils";
import {BASE_URL} from "../constants";
import {type RequestType} from "./requestType";

const MILLISEC = 1000;

axios.defaults.timeout = 30000;
axios.defaults.baseURL = "/";

const checkError = ({responseAllData, query, responseData, list}) => {
    let isError = false;

    if (responseAllData.success !== true && responseAllData.success !== "true") {
        isError = true;
    }

    if (list && !isArray(responseData)) {
        isError = true;
    }

    if (isError) {
        const error = new Error("Ошибка в разпознавании данных");

        // $FlowFixMe
        error.query = query;
        // $FlowFixMe
        error.responseError = responseAllData;

        throw error;
    }
};

const parseResponse = ({responseData, list}) => {
    if (list) {
        return responseData;
    }

    const [responseSingleData] = responseData;

    if (responseSingleData && isString(responseSingleData.result)) {
        return JSON.parse(responseSingleData.result);
    }

    return responseSingleData;
};

const baseAxiosRequest = async ({
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
    gate = BASE_URL,
    method = "POST",
    formData,
    params,
}: RequestType) => {
    const queryParams = {
        action: formData ? "upload" : action,
        plugin,
        query,
    };
    const data = {
        json: json ? JSON.stringify(snakeCaseKeys(json)) : undefined,
        // eslint-disable-next-line camelcase
        out_result: "",
        // eslint-disable-next-line camelcase
        page_object: pageObject.replace(/^.*?[{(]?([0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12})[)}]?.*?$/gi, "$1"),
        session,
        ...snakeCaseKeys(body),
    };

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

    const responseAllData = await camelCaseKeysAsync(response.data);
    const responseData = responseAllData.data;

    checkError({list, query, responseAllData, responseData});

    return parseResponse({list, responseAllData, responseData});
};

export default baseAxiosRequest;
