import {action, observable} from "mobx";
import {snackbarStore, StoreBaseModel} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    META_PAGE_OBJECT,
    VAR_RECORD_CT_CHANGE,
    VAR_RECORD_CV_USERNAME,
    VAR_RECORD_CN_USER,
    VAR_RECORD_CK_USER,
    VAR_RECORD_MASTER_ID,
} from "@essence-community/constructor-share/constants";
import {request} from "@essence-community/constructor-share/request";
import {IPageModel, IResponse, IRecord} from "@essence-community/constructor-share/types";

export class AuditInfoModel extends StoreBaseModel {
    @observable auditInfo = {
        [VAR_RECORD_CT_CHANGE]: "",
        [VAR_RECORD_CV_USERNAME]: "",
    };

    loadAuditInfoAction = async (pageStore: IPageModel) => {
        const masterId = this.bc[VAR_RECORD_MASTER_ID];
        const store = masterId ? pageStore.stores.get(masterId) : undefined;
        const selectedRecord = store?.recordsStore?.selectedRecord;

        if (selectedRecord) {
            const dateChange = selectedRecord[VAR_RECORD_CT_CHANGE];

            this.auditInfo[VAR_RECORD_CT_CHANGE] = typeof dateChange === "string" ? dateChange : "";
            this.auditInfo[VAR_RECORD_CV_USERNAME] = "";

            try {
                const response = await request<IRecord>({
                    [META_PAGE_OBJECT]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                    json: {
                        filter: {
                            [VAR_RECORD_CN_USER]:
                                selectedRecord[VAR_RECORD_CN_USER] || selectedRecord[VAR_RECORD_CK_USER],
                        },
                    },
                    list: false,
                    plugin: this.bc.extraplugingate,
                    query: "GetUserInfo",
                    session: this.pageStore.applicationStore.authStore.userInfo.session,
                });

                if (
                    snackbarStore.checkValidResponseAction(response as IResponse, {
                        applicationStore: this.pageStore.applicationStore,
                        route: this.pageStore.route,
                    })
                ) {
                    const username = response[VAR_RECORD_CV_USERNAME];

                    this.auditInfo[VAR_RECORD_CV_USERNAME] = typeof username === "string" ? username : "";
                }
            } catch (error) {
                snackbarStore.checkExceptResponse(error, this.pageStore.route, this.pageStore.applicationStore);
            }
        }
    };

    clearStoreAction = action("clearStoreAction", () => {
        this.auditInfo[VAR_RECORD_CT_CHANGE] = "";
        this.auditInfo[VAR_RECORD_CV_USERNAME] = "";
    });
}
