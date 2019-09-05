// @flow
import {stringify} from "qs";
import snakeCaseKeys from "snakecase-keys";
import {IRequest, IRequestCheckError} from "../types";
import {ResponseError} from "./error";

// tslint:disable-next-line:no-var-requires
const camelcaseKeys = require("camelcase-keys");

const MILLISECOND: number = 1000;

const checkError = ({response, query, list}: IRequestCheckError) => {
    let isError = false;

    if (response.success !== true && response.success !== "true") {
        isError = true;
    }

    if (list && !Array.isArray(response.data)) {
        isError = true;
    }

    if (isError) {
        throw new ResponseError("Ошибка в распознавании данных", response, query);
    }
};

const parseResponse = ({response, list}: IRequestCheckError) => {
    const {data} = response;

    if (list) {
        return data;
    }

    const responseSingleData = Array.isArray(data) ? data[0] : undefined;

    if (responseSingleData && typeof responseSingleData.result === "string") {
        return JSON.parse(responseSingleData.result);
    }

    return responseSingleData;
};

export const request = ({
    json,
    query = "",
    action = "dml",
    pageObject = "",
    session,
    body,
    list = true,
    plugin,
    timeout = "30",
    gate,
    formData,
}: IRequest): Promise<object | object[]> => {
    const queryParams = {
        action,
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
        ...(body ? snakeCaseKeys(body) : {}),
    };
    const url = `${gate}?${stringify(formData ? {...queryParams, ...data} : queryParams)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), parseInt(timeout, 10) * MILLISECOND);

    return fetch(url, {
        body: formData ? formData : stringify(data),
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        method: "POST",
    })
        .then((res) => {
            clearTimeout(timeoutId);

            return res.json();
        })
        .then((res) => {
            const response = {
                data: camelcaseKeys(res.data),
                metaData: res.metaData,
                success: res.success,
            };

            checkError({list, query, response});

            return parseResponse({list, query, response});
        });
};
