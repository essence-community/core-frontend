// @flow
import {action} from "mobx";
import {type RecordsModelType, RecordsModel} from "../RecordsModel";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type DynamicPanelType} from "./DynamicPanelModelType";

const getSearchValues = (values: Object, bc: Object) => ({
    ...values,
    caChilds: bc.childs && bc.childs.length ? bc.childs : undefined,
    ckPage: bc.ckPage,
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
