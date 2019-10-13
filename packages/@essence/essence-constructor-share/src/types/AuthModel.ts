import {History} from "history";
import {IApplicationModel} from "./Application";

export interface IAuthSession {
    session: string;
    cvLogin: string;
    caActions: number[];
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
