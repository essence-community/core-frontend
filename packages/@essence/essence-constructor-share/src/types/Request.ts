import {META_PAGE_OBJECT} from "../constants";
import {FieldValue} from "./Field";

export interface IRequest {
    query: string;
    action?: string;
    body?: Record<string, FieldValue>;
    session?: string;
    json?: Record<string, FieldValue>;
    [META_PAGE_OBJECT]?: string;
    list?: boolean;
    plugin?: string;
    gate?: string;
    timeout?: string;
    formData?: FormData;
    method?: "POST";
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
    cv_error?: Record<string, string[]>;
    cv_stack_trace?: string;
}
