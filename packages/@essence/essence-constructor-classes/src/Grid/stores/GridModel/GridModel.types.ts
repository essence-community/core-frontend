import {
    IBuilderConfig,
    ICkId,
    IStoreBaseModel,
    IRecordsModel,
    IRecord,
    IHandlerOptions,
} from "@essence-community/constructor-share/types";
import {ObservableMap} from "mobx";
import {IForm} from "@essence-community/constructor-share/Form";

export type GridCustomBtnNamesType =
    | "Override Delete Button"
    | "Override Audit Button"
    | "Override Excel Button"
    | "Override Refresh Button"
    | "Override Cancel Button"
    | "Override Save Button";

export interface IGridBtnsConfigType {
    btns: IBuilderConfig[];
    btnsCollector?: IBuilderConfig[];
    overrides: {
        [key in GridCustomBtnNamesType]: IBuilderConfig;
    };
}
export interface IGridSaveConfigType {
    actionBc: IBuilderConfig;
    files?: File[];
    form?: IForm;
}

export interface IPercentColumnsType {
    id: ICkId;
    width: number;
}

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
    handleDoubleClick(options: IHandlerOptions): void;

    // DragDrop
    dragDropAction(pageObjectId: string, dragId: string | string[], drop?: IRecord): Promise<boolean>;
}
