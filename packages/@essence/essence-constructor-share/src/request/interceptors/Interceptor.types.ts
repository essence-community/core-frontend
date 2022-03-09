import {IRequest} from "../../types";

export interface IResponse {
    data: any;
    status: number;
    headers: Record<string, string | string[]> | Headers;
}

export type IInterceptor = (request: IRequest, response: IResponse) => Promise<void>;
