// @flow
import {action} from "mobx";
import {isEmpty, PageModel, sendRequest} from "@essence-community/constructor-components";
import {snackbarStore} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_ID,
    VAR_RECORD_CD_PERIOD,
    VAR_RECORD_CK_DEPT,
    VAR_RECORD_CV_TIMEZONE,
} from "@essence-community/constructor-share/constants";
import type {AuthModelType} from "./AuthModel";
import type {ApplicationModelType} from "./ApplicationModel";

export interface ProfileModelType {
    +authStore: AuthModelType;
    +changeDeptAction: (deptValue?: string | number, timezone?: string) => void;
}

export type ProfileModelParamsType = {
    authStore: AuthModelType,
    applicationStore: ApplicationModelType,
    pageId: string,
};

class ProfileModel extends PageModel implements ProfileModelType {
    authStore: AuthModelType;

    constructor({applicationStore, authStore, pageId}: ProfileModelParamsType) {
        super({
            applicationStore,
            isReadOnly: false,
            pageId,
        });
        this.authStore = authStore;
    }

    loadPeriodAction = action("loadPeriodAction", (deptValue: string) => {
        sendRequest({
            action: "sql",
            json: {
                master: {
                    [VAR_RECORD_ID]: deptValue,
                },
            },
            query: "ProfileShowUserDepartmentPeriodStatus",
            session: this.applicationStore.session,
        })
            .then((response = {}) => {
                if (
                    snackbarStore.checkValidResponseAction(response, {
                        applicationStore: this.applicationStore,
                    })
                ) {
                    if (response[VAR_RECORD_CD_PERIOD]) {
                        this.applicationStore.updateGlobalValuesAction({gCdPeriod: response[VAR_RECORD_CD_PERIOD]});
                        this.updateGlobalValues({gCdPeriod: response[VAR_RECORD_CD_PERIOD]});
                    } else {
                        this.applicationStore.updateGlobalValuesAction({gCdPeriod: ""});
                        this.updateGlobalValues({gCdPeriod: ""});
                    }
                }
            })
            .catch((error) => {
                snackbarStore.checkExceptResponse(error, undefined, this.applicationStore);
            });
    });

    updateDefaultDepartment = action("loadPeriodAction", (deptValue: string, timezone?: string = "+03:00") => {
        sendRequest({
            action: "dml",
            json: {
                data: {
                    [VAR_RECORD_CK_DEPT]: parseInt(deptValue, 10),
                    [VAR_RECORD_CV_TIMEZONE]: timezone,
                },
            },
            query: "ModifyDefaultDepartment",
            session: this.applicationStore.session,
        })
            .then((response = {}) => {
                if (
                    snackbarStore.checkValidResponseAction(response, {
                        applicationStore: this.applicationStore,
                    })
                ) {
                    this.authStore.changeUserInfo({
                        [VAR_RECORD_CK_DEPT]: deptValue,
                    });
                }
            })
            .catch((error) => {
                snackbarStore.checkExceptResponse(error, undefined, this.applicationStore);
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
