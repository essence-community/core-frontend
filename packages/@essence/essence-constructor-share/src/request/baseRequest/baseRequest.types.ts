import {META_PAGE_OBJECT} from "../../constants";

export interface IBaseRequest {
    query: string;
    action?: string;
    body?: any;
    session?: string;
    json?: any;
    [META_PAGE_OBJECT]?: string;
    list?: boolean;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
    plugin?: string;
    gate?: string;
    timeout?: string;
    formData?: FormData;
    method?: string;
    params?: any;
}
