import {IBuilderConfig, IStoreBaseModel, IBuilderMode, IClassProps} from "@essence-community/constructor-share/types";

export interface IFieldItemSelectorModel extends IStoreBaseModel {
    getStores: (props: IChildGridBuildConfig) => [IStoreBaseModel?, IStoreBaseModel?];
    moveRecSaveAction(mode: IBuilderMode, fields: IChildGridBuildConfig, isAll: boolean): Promise<boolean>;
}

export interface IChildGridBuildConfig {
    fieldFrom: IBuilderConfig;
    fieldTo: IBuilderConfig;
}

export interface IClassWithEditingProps extends IClassProps {
    editing?: boolean;
}
