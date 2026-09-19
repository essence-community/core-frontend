import {action, computed} from "mobx";
import {VALUE_SELF_ALWAYSFIRST} from "@essence-community/constructor-share/constants";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IRecordsModel, IStoreBaseModelProps, IStoreBaseModel} from "@essence-community/constructor-share/types";
import {parse} from "@essence-community/constructor-share/utils/parser";

export class IframeModel extends StoreBaseModel implements IStoreBaseModel {
    recordsStore: IRecordsModel;

    @computed get typeiframe(): "HTML" | "URL" | string {
        const typeiframe = this.bc.typeiframe && parse(this.bc.typeiframe).runer(this.pageStore.globalValues);

        if (typeof typeiframe === "string") {
            return typeiframe;
        }

        if (this.bc.typeiframe === "HTML" || this.bc.typeiframe === "URL") {
            return this.bc.typeiframe;
        }

        return "URL";
    }

    @computed get value(): string {
        if (this.recordsStore.selectedRecord && this.bc.column) {
            const value = this.recordsStore.selectedRecord[this.bc.column];

            return typeof value === "string" ? value : "";
        }

        return "";
    }

    @computed public get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }

    constructor(props: IStoreBaseModelProps) {
        super(props);

        const recordsStore = new RecordsModel(
            {defaultvalue: VALUE_SELF_ALWAYSFIRST, ...this.bc},
            {
                applicationStore: props.applicationStore,
                pageStore: this.pageStore,
            },
        );

        this.recordsStore = recordsStore;
    }

    @action
    reloadStoreAction = () => {
        this.recordsStore.selectedRecords.clear();

        return this.recordsStore.loadRecordsAction();
    };

    @action
    clearStoreAction = () => {
        this.recordsStore.clearChildsStoresAction();
        this.recordsStore.selectedRecords.clear();
    };
}
