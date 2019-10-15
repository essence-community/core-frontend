export interface IRequest {
    query: string;
    action?: string;
    body?: object;
    session?: string;
    json?: object;
    pageObject?: string;
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
    cvError?: Record<string, string[]>;
    cvStackTrace?: string;
}
