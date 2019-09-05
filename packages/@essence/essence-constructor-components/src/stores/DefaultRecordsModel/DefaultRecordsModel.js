// @flow
import {RecordsModel, type RecordsModelType} from "../RecordsModel";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type DefaultRecordsModelInterface} from "./DefaultRecordsModelType";

export class DefaultRecordsModel extends StoreBaseModel implements DefaultRecordsModelInterface {
    recordsStore: RecordsModelType;

    constructor(props: StoreBaseModelPropsType) {
        super(props);

        this.recordsStore = new RecordsModel(this.bc, this.pageStore);
    }

    reloadStoreAction = () => {
        this.recordsStore.loadRecordsAction();
    };

    clearStoreAction = () => {
        this.recordsStore.clearChildsStoresAction();
    };
}
