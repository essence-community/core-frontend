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
import {
    VAR_SETTING_AUTO_CONNECT_GUEST,
    VAR_CONNECT_GUEST,
    VAR_RECORD_CV_LOGIN,
    VAR_RECORD_CA_ACTIONS,
} from "@essence-community/constructor-share/constants";
import {IRecord} from "@essence-community/constructor-share/types";
import {IAuthSession} from "./AuthModel.types";

const logger = loggerRoot.extend("AuthModel");

const DEAULT_USER_INFO: IAuthSession = {
    [VAR_RECORD_CA_ACTIONS]: [],
    [VAR_RECORD_CV_LOGIN]: "",
    session: "",
};

export class AuthModel implements IAuthModel {
    @observable userInfo = getFromStore<IAuthSession>("auth") || DEAULT_USER_INFO;

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
                list: false,
                query: "GetSessionData",
                session,
            })
                .then((response: IAuthSession) => {
                    if (response && snackbarStore.checkValidLoginResponse(response)) {
                        this.successLoginAction(response, history);
                    }
                })
                .catch((err: Error) => {
                    logger(err);
                }),
    );

    loginAction = action(
        "loginAction",
        (authValues: Record<string, string>, history: History, responseOptions: Partial<IAuthSession> = {}) =>
            request({
                action: "auth",
                body: authValues,
                list: false,
                query: "Login",
            })
                .then((response) => {
                    if (response && snackbarStore.checkValidLoginResponse(response as IRecord)) {
                        this.successLoginAction(
                            {
                                ...(response as IAuthSession),
                                ...responseOptions,
                            },
                            history,
                        );
                    }
                })
                .catch((error: Error) => {
                    snackbarStore.checkExceptResponse(error, undefined, this.applicationStore);
                    this.applicationStore.logoutAction();
                    this.userInfo = DEAULT_USER_INFO;
                }),
    );

    successLoginAction = action("successLoginAction", (response: IAuthSession, history: History) => {
        const {state: {backUrl = "/"} = {}} = history.location;

        this.userInfo = response;
        this.applicationStore.setSesssionAction(response);
        // TODO: сделать проверку на bc, что бы не сохранять пользователя при репортах
        saveToStore("auth", response);
        history.push(backUrl, {backUrl: undefined});
    });

    changeUserInfo = action("changeUserInfo", (userInfo: Partial<IAuthSession>) => {
        this.userInfo = {
            ...this.userInfo,
            ...userInfo,
        };
        saveToStore("auth", this.userInfo);
    });

    logoutAction = action("logoutAction", async () => {
        const cleanedValues: IAuthSession = {...this.userInfo};

        for (const key in cleanedValues) {
            if (Object.prototype.hasOwnProperty.call(cleanedValues, key)) {
                if (Array.isArray(cleanedValues[key])) {
                    cleanedValues[key] = [];
                } else {
                    cleanedValues[key] = "";
                }
            }
        }

        try {
            await request({
                action: "auth",
                query: "Logout",
                session: this.userInfo.session,
            });
        } catch (err) {
            logger(err);
        }

        this.userInfo = DEAULT_USER_INFO;
        this.applicationStore.setSesssionAction(cleanedValues);
    });
}
