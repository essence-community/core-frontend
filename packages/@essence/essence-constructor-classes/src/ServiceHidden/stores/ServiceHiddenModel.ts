import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {
    IRecordsModel,
    IStoreBaseModelProps,
    IBuilderMode,
    IBuilderConfig,
    IHandlerOptions,
} from "@essence-community/constructor-share/types";
import {computed, action, makeObservable} from "mobx";

export class ServiceHiddenModel extends StoreBaseModel {
    recordsStore: IRecordsModel;

    @computed get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.applicationStore,
            pageStore: props.pageStore,
        });
        makeObservable(this);
    }

    reloadStoreAction = () => this.recordsStore.loadRecordsAction();

    clearStoreAction = () => this.recordsStore.clearChildsStoresAction();

    @action
    updateBtnAction = async (mode: IBuilderMode, bc: IBuilderConfig, options: IHandlerOptions = {}) => {
        await this.recordsStore.saveAction(this.selectedRecord!, (bc.modeaction || mode) as IBuilderMode, {
            ...options,
            actionBc: bc,
            query: bc.updatequery,
        });

        return Promise.resolve(true);
    };

    @action
    defaultHandlerBtnAction = async (
        mode: IBuilderMode,
        bc: IBuilderConfig,
        options: IHandlerOptions = {},
    ): Promise<boolean> => {
        let result = true;

        switch (mode) {
            case "7":
                result = await this.recordsStore.downloadAction(
                    this.selectedRecord!,
                    (bc.modeaction || mode) as IBuilderMode,
                    {
                        ...options,
                        actionBc: bc,
                        query: bc.updatequery,
                    },
                );
                break;
            default:
                result = await this.recordsStore.saveAction(
                    this.selectedRecord!,
                    (bc.modeaction || mode) as IBuilderMode,
                    {
                        ...options,
                        actionBc: bc,
                        query: bc.updatequery,
                    },
                );
        }

        return Promise.resolve(result);
    };

    handlers = {
        defaultHandlerBtnAction: this.defaultHandlerBtnAction,
        updateBtnAction: this.updateBtnAction,
    };
}
