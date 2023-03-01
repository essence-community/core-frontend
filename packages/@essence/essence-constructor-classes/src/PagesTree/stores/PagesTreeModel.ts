import {IRecordsModel, IStoreBaseModelProps, ICkId, IRecord} from "@essence-community/constructor-share/types";
import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {saveToStore, getFromStore} from "@essence-community/constructor-share/utils";
import {action, observable, ObservableMap} from "mobx";
import {RecordsModel} from "@essence-community/constructor-share/models/RecordsModel";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";

const STORE_NAME = "PAGES_TREE_MENU";

export class PagesTreeModel extends StoreBaseModel {
    expansionRecords: ObservableMap<string, boolean> = observable.map();

    @observable
    public hiddenRecords: ObservableMap<string, boolean> = observable.map();

    recordsStore: IRecordsModel;

    private storeName: string;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.storeName = `${STORE_NAME}_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`;

        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.pageStore.applicationStore,
            pageStore: props.pageStore,
        });
        const state: Record<string, boolean> | undefined = getFromStore(this.storeName, {});

        if (state) {
            for (const [key, value] of Object.entries(state)) {
                this.expansionRecords.set(key, value);
            }
        }
    }

    @action
    setHiddenAction = (ckId: string, isHidden: boolean) => {
        this.hiddenRecords.set(ckId, isHidden);
    };

    @action
    openCloseExpansionAction = (ckId: string, isExpanded = !this.expansionRecords.get(ckId)) => {
        if (isExpanded) {
            this.closeOtherFolders(ckId);
        }

        this.expansionRecords.set(ckId, isExpanded);
        saveToStore(this.storeName, this.expansionRecords.toJSON());
    };

    @action
    closeOtherFolders = (ckId: string) => {
        const {routesStore} = this.pageStore.applicationStore;

        if (routesStore) {
            const {recordId, records, recordParentId} = routesStore.recordsStore;
            const paths: Record<ICkId, boolean> = {};
            let parentRoute = records.find((rec) => rec[recordId] === ckId);

            while (parentRoute) {
                paths[parentRoute[recordId] as ICkId] = true;

                parentRoute = records.find((rec) => rec[recordId] === (parentRoute as IRecord)[recordParentId]);
            }

            this.expansionRecords.forEach((value, key) => {
                if (paths[key] === undefined && value) {
                    this.expansionRecords.set(key, false);
                }
            });
        }
    };
}
