import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IStoreBaseModelProps, IRecordsModel, IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_CK_NSI_ADR_OBJECTS, loggerRoot} from "@essence-community/constructor-share/constants";
import {observable, computed, action} from "mobx";
import {IForm} from "@essence-community/constructor-share/Form";
import {IFieldMultiModel} from "./FieldMultiModel.types";

const logger = loggerRoot.extend("FieldMultiModel");

export class FieldMultiModel extends StoreBaseModel implements IFieldMultiModel {
    public recordsStore: IRecordsModel;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(this.bc, {
            applicationStore: this.pageStore.applicationStore,
            pageStore: this.pageStore,
        });
    }

    @observable _isLoading = false;

    @computed get isLoading() {
        return this.recordsStore.isLoading || this._isLoading;
    }

    @computed get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }

    @action stopFill = (): boolean => {
        this._isLoading = false;

        return false;
    };

    @action
    clearAction = () => {
        this.recordsStore.clearRecordsAction();
    };

    @action
    searchRecordAction = (value: string | number) =>
        this.recordsStore.searchAction({[VAR_RECORD_CK_NSI_ADR_OBJECTS]: value});

    fillActiveRecordAction = (form: IForm, configs: IBuilderConfig[]) => {
        logger("fillActiveRecordAction should implement with parameters:", form, configs);

        return Promise.resolve(false);
    };

    getFieldsConfig(): IBuilderConfig[] {
        logger("Should implement getFieldsConfig");

        return [];
    }
}
