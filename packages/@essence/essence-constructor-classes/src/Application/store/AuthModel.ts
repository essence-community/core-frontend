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
            session: string = this.userInfo.session,
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
                // eslint-disable-next-line consistent-return
                .then((response: IAuthSession) => {
                    if (response && snackbarStore.checkValidLoginResponse(response)) {
                        if (response.session === this.userInfo.session) {
                            this.changeUserInfo(response);
                        } else {
                            this.successLoginAction(response, history);
                        }
                    } else if (!response && session === this.userInfo.session) {
                        return this.logoutAction();
                    }
                })
                .catch((err: Error) => {
                    logger(err);
                }),
    );

    @action
    loginAction = (authValues: Record<string, string>, history: History, responseOptions: Partial<IAuthSession> = {}) =>
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
                        true,
                    );
                }
            })
            .catch((error: Error) => {
                snackbarStore.checkExceptResponse(error, undefined, this.applicationStore);
                this.applicationStore.logoutAction();
                this.userInfo = DEAULT_USER_INFO;
            });

    @action
    successLoginAction = async (response: IAuthSession, history: History, isReloadAppications = false) => {
        const {redirecturl = "/"} = this.applicationStore.bc;
        const backUrl: string = history.location.state?.backUrl ?? redirecturl;

        this.userInfo = response;
        this.applicationStore.setSesssionAction(response);
        // TODO: сделать проверку на bc, что бы не сохранять пользователя при репортах
        saveToStore("auth", response);

        if (isReloadAppications) {
            await this.applicationStore.loadApplictionConfigs();
        }

        history.push(backUrl.indexOf("/") === 0 ? backUrl : `/${backUrl}`, {backUrl: undefined});
    };

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

        this.userInfo = DEAULT_USER_INFO;
        this.applicationStore.setSesssionAction(cleanedValues);

        try {
            await request({
                action: "auth",
                query: "Logout",
                session: this.userInfo.session,
            });
        } catch (err) {
            logger(err);
        }
    });
}
