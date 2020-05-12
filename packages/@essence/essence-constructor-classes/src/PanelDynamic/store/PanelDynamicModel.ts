import {action, computed} from "mobx";
import {VAR_RECORD_ROUTE_PAGE_ID, VAR_RECORD_CA_CHILDS} from "@essence-community/constructor-share/constants";
import {RecordsModel} from "@essence-community/constructor-share/models/RecordsModel";
import {StoreBaseModel} from "@essence-community/constructor-share/models/StoreBaseModel";
import {IRecord, IBuilderConfig, IPageModel, IStoreBaseModelProps} from "@essence-community/constructor-share/types";

const getSearchValues = (values: IRecord, bc: IBuilderConfig, pageStore: IPageModel): IRecord => ({
    ...values,
    [VAR_RECORD_CA_CHILDS]: bc.childs && bc.childs.length ? bc.childs : undefined,
    [VAR_RECORD_ROUTE_PAGE_ID]: pageStore.pageId,
});

export class PanelDynamicModel extends StoreBaseModel {
    public recordsStore: RecordsModel;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(this.bc, {
            applicationStore: this.applicationStore,
            pageStore: this.pageStore,
        });
        this.setSearchValuesAction(this.recordsStore.searchValues);
    }

    @computed get children(): IBuilderConfig[] {
        return this.recordsStore.records as any;
    }

    @action
    clearStoreAction = () => {
        this.recordsStore.clearChildsStoresAction();
    };

    @action
    reloadStoreAction = async () => {
        await this.recordsStore.clearRecordsAction();

        return this.recordsStore.loadRecordsAction();
    };

    @action
    searchAction = (values: IRecord) =>
        this.recordsStore.searchAction(getSearchValues(values, this.bc, this.pageStore));

    @action
    setSearchValuesAction = (values: IRecord) =>
        this.recordsStore.setSearchValuesAction(getSearchValues(values, this.bc, this.pageStore));
}
