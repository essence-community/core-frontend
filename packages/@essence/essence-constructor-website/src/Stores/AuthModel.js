// @flow
import {extendObservable, action} from "mobx";
import {request} from "@essence-community/constructor-share/request";
import {getFromStore, saveToStore} from "@essence-community/constructor-share/utils";
import {snackbarStore, settingsStore} from "@essence-community/constructor-share/models";
import {
    VAR_SETTING_AUTO_CONNECT_GUEST,
    VAR_CONNECT_GUEST,
    loggerRoot,
} from "@essence-community/constructor-share/constants";
import {type ApplicationModelType} from "./ApplicationModel";

export interface AuthModelType {
    +userInfo: Object;
    +checkAuthAction: (history?: History) => void;
    +loginAction: (authValues: Object, history: any, responseOptions?: Object) => void;
    +changeUserInfo: (userInfo: Object) => void;
    +successLoginAction: (response: Object, history: any) => void;
    +logoutAction: () => Promise<void>;
}

const logger = loggerRoot.extend("AuthModel");

export class AuthModel implements AuthModelType {
    userInfo: Object;

    applicationStore: ApplicationModelType;

    constructor(applicationStore: ApplicationModelType) {
        this.applicationStore = applicationStore;
        extendObservable(this, {
            userInfo: getFromStore("auth", {}),
        });
    }

    checkAuthAction = action(
        "checkAuthAction",
        (
            history?: History,
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
                .then((response) => {
                    if (response && snackbarStore.checkValidLoginResponse(response)) {
                        this.successLoginAction(response, history);
                    }
                })
                .catch((err) => {
                    logger(err);
                }),
    );

    loginAction = action("loginAction", (authValues: Object, history: any, responseOptions: Object = {}) =>
        request({
            action: "auth",
            body: authValues,
            list: false,
            query: "Login",
        })
            .then((response) => {
                if (response && snackbarStore.checkValidLoginResponse(response)) {
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
                logger(error);
                snackbarStore.checkExceptResponse(error, undefined, this.applicationStore);
                this.applicationStore.logoutAction();
                this.userInfo = {};
            }),
    );

    successLoginAction = action("successLoginAction", (response: Object, history: any) => {
        const {state: {backUrl = "/home"} = {}} = history.location;

        this.userInfo = response;
        this.applicationStore.setSesssionAction(response);
        if (response.mode !== "reports") {
            saveToStore("auth", response);
        }

        history.push(backUrl, {backUrl: undefined});
    });

    changeUserInfo = action("changeUserInfo", (userInfo: Object = {}) => {
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
