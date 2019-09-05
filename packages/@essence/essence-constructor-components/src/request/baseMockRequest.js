/* eslint-disable global-require */
// @flow
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
import isFunction from "lodash/isFunction";
import comboRecords from "../../mocks/data/comboRecords.json";
import {sleep} from "../utils/base";
import {MIN_REQUEST_TIME, MAX_REQUEST_TIME} from "../utils/test";
import {loggerRoot, BASE_URL} from "../constants";
import {type RequestType} from "./requestType";
import baseAxiosRequest from "./baseAxiosRequest";

const pageObjectsCkId = {
    C143C2FABD384D6189681CF05A965E3E: 322,
};
const logger = loggerRoot.extend("baseMockRequest");

function getModifyMock({pageObject}: RequestType) {
    return {
        ckId: pageObject && pageObjectsCkId[pageObject],
    };
}

const mocks = {
    DIdentityDocType: comboRecords,
    GetMetamodelPage: (requestConfig: RequestType) => {
        try {
            // $FlowFixMe
            return require(`../../mocks/page/${requestConfig.json.filter.ckPage}.json`);
        } catch (exeption) {
            return [];
        }
    },
    Modify: getModifyMock,
};

const getMock = (requestConfig: RequestType) => {
    const {query} = requestConfig;

    try {
        // $FlowFixMe
        return require(`../../mocks/data/${query}.json`);
    } catch (exeption) {
        const mock = mocks[query];

        if (typeof mock === "function") {
            return mock(requestConfig);
        }

        return mock;
    }
};

// eslint-disable-next-line max-statements
const baseMockRequest = async (requestConfig: RequestType): Promise<any> => {
    const {list, gate = BASE_URL} = requestConfig;
    const mock = getMock(requestConfig);
    // eslint-disable-next-line init-declarations
    let data;

    if (mock) {
        data = isFunction(mock) ? mock(requestConfig) : mock;
    } else if (gate === BASE_URL) {
        data = list ? [] : {};
    } else {
        return baseAxiosRequest(requestConfig);
    }

    logger("requestConfig", requestConfig);
    logger("data:", data);

    await sleep(Math.random() * (MAX_REQUEST_TIME - MIN_REQUEST_TIME) + MIN_REQUEST_TIME);

    return camelCaseKeys(data);
};

export default baseMockRequest;
