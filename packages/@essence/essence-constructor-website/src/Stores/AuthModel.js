// @flow
import {extendObservable, action} from "mobx";
import {sendRequest} from "@essence-community/constructor-components";
import {getFromStore, saveToStore} from "@essence-community/constructor-share/utils";
import {snackbarStore} from "@essence-community/constructor-share/models";
import noop from "lodash/noop";
import {type ApplicationModelType} from "./ApplicationModel";

export interface AuthModelType {
    +userInfo: Object;
    +checkAuthAction: (history?: History) => void;
    +loginAction: (authValues: Object, history: any, responseOptions?: Object) => void;
    +changeUserInfo: (userInfo: Object) => void;
    +successLoginAction: (response: Object, history: any) => void;
}

export class AuthModel implements AuthModelType {
    userInfo: Object;

    applicationStore: ApplicationModelType;

    constructor(applicationStore: ApplicationModelType) {
        this.applicationStore = applicationStore;
        extendObservable(this, {
            userInfo: getFromStore("auth", {}),
        });
    }

    checkAuthAction = action("checkAuthAction", (history?: History, session?: string) =>
        sendRequest({
            action: "sql",
            query: "GetSessionData",
            session,
        })
            .then((response) => {
                if (response && snackbarStore.checkValidLoginResponse(response)) {
                    this.successLoginAction(response, history);
                }
            })
            .catch(noop),
    );

    loginAction = action("loginAction", (authValues: Object, history: any, responseOptions: Object = {}) =>
        sendRequest({
            action: "auth",
            body: authValues,
            query: "Login",
        })
            .then((response) => {
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
        history.push(backUrl);
    });

    changeUserInfo = action("changeUserInfo", (userInfo: Object = {}) => {
        this.userInfo = {
            ...this.userInfo,
            ...userInfo,
        };
        saveToStore("auth", this.userInfo);
    });
}
