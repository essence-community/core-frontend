import {IStoreBaseModel, IBuilderConfig} from "@essence-community/constructor-share/types";
import {IForm} from "@essence-community/constructor-share/Form";

export interface IFieldMultiModel extends IStoreBaseModel {
    isLoading: boolean;
    displayText?: string;
    clearAction(): void;
    getFieldsConfig(): IBuilderConfig[];
    fillActiveRecordAction(form: IForm, configs: IBuilderConfig[]): Promise<boolean>;
}
