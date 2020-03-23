import {IRecordsModel, IStoreBaseModelProps} from "@essence-community/constructor-share";
import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {saveToStore, getFromStore} from "@essence-community/constructor-share/utils";
import {action, observable, ObservableMap} from "mobx";
import {RecordsModel} from "@essence-community/constructor-share/models/RecordsModel";

const STORE_NAME = "PAGES_TREE_MENU";

export class PagesTreeModel extends StoreBaseModel {
    expansionRecords: ObservableMap<string, boolean> = observable.map();

    recordsStore: IRecordsModel;

    openCloseExpansionAction = action(
        "openCloseExpansionAction",
        (ckId: string, isExpanded = !this.expansionRecords.get(ckId)) => {
            this.expansionRecords.set(ckId, isExpanded);
            saveToStore(STORE_NAME, this.expansionRecords.toJSON());
        },
    );

    constructor(props: IStoreBaseModelProps) {
        super(props);
        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.applicationStore,
            pageStore: props.pageStore,
        });
        const state: Record<string, boolean> | undefined = getFromStore(STORE_NAME, {});

        if (state) {
            for (const [key, value] of Object.entries(state)) {
                this.expansionRecords.set(key, value);
            }
        }
    }
}
