import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IRecordsModel, IStoreBaseModelProps} from "@essence-community/constructor-share/types";

export class ExampleModel extends StoreBaseModel {
    public recordsStore: IRecordsModel;
    public column: string;
    public displayField: string;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(this.bc, {
            applicationStore: this.applicationStore,
            pageStore: this.pageStore,
        });
    }
}
