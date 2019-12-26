// @flow
import {action} from "mobx";
import {VAR_RECORD_ROUTE_PAGE_ID, VAR_RECORD_CA_CHILDS} from "@essence/essence-constructor-share/constants";
import {type RecordsModelType, RecordsModel} from "../RecordsModel";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type DynamicPanelType} from "./DynamicPanelModelType";

const getSearchValues = (values: Object, bc: Object) => ({
    ...values,
    [VAR_RECORD_CA_CHILDS]: bc.childs && bc.childs.length ? bc.childs : undefined,
    [VAR_RECORD_ROUTE_PAGE_ID]: bc[VAR_RECORD_ROUTE_PAGE_ID],
});

export class DynamicPanelModel extends StoreBaseModel implements DynamicPanelType {
    recordsStore: RecordsModelType;

    constructor(props: StoreBaseModelPropsType) {
        super(props);

        this.recordsStore = new RecordsModel(this.bc, this.pageStore);
        this.setSearchValuesAction(this.recordsStore.searchValues);
    }

    clearStoreAction = action("clearStoreAction", () => {
        this.recordsStore.clearChildsStoresAction();
    });

    reloadStoreAction = action("reloadStoreAction", async () => {
        await this.recordsStore.clearRecordsAction();
        await this.recordsStore.loadRecordsAction();
    });

    searchAction = action("searchAction", (values) => this.recordsStore.searchAction(getSearchValues(values, this.bc)));

    setSearchValuesAction = action("setSearchValuesAction", (values) =>
        this.recordsStore.setSearchValuesAction(getSearchValues(values, this.bc)),
    );
}

export default DynamicPanelModel;
