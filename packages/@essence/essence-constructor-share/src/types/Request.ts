import {
    META_PAGE_OBJECT,
    VAR_RECORD_RES_ERROR,
    VAR_RECORD_RES_FORM_ERROR,
    VAR_RECORD_RES_STACK_TRACE,
    VAR_RECORD_ID,
    VAR_RESULT_MESSAGE,
} from "../constants";
import {FieldValue, IBuilderMode, ICkId} from "./Base";
import {SnackbarStatus} from "./SnackbarModel";

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

export interface IRequestResponse {
    success: boolean | string;
    data: IRequestData | IRequestData[];
}

export interface IRequestCheckError {
    responseJSON: IRequestResponse;
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
    [VAR_RESULT_MESSAGE]?: Record<SnackbarStatus, string[][]>;
}
