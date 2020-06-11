import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IStoreBaseModelProps, IRecordsModel} from "@essence-community/constructor-share/types";

export class DocumentationModel extends StoreBaseModel {
    public recordsStore: IRecordsModel;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(this.bc, {
            applicationStore: this.pageStore.applicationStore,
            pageStore: this.pageStore,
        });
    }
}
