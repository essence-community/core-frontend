import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IRecordsModel, IStoreBaseModelProps} from "@essence-community/constructor-share/types";

export class ServiceHiddenModel extends StoreBaseModel {
    recordsStore: IRecordsModel;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.applicationStore,
            pageStore: props.pageStore,
        });
    }

    reloadStoreAction = () => this.recordsStore.loadRecordsAction({});

    clearStoreAction = () => this.recordsStore.clearChildsStoresAction();
}
