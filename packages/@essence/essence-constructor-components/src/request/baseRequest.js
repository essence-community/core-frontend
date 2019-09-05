// @flow
import {loggerRoot} from "../constants";
import {type RequestType} from "./requestType";

const logger = loggerRoot.extend("baseRequest");

// eslint-disable-next-line require-await
let sendRequest = async ({list}: RequestType): Promise<any> => {
    logger("!!Requst not implemented!!!");

    return list ? [] : {};
};

if (process.env.REACT_APP_REQUEST === "MOCK" || process.env.STORYBOOK_REQUEST === "MOCK") {
    // eslint-disable-next-line global-require
    sendRequest = require("./baseMockRequest").default;
}

if (process.env.REACT_APP_REQUEST === "GATE" || process.env.STORYBOOK_REQUEST === "GATE") {
    // eslint-disable-next-line global-require
    sendRequest = require("./baseAxiosRequest").default;
} else {
    // eslint-disable-next-line global-require
    sendRequest = require("./baseMockRequest").default;
}

const sendRequestList = async (requestConfig: RequestType): Promise<any> => {
    const res = await sendRequest({...requestConfig, list: true});

    return res;
};

export {sendRequest, sendRequestList};
