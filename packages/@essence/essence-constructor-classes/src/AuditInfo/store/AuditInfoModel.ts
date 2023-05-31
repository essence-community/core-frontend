import {action, observable} from "mobx";
import {snackbarStore, StoreBaseModel} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    META_PAGE_ID,
    META_PAGE_OBJECT,
    VAR_RECORD_CT_CHANGE,
    VAR_RECORD_CK_USER,
    VAR_RECORD_CN_USER,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
} from "@essence-community/constructor-share/constants";
import {request} from "@essence-community/constructor-share/request";
import {IPageModel, IResponse, IRecord} from "@essence-community/constructor-share/types";

export class AuditInfoModel extends StoreBaseModel {
    private userKey = VAR_RECORD_CK_USER;
    private dateKey = VAR_RECORD_CT_CHANGE;
    constructor(props) {
        super(props);
        if (this.bc.valuefield && this.bc.valuefield.length) {
            this.userKey = this.bc.valuefield.find(({out}) => out === "user")?.in || VAR_RECORD_CK_USER;
            this.dateKey = this.bc.valuefield.find(({out}) => out === "change")?.in || VAR_RECORD_CT_CHANGE;
        }
    }
    @observable auditInfo = {
        date: "",
        user: "",
    };

    loadAuditInfoAction = async (pageStore: IPageModel) => {
        const masterId = this.bc[VAR_RECORD_MASTER_ID] || this.bc[VAR_RECORD_PARENT_ID];
        const store = masterId ? pageStore.stores.get(masterId) : undefined;
        const selectedRecord = store?.recordsStore?.selectedRecord;

        if (selectedRecord) {
            const dateChange = selectedRecord[this.dateKey];

            this.auditInfo.date = typeof dateChange === "string" ? dateChange : "";
            this.auditInfo.user = "";

            try {
                const response = await request<IRecord>({
                    [META_PAGE_ID]: this.pageStore.pageId || this.bc[VAR_RECORD_ROUTE_PAGE_ID],
                    [META_PAGE_OBJECT]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                    json: {
                        filter: {
                            [this.bc.idproperty || VAR_RECORD_ID]:
                                selectedRecord[this.userKey] || selectedRecord[VAR_RECORD_CN_USER],
                        },
                    },
                    list: false,
                    plugin: this.bc.extraplugingate,
                    query: this.bc[VAR_RECORD_QUERY_ID] || "GetUserInfo",
                    session: this.pageStore.applicationStore.authStore.userInfo.session,
                    timeout: this.bc.timeout,
                });

                if (
                    snackbarStore.checkValidResponseAction(response as IResponse, {
                        applicationStore: this.pageStore.applicationStore,
                        route: this.pageStore.route,
                    })
                ) {
                    const username = response[this.bc.idproperty || VAR_RECORD_ID];

                    this.auditInfo.user = typeof username === "string" ? username : "";
                }
            } catch (error) {
                snackbarStore.checkExceptResponse(error, this.pageStore.route, this.pageStore.applicationStore);
            }
        }
    };

    clearStoreAction = action("clearStoreAction", () => {
        this.auditInfo.date = "";
        this.auditInfo.user = "";
    });
}
