/* eslint-disable filenames/match-exported */
import {IRequest} from "../../types";
import {DefaultCheck} from "./DefaultCheck";
import {IInterceptor, IResponse} from "./Interceptor.types";

export const interceptors: IInterceptor[] = [DefaultCheck];
export const checkInterceptor = (request: IRequest, response: IResponse): Promise<void> =>
    interceptors
        .slice(1)
        .reduce((res, fn) => res.then(() => fn(request, response)), interceptors[0](request, response));
export default interceptors;
