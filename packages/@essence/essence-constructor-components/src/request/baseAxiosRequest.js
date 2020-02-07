// @flow
import axios from "axios";
import {stringify} from "qs";
import isString from "lodash/isString";
import isArray from "lodash/isArray";
import {i18next} from "@essence-community/constructor-share/utils";
import {META_OUT_RESULT, META_PAGE_OBJECT} from "@essence-community/constructor-share/constants";
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
        // TODO: shoud be messages in build
        const error = new Error(i18next.t("static:63538aa4bcd748349defdf7510fc9c10", "Ошибка в разпознавании данных"));

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

// eslint-disable-next-line max-lines-per-function
const baseAxiosRequest = async ({
    json,
    query = "",
    action = "dml",
    [META_PAGE_OBJECT]: pageObjectName = "",
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
        [META_OUT_RESULT]: "",
        [META_PAGE_OBJECT]: pageObjectName.replace(
            // eslint-disable-next-line prefer-named-capture-group
            /^.*?[{(]?([0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12})[)}]?.*?$/giu,
            "$1",
        ),
        session,
        ...body,
    };

    if (formData && json) {
        formData.append("json", JSON.stringify(json));
    } else if (json) {
        data.json = JSON.stringify(json);
    }

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

    const responseAllData = response.data;
    const responseData = responseAllData.data;

    checkError({list, query, responseAllData, responseData});

    return parseResponse({list, responseAllData, responseData});
};

export default baseAxiosRequest;
