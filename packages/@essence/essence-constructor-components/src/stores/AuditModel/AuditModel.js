// @flow
import {extendObservable, action} from "mobx";
import {snackbarStore} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    META_PAGE_OBJECT,
    VAR_RECORD_CT_CHANGE,
    VAR_RECORD_CV_USERNAME,
    VAR_RECORD_CN_USER,
    VAR_RECORD_CK_USER,
} from "@essence-community/constructor-share/constants";
import {sendRequest} from "../../request/baseRequest";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type AuditModelInterface} from "./AuditModelType";

export class AuditModel extends StoreBaseModel implements AuditModelInterface {
    auditInfo: Object;

    constructor(props: StoreBaseModelPropsType) {
        super(props);

        extendObservable(this, {
            auditInfo: {
                [VAR_RECORD_CT_CHANGE]: "",
                [VAR_RECORD_CV_USERNAME]: "",
            },
        });
    }

    loadAuditInfoAction = action("loadAuditInfoAction", (selectedRecord?: Object = {}) => {
        this.auditInfo[VAR_RECORD_CT_CHANGE] = selectedRecord[VAR_RECORD_CT_CHANGE];
        this.auditInfo[VAR_RECORD_CV_USERNAME] = "";

        return sendRequest({
            [META_PAGE_OBJECT]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
            json: {
                filter: {
                    [VAR_RECORD_CN_USER]: selectedRecord[VAR_RECORD_CN_USER] || selectedRecord[VAR_RECORD_CK_USER],
                },
            },
            plugin: this.bc.extraplugingate,
            query: "GetUserInfo",
            session: this.pageStore.applicationStore.session,
        })
            .then((response) => {
                if (
                    snackbarStore.checkValidResponseAction(
                        response,
                        this.pageStore.route,
                        undefined,
                        this.pageStore.applicationStore,
                    )
                ) {
                    this.auditInfo[VAR_RECORD_CV_USERNAME] = response[VAR_RECORD_CV_USERNAME];
                }
            })
            .catch((response) => {
                snackbarStore.checkExceptResponse(response, this.pageStore.route, this.pageStore.applicationStore);
            });
    });

    clearStoreAction = action("clearStoreAction", () => {
        this.auditInfo[VAR_RECORD_CT_CHANGE] = "";
        this.auditInfo[VAR_RECORD_CV_USERNAME] = "";
    });
}
