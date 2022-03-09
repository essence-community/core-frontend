import {loggerRoot, VAR_ERROR_CODE, VAR_ERROR_ID, VAR_ERROR_TEXT} from "../../constants";
import {IRequest, IRequestFaultResponse} from "../../types";
import {ResponseError} from "../error";
import {IResponse} from "./Interceptor.types";

const logger = loggerRoot.extend("DefaultCheck");

export const DefaultCheck = async (request: IRequest, response: IResponse) => {
    let json = typeof response.data === "object" ? response.data : {};

    if (typeof response.data === "string" && response.data.startsWith("{") && response.data.endsWith("}")) {
        try {
            json = JSON.parse(response.data);
        } catch (e) {
            logger(`Parse Error data: \n ${response.data}`, e);
        }
    }
    const responseJSON: IRequestFaultResponse = {
        [VAR_ERROR_CODE]: json[VAR_ERROR_CODE] || 500,
        [VAR_ERROR_ID]: json[VAR_ERROR_ID] || "",
        [VAR_ERROR_TEXT]: json[VAR_ERROR_TEXT] || "",
        metaData: json.metaData,
        success: false,
    };

    logger(`Reponse status: ${status}, data: \n ${response.data}`);

    if (response.status === 401) {
        responseJSON[VAR_ERROR_CODE] = 201;
        throw new ResponseError("static:63538aa4bcd748349defdf7510fc9c10", responseJSON, request.query, {
            extrainfo: `${
                typeof response.data === "object" || Array.isArray(response.data)
                    ? JSON.stringify(response.data)
                    : response.data
            }`,
            requestId: responseJSON.metaData?.requestId,
        });
    }
    if (response.status === 403) {
        responseJSON[VAR_ERROR_CODE] = 403;
        throw new ResponseError("static:63538aa4bcd748349defdf7510fc9c10", responseJSON, request.query, {
            extrainfo: `${
                typeof response.data === "object" || Array.isArray(response.data)
                    ? JSON.stringify(response.data)
                    : response.data
            }`,
            requestId: responseJSON.metaData?.requestId,
        });
    }
    if (response.status > 299 || response.status < 200) {
        throw new ResponseError("static:63538aa4bcd748349defdf7510fc9c10", responseJSON, request.query, {
            extrainfo: `${
                typeof response.data === "object" || Array.isArray(response.data)
                    ? JSON.stringify(response.data)
                    : response.data
            }`,
            requestId: responseJSON.metaData?.requestId,
        });
    }
};
