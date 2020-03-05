import {observable, action} from "mobx";
import {History} from "history";
import {
    getFromStore,
    saveToStore,
    IAuthModel,
    IApplicationModel,
    loggerRoot,
} from "@essence-community/constructor-share";
import {snackbarStore, settingsStore} from "@essence-community/constructor-share/models";
import {request} from "@essence-community/constructor-share/request";
import {VAR_SETTING_AUTO_CONNECT_GUEST, VAR_CONNECT_GUEST} from "@essence-community/constructor-share/constants";
import {IAuthSession} from "./AuthModel.types";

const logger = loggerRoot.extend("AuthModel");

export class AuthModel implements IAuthModel {
    @observable userInfo = getFromStore<Partial<IAuthSession>>("auth", {}) || {};

    // eslint-disable-next-line no-useless-constructor
    constructor(public applicationStore: IApplicationModel) {}

    checkAuthAction = action(
        "checkAuthAction",
        (
            history: History,
            session?: string,
            connectGuest: string = settingsStore.settings[VAR_SETTING_AUTO_CONNECT_GUEST],
        ) =>
            request({
                action: "sql",
                body: {
                    [VAR_CONNECT_GUEST]: connectGuest,
                },
                query: "GetSessionData",
                session,
            })
                // @ts-ignore
                .then((response: IAuthSession) => {
                    // @ts-ignore
                    if (response && snackbarStore.checkValidLoginResponse(response)) {
                        this.successLoginAction(response, history);
                    }
                })
                .catch((err: any) => {
                    logger(err);
                }),
    );

    loginAction = action(
        "loginAction",
        (authValues: Record<string, string>, history: History, responseOptions: Partial<IAuthSession> = {}) =>
            request({
                action: "auth",
                body: authValues,
                query: "Login",
            })
                .then((response) => {
                    const resp = Array.isArray(response) ? response : [response];

                    if (resp && snackbarStore.checkValidLoginResponse(resp)) {
                        this.successLoginAction(
                            {
                                // @ts-ignore
                                ...(resp as IAuthSession),
                                ...responseOptions,
                            },
                            history,
                        );
                    }
                })
                .catch((error: any) => {
                    snackbarStore.checkExceptResponse(error, undefined, this.applicationStore);
                    this.applicationStore.logoutAction();
                    this.userInfo = {};
                }),
    );

    successLoginAction = action("successLoginAction", (response: IAuthSession, history: History) => {
        const {state: {backUrl = "/"} = {}} = history.location;

        this.userInfo = response;
        this.applicationStore.setSesssionAction(response);
        // TODO: сделать проверку на bc, что бы не сохранять пользователя при репортах
        saveToStore("auth", response);
        history.push(backUrl);
    });

    changeUserInfo = action("changeUserInfo", (userInfo: Partial<IAuthSession>) => {
        this.userInfo = {
            ...this.userInfo,
            ...userInfo,
        };
        saveToStore("auth", this.userInfo);
    });

    logoutAction = action("logoutAction", () => {
        return request({
            action: "auth",
            query: "Logout",
            session: this.userInfo.session,
        })
            .then(() => {
                this.userInfo = {};
            })
            .catch((err) => {
                logger(err);
                this.userInfo = {};
            });
    });
}
