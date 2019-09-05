// @flow
import {extendObservable, action} from "mobx";
import {sendRequest} from "../../request/baseRequest";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type AuditModelInterface} from "./AuditModelType";

export class AuditModel extends StoreBaseModel implements AuditModelInterface {
    auditInfo: Object;

    constructor(props: StoreBaseModelPropsType) {
        super(props);

        extendObservable(this, {
            auditInfo: {
                ctChange: "",
                cvUsername: "",
            },
        });
    }

    loadAuditInfoAction = action("loadAuditInfoAction", (selectedRecord?: Object = {}) => {
        this.auditInfo.ctChange = selectedRecord.ctChange;
        this.auditInfo.cvUsername = "";

        return sendRequest({
            json: {
                filter: {
                    cnUser: selectedRecord.cnUser || selectedRecord.ckUser,
                },
            },
            pageObject: this.bc.ckPageObject,
            plugin: this.bc.extraplugingate,
            query: "GetUserInfo",
            session: this.pageStore.applicationStore.session,
        })
            .then((response) => {
                if (
                    this.pageStore.applicationStore.snackbarStore.checkValidResponseAction(
                        response,
                        this.pageStore.route,
                    )
                ) {
                    this.auditInfo.cvUsername = response.cvUsername;
                }
            })
            .catch((response) => {
                this.pageStore.applicationStore.snackbarStore.checkExceptResponse(response, this.pageStore.route);
            });
    });

    clearStoreAction = action("clearStoreAction", () => {
        this.auditInfo.ctChange = "";
        this.auditInfo.cvUsername = "";
    });
}
