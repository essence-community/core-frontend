import {IRecordsModel, IStoreBaseModelProps} from "@essence-community/constructor-share";
import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {action, observable, ObservableMap} from "mobx";
import {RecordsModel} from "@essence-community/constructor-share/models/RecordsModel";

export class PagesTreeModel extends StoreBaseModel {
    expansionRecords: ObservableMap<string, boolean> = observable.map();

    recordsStore: IRecordsModel;

    openCloseExpansionAction = action(
        "openCloseExpansionAction",
        (ckId: string, isExpanded = !this.expansionRecords.get(ckId)) => {
            this.expansionRecords.set(ckId, isExpanded);
        },
    );

    constructor(props: IStoreBaseModelProps) {
        super(props);
        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.applicationStore,
            pageStore: props.pageStore,
        });
    }
}
