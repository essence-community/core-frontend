import {IRequestResponse, IResponseError} from "../types";

export class ResponseError extends Error implements IResponseError {
    public responseError: IRequestResponse;
    public query: string;
        
    constructor(text: string, responseError: IRequestResponse, query: string) {
        super(text);

        this.responseError = responseError;
        this.query = query;
    }
}
