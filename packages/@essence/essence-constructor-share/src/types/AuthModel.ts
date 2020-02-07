import {History} from "history";
import {VAR_RECORD_CV_LOGIN, VAR_RECORD_CA_ACTIONS} from "../constants";
import {IApplicationModel} from "./Application";

export interface IAuthSession {
    session: string;
    [VAR_RECORD_CV_LOGIN]: string;
    [VAR_RECORD_CA_ACTIONS]: number[];
}

export interface IAuthModel {
    userInfo: Partial<IAuthSession>;
    applicationStore: IApplicationModel;
    checkAuthAction(history: History): Promise<void>;
    loginAction(
        authValues: Record<string, string>,
        history: History,
        responseOptions?: Partial<IAuthSession>,
    ): Promise<void>;
    successLoginAction(response: IAuthSession, history: History): void;
    changeUserInfo(userInfo: Partial<IAuthSession>): void;
}
