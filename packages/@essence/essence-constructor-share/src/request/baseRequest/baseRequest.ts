import {baseAxiosRequest} from "./baseAxiosRequest";

export interface IBaseRequest {
    query: string;
    action?: string;
    body?: any;
    session?: string;
    json?: any;
    pageObject?: string;
    list?: boolean;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
    plugin?: string;
    gate?: string;
    timeout?: string;
    formData?: FormData;
    method?: string;
    params?: any;
    isCamelCase?: boolean;
}

const baseRequest = baseAxiosRequest;

const baseRequestList = async (requestConfig: IBaseRequest): Promise<any> => {
    const res = await baseRequest({...requestConfig, list: true});

    return res;
};

export {baseRequest, baseRequestList};
