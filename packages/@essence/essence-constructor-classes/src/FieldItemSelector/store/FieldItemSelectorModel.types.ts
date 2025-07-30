import {IBuilderConfig, IStoreBaseModel, IBuilderMode, IClassProps, IStoreBaseModelProps} from "@essence-community/constructor-share/types";
import {IField} from "@essence-community/constructor-share/Form";

export interface IFieldItemSelectorModel extends IStoreBaseModel {
    getStores: (props: IChildGridBuildConfig) => [IStoreBaseModel?, IStoreBaseModel?];
    moveRecSaveAction(
        mode: IBuilderMode,
        fields: IChildGridBuildConfig,
        isAll: boolean,
        btnBc: IBuilderConfig,
    ): Promise<boolean>;
}

export interface IChildGridBuildConfig {
    fieldFrom: IBuilderConfig;
    fieldTo: IBuilderConfig;
}

export interface IClassWithEditingProps extends IClassProps {
    editing?: boolean;
}

export interface IFieldItemSelectorModelProps extends IStoreBaseModelProps {
    field: IField;
}