import {extendObservable, action} from "mobx";
import {History} from "history";
import {
    getFromStore,
    saveToStore,
    request,
    noop,
    snackbarStore,
    IAuthModel,
    IApplicationModel,
} from "@essence/essence-constructor-share";
import {IAuthSession} from "./AuthModel.types";

export class AuthModel implements IAuthModel {
    userInfo: Partial<IAuthSession>;

    applicationStore: IApplicationModel;

    constructor(applicationStore: IApplicationModel) {
        this.applicationStore = applicationStore;

        extendObservable(this, {
            userInfo: getFromStore("auth", {}),
        });
    }

    checkAuthAction = action("checkAuthAction", (history: History) =>
        request({
            action: "sql",
            query: "GetSessionData",
        })
            .then((response: IAuthSession) => {
                if (response && snackbarStore.checkValidLoginResponse(response)) {
                    this.successLoginAction(response, history);
                }
            })
            .catch(noop),
    );

    loginAction = action(
        "loginAction",
        (authValues: Record<string, string>, history: History, responseOptions: Partial<IAuthSession> = {}) =>
            request({
                action: "auth",
                body: authValues,
                query: "Login",
            })
                .then((response: IAuthSession) => {
                    if (snackbarStore.checkValidLoginResponse(response)) {
                        this.successLoginAction(
                            {
                                ...response,
                                ...responseOptions,
                            },
                            history,
                        );
                    }
                })
                .catch((error) => {
                    snackbarStore.checkExceptResponse(error);
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
}
