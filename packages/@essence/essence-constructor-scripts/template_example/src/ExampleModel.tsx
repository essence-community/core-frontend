import {StoreBaseModel} from "@essence/essence-constructor-share/models";
import {IRecordsModel, IStoreBaseModelProps} from "@essence/essence-constructor-share/types";
import {camalize} from "./utils";

export class ExampleModel extends StoreBaseModel {
    public recordsStore: IRecordsModel;
    public column: string;
    public displayField: string;

    constructor({bc, pageStore}: IStoreBaseModelProps) {
        super({bc, pageStore});

        this.column = bc.column ? camalize(bc.column) : "";
        this.displayField = bc.displayfield ? camalize(bc.displayfield) : "";

        this.recordsStore = new pageStore.applicationStore.configs.RecordsModel(this.bc, this.pageStore, {});
    }
};
