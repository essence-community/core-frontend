import {
    IBuilderConfig,
    IStoreBaseModel,
    IBuilderMode,
    IRecordsModel,
    IRecord,
} from "@essence-community/constructor-share/types";
import {IClassProps} from "../../../../essence-constructor-share/lib/types/Class";

export interface IFieldItemSelectorModel extends IStoreBaseModel {
    getStores: (props: IChildGridBuildConfig) => [IGridModel?, IGridModel?];
    moveRecSaveAction(mode: IBuilderMode, fields: IChildGridBuildConfig, isAll: boolean): Promise<boolean>;
}

export interface IGridModel extends IStoreBaseModel {
    selectedRecords: Map<string, IRecord>;
    recordsStore: IRecordsModel;
}

export interface IChildGridBuildConfig {
    fieldFrom: IBuilderConfig;
    fieldTo: IBuilderConfig;
}

export interface IClassWithEditingProps extends IClassProps {
    editing?: boolean;
}
