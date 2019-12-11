import {computed} from "mobx";
import {VALUE_SELF_ALWAYSFIRST} from "@essence/essence-constructor-share/constants";
import {StoreBaseModel, RecordsModel} from "@essence/essence-constructor-share/models";
import {
    IRecordsModel,
    IBuilderConfig,
    IStoreBaseModelProps,
    IStoreBaseModel,
} from "@essence/essence-constructor-share/types";
import {camelCaseMemoized} from "@essence/essence-constructor-share/utils";
import {parse} from "@essence/essence-constructor-share/utils/parser";

export class IframeModel extends StoreBaseModel implements IStoreBaseModel {
    recordsStore: IRecordsModel;

    bc: IBuilderConfig;

    @computed get typeiframe(): "HTML" | "URL" | string {
        const typeiframe = this.bc.typeiframe && parse(this.bc.typeiframe).runer(this.pageStore.globalValues);

        if (typeof typeiframe === "string") {
            return typeiframe;
        }

        return "URL";
    }

    @computed get value(): string {
        if (this.recordsStore.selectedRecord && this.bc.column) {
            const value = this.recordsStore.selectedRecord[camelCaseMemoized(this.bc.column)];

            return typeof value === "string" ? value : "";
        }

        return "";
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

    reloadStoreAction = () => this.recordsStore.loadRecordsAction({});
}
