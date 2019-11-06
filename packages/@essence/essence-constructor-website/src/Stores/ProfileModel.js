// @flow
import {action} from "mobx";
import {isEmpty, PageModel, sendRequest} from "@essence/essence-constructor-components";
import {snackbarStore} from "@essence/essence-constructor-share/models";
import type {AuthModelType} from "./AuthModel";
import type {ApplicationModelType} from "./ApplicationModel";

export interface ProfileModelType {
    +authStore: AuthModelType;
    +changeDeptAction: (deptValue?: string | number, cvTimezone?: string) => void;
}

export type ProfileModelParamsType = {
    authStore: AuthModelType,
    applicationStore: ApplicationModelType,
    ckPage: string,
};

class ProfileModel extends PageModel implements ProfileModelType {
    authStore: AuthModelType;

    constructor({applicationStore, authStore, ckPage}: ProfileModelParamsType) {
        super({
            applicationStore,
            ckPage,
            isReadOnly: false,
        });
        this.authStore = authStore;
    }

    loadPeriodAction = action("loadPeriodAction", (deptValue: string) => {
        sendRequest({
            action: "sql",
            json: {
                master: {
                    ckId: deptValue,
                },
            },
            query: "ProfileShowUserDepartmentPeriodStatus",
            session: this.applicationStore.session,
        })
            .then((response = {}) => {
                if (snackbarStore.checkValidResponseAction(response)) {
                    if (response.cdPeriod) {
                        this.applicationStore.updateGlobalValuesAction({gCdPeriod: response.cdPeriod});
                        this.updateGlobalValues({gCdPeriod: response.cdPeriod});
                    } else {
                        this.applicationStore.updateGlobalValuesAction({gCdPeriod: ""});
                        this.updateGlobalValues({gCdPeriod: ""});
                    }
                }
            })
            .catch((error) => {
                snackbarStore.checkExceptResponse(error);
            });
    });

    updateDefaultDepartment = action("loadPeriodAction", (deptValue: string, cvTimezone?: string = "+03:00") => {
        sendRequest({
            action: "dml",
            json: {
                data: {
                    ckDept: parseInt(deptValue, 10),
                    cvTimezone,
                },
            },
            query: "ModifyDefaultDepartment",
            session: this.applicationStore.session,
        })
            .then((response = {}) => {
                if (snackbarStore.checkValidResponseAction(response)) {
                    this.authStore.changeUserInfo({
                        ckDept: deptValue,
                    });
                }
            })
            .catch((error) => {
                snackbarStore.checkExceptResponse(error);
            });
    });

    changeDeptAction = action("changeDeptAction", (deptValue: string) => {
        this.applicationStore.updateGlobalValuesAction({gCkDept: deptValue});

        if (!isEmpty(deptValue)) {
            this.updateDefaultDepartment(deptValue);
            this.loadPeriodAction(deptValue);
        }
    });
}

export default ProfileModel;
