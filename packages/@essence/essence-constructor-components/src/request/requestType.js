// @flow

export type RequestType = {
    query: string,
    action?: string,
    body?: Object,
    session?: string,
    json?: Object,
    pageObject?: string,
    list?: boolean,
    onUploadProgress?: (progressEvent: ProgressEvent) => void,
    plugin?: string,
    gate?: string,
    timeout?: string,
    formData?: FormData,
    method?: string,
    params?: Object,
};
