import {IRequestResponse, IResponseError} from "../types";

export interface IExtraOptionsResponseError {
    extrainfo?: string;
    requestId?: string;
}
export class ResponseError extends Error implements IResponseError {
    public responseError: IRequestResponse;

    public query: string;

    public extrainfo?: string;

    public requestId?: string;

    constructor(
        text: string,
        responseError: IRequestResponse,
        query: string,
        options: IExtraOptionsResponseError = {},
    ) {
        super(text);

        this.responseError = responseError;
        this.query = query;
        this.extrainfo = options.extrainfo;
        this.requestId = options.requestId;
    }
}
