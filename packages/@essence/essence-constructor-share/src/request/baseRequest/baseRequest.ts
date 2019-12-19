import {baseAxiosRequest} from "./baseAxiosRequest";
import {IBaseRequest} from "./baseRequest.types";

export const baseRequest = baseAxiosRequest;

export const baseRequestList = async (requestConfig: IBaseRequest): Promise<any> => {
    const res = await baseRequest({...requestConfig, list: true});

    return res;
};
