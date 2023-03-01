import type {History} from "history";
import {IApplicationModel} from "./Application";
import {IRecord} from "./Builder";

export interface IAuthSession {
    session: string;
    cv_login: string;
    ca_actions: number[];
}

export interface ILoginOptions {
    authValues: IRecord;
    history: History;
    responseOptions?: Partial<IAuthSession>;
    query?: string;
    headers?: Record<string, string>;
}

export interface IAuthModel {
    userInfo: Partial<IAuthSession>;
    applicationStore: IApplicationModel;
    checkAuthAction(history: History, session?: string, connectGuest?: string, isNotRedirect?: boolean): Promise<void>;
    loginAction(options: ILoginOptions): Promise<void>;
    successLoginAction(response: IAuthSession, history: History): void;
    changeUserInfo(userInfo: Partial<IAuthSession>): void;
}
