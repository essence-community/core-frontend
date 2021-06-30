import {History} from "history";
import {VAR_RECORD_CV_LOGIN, VAR_RECORD_CA_ACTIONS} from "../constants";
import {IApplicationModel} from "./Application";

export interface IAuthSession {
    session: string;
    [VAR_RECORD_CV_LOGIN]: string;
    [VAR_RECORD_CA_ACTIONS]: number[];
}

export interface ILoginOptions {
    authValues: Record<string, any>;
    history: History;
    responseOptions?: Partial<IAuthSession>;
    query?: string;
    headers?: Record<string, string>;
}

export interface IAuthModel {
    userInfo: Partial<IAuthSession>;
    applicationStore: IApplicationModel;
    checkAuthAction(history: History, session?: string, connectGuest?: string): Promise<void>;
    loginAction(options: ILoginOptions): Promise<void>;
    successLoginAction(response: IAuthSession, history: History): void;
    changeUserInfo(userInfo: Partial<IAuthSession>): void;
}
