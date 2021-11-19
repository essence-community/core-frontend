import {
    META_PAGE_OBJECT,
    VAR_RECORD_RES_ERROR,
    VAR_RECORD_RES_FORM_ERROR,
    VAR_RECORD_RES_STACK_TRACE,
    VAR_RECORD_ID,
    VAR_RESULT_MESSAGE,
    VAR_ERROR_CODE,
    VAR_ERROR_TEXT,
    VAR_ERROR_ID,
} from "../constants";
import {FieldValue, IBuilderMode, ICkId} from "./Base";
import {MessageTypeStrings} from "./SnackbarModel";

export interface IRequest {
    query: string;
    action?: string;
    body?: Record<string, FieldValue>;
    session?: string;
    json?: Record<string, FieldValue>;
    [META_PAGE_OBJECT]?: string;
    list?: boolean;
    mode?: IBuilderMode;
    plugin?: string;
    gate?: string;
    timeout?: number;
    formData?: FormData;
    method?: "POST";
    headers?: Record<string, string>;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
}

export interface IRequestData {
    result?: string;
}

export interface IRequestBaseResponse {
    success: boolean | "true" | "false";
    metaData?: Record<string, any>;
}

export interface IRequestSuccessResponse extends IRequestBaseResponse {
    success: true | "true";
    data: IRequestData | IRequestData[];
}

export interface IRequestFaultResponse extends IRequestBaseResponse {
    success: false | "false";
    [VAR_ERROR_CODE]: number | string;
    [VAR_ERROR_ID]: string;
    [VAR_ERROR_TEXT]: string;
}

export type IRequestResponse = IRequestSuccessResponse | IRequestFaultResponse;

export interface IRequestCheckError {
    responseJSON: IRequestResponse;
    query: string;
    list: boolean;
}

export interface IRequestCheckSuccessResult {
    responseJSON: IRequestSuccessResponse;
    query: string;
    list: boolean;
}

export interface IResponseError extends Error {
    responseError: IRequestResponse;
    query: string;
}

export interface IResponse {
    [VAR_RECORD_ID]?: null | ICkId;
    [VAR_RECORD_RES_ERROR]?: Record<string, string[]>;
    [VAR_RECORD_RES_FORM_ERROR]?: Record<string, Record<string, string[]>>;
    [VAR_RECORD_RES_STACK_TRACE]?: string;
    [VAR_RESULT_MESSAGE]?: Record<MessageTypeStrings, string[][]>;
}
