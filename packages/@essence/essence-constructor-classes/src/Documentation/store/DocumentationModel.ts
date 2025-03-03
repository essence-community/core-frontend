import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IStoreBaseModelProps, IRecordsModel} from "@essence-community/constructor-share/types";
import {action, computed, makeObservable} from "mobx";

export class DocumentationModel extends StoreBaseModel {
    public recordsStore: IRecordsModel;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(this.bc, {
            applicationStore: this.pageStore.applicationStore,
            pageStore: this.pageStore,
        });
        makeObservable(this);
    }

    @computed
    public get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }
    @action
    public reloadStoreAction = () => this.recordsStore.loadRecordsAction();
    @action
    public clearStoreAction = () => this.recordsStore.clearChildsStoresAction();
}
