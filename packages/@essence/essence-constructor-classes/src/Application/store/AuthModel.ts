/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {observable, action} from "mobx";
import {History} from "history";
import {
    getFromLocalStore,
    removeFromLocalStore,
    saveToLocalStore,
    IAuthModel,
    ILoginOptions,
    IApplicationModel,
    loggerRoot,
} from "@essence-community/constructor-share";
import {loadStore} from "@essence-community/constructor-share/utils/storage";
import {snackbarStore, settingsStore} from "@essence-community/constructor-share/models";
import {request} from "@essence-community/constructor-share/request";
import {
    VAR_SETTING_AUTO_CONNECT_GUEST,
    VAR_CONNECT_GUEST,
    VAR_RECORD_CV_LOGIN,
    VAR_RECORD_CA_ACTIONS,
    VAR_SETTING_AUTH_URL,
} from "@essence-community/constructor-share/constants";
import {IRecord} from "@essence-community/constructor-share/types";
import {IAuthSession} from "./AuthModel.types";

const logger = loggerRoot.extend("AuthModel");

const DEFAULT_USER_INFO: IAuthSession = {
    [VAR_RECORD_CA_ACTIONS]: [],
    [VAR_RECORD_CV_LOGIN]: "",
    session: "",
};

export class AuthModel implements IAuthModel {
    @observable userInfo = getFromLocalStore<IAuthSession>("auth") || DEFAULT_USER_INFO;

    // eslint-disable-next-line no-useless-constructor
    constructor(public applicationStore: IApplicationModel) {}

    @action
    checkAuthAction = (
        history: History,
        session: string = this.userInfo.session,
        connectGuest: string = settingsStore.settings[VAR_SETTING_AUTO_CONNECT_GUEST],
        isNotRedirect = false,
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
            .then((responseAny: any) => {
                const response = responseAny as IAuthSession;

                if (response && snackbarStore.checkValidLoginResponse(response)) {
                    if (response.session === this.userInfo.session) {
                        this.changeUserInfo(response);
                    } else {
                        if (
                            !isNotRedirect &&
                            history.location.pathname.indexOf(
                                settingsStore.settings[VAR_SETTING_AUTH_URL] || "/auth",
                            ) === -1
                        ) {
                            const state = (history.location.state || {}) as {backUrl?: string};
                            const {backUrl = history.location.pathname} = state;

                            history.replace(history.location.pathname, {backUrl});
                        }
                        this.successLoginAction(response, history, undefined, isNotRedirect);
                    }
                } else if (!response && session === this.userInfo.session) {
                    return this.logoutAction();
                }
            })
            .catch((err: Error) => {
                snackbarStore.checkExceptResponse(err, undefined, this.applicationStore);
                logger(err);
            });

    @action
    loginAction = ({authValues, history, responseOptions = {}, headers = {}, query = "Login"}: ILoginOptions) =>
        request({
            action: "auth",
            body: authValues,
            headers,
            list: false,
            query,
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
                this.userInfo = DEFAULT_USER_INFO;
            });

    @action
    successLoginAction = async (
        response: IAuthSession,
        history: History,
        isReloadApplications = false,
        isNotRedirect = false,
    ): Promise<void> => {
        const {redirecturl = "/"} = this.applicationStore.bc;
        const state = (history.location.state || {}) as {backUrl?: string};
        let backUrl: string = state.backUrl ?? redirecturl;

        if (backUrl === history.location.pathname) {
            backUrl = redirecturl;
        }

        this.userInfo = response;
        this.applicationStore.setSessionAction(response);
        await loadStore(this.userInfo.session);
        // TODO: сделать проверку на bc, что бы не сохранять пользователя при репортах
        saveToLocalStore("auth", response);

        if (isReloadApplications) {
            await this.applicationStore.loadApplictionConfigs();
        }

        if (isNotRedirect) {
            return;
        }

        history.push(backUrl.indexOf("/") === 0 ? backUrl : `/${backUrl}`, {backUrl: undefined});
    };

    changeUserInfo = action("changeUserInfo", (userInfo: Partial<IAuthSession>) => {
        this.userInfo = {
            ...this.userInfo,
            ...userInfo,
        };
        saveToLocalStore("auth", this.userInfo);
    });

    logoutAction = action("logoutAction", async () => {
        const cleanedValues: IAuthSession = {...this.userInfo};
        const session = this.userInfo.session;

        for (const key in cleanedValues) {
            if (Object.prototype.hasOwnProperty.call(cleanedValues, key)) {
                if (Array.isArray(cleanedValues[key])) {
                    cleanedValues[key] = [];
                } else {
                    cleanedValues[key] = "";
                }
            }
        }

        this.userInfo = DEFAULT_USER_INFO;
        this.applicationStore.setSessionAction(cleanedValues);

        removeFromLocalStore("auth");

        await loadStore(this.userInfo.session);

        try {
            await request({
                action: "auth",
                query: "Logout",
                session,
            });
        } catch (err) {
            snackbarStore.checkExceptResponse(err, undefined, this.applicationStore);
            logger(err);
        }
    });
}
