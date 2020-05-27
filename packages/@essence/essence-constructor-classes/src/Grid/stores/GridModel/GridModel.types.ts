import {IBuilderConfig, ICkId, IStoreBaseModel, IRecordsModel} from "@essence-community/constructor-share/types";
import {ObservableMap} from "mobx";
import {IForm} from "@essence-community/constructor-share/Form";

export type GridCustomBtnNamesType =
    | "Override Delete Button"
    | "Override Audit Button"
    | "Override Excel Button"
    | "Override Refresh Button"
    | "Override Cancel Button"
    | "Override Save Button";

export type GridBtnsConfigType = {
    btns: IBuilderConfig[];
    btnsCollector?: IBuilderConfig[];
    overrides: {
        [key in GridCustomBtnNamesType]: IBuilderConfig;
    };
};
export type GridSaveConfigType = {
    actionBc: IBuilderConfig;
    files?: File[];
    form?: IForm;
};

export type PercentColumnsType = {
    id: ICkId;
    width: number;
};

export interface IGridModel extends IStoreBaseModel {
    recordsStore: IRecordsModel;
    valueFields: [string, string][];
    refs: Map<ICkId, HTMLElement>;
    gridColumnsInitial: IBuilderConfig[];

    // Observable
    gridColumns: IBuilderConfig[];
    columnsWidth: ObservableMap<ICkId, number | string>;
    isEdit: boolean;
    minHeight: number;
    scrollTop: number;
    isOpenSettings: boolean;

    // Computed
    isInlineEditing: boolean;
    gridHeight: number;

    // Actions
    expandSelectedAction(): void;
    openCloseExpansionAction(ckId: ICkId, isExpanded?: boolean): void;
    setGridColumns(gridColumns: IBuilderConfig[]): void;
    addRefAction(ckId: ICkId, node: HTMLElement | null): void;
    setHeightAction(height: number): void;
    setScrollTopAction(scrollTop: number): void;
    applyFiltersAction(): Promise<boolean>;

    // Other
    handleDoubleClick(): void;
}
