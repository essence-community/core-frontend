// @flow

import {type CkIdType, type BuilderBaseType, type BuilderModeType, type FormOptionsType} from "../../BuilderType";
import {type WindowModelType} from "../WindowModel/WindowModelTypes";
import {type RecordsModelType} from "../RecordsModel";
import {type StoreBaseModelInterface} from "../StoreBaseModel/StoreBaseModelTypes";

export type GridCustomBtnNamesType =
    | "Override Delete Button"
    | "Override Audit Button"
    | "Override Excel Button"
    | "Override Refresh Button"
    | "Override Cancel Button"
    | "Override Save Button";

export type GridBtnsConfigType = {
    btns: Array<Object>,
    btnsCollector?: Array<Object>,
    overrides: {
        [GridCustomBtnNamesType]: Object,
    },
};
export type GridSaveConfigType = {|
    actionBc: BuilderBaseType,
    files?: File[],
    mode: BuilderModeType,
    windowStore: WindowModelType,
|};

export type PercentColumnsType = {
    id: CkIdType,
    width: number,
};

export type GridBuilderType = BuilderBaseType & {
    autoload?: "false" | "true",
    btnrefresh?: "false" | "true",
    btnaudit?: "false" | "true",
    btndelete?: "false" | "true",
    btnexcel?: "false" | "true",
    btnsettings?: "false" | "true",
    columns: Array<Object>,
    childwindow: Array<Object>,
    ck_query?: string,
    ck_page_object: string,
    ck_master?: string,
    excelname?: string,
    pagesize?: number,
    topbtn?: Array<Object>,
    orderdirection: string,
    orderproperty: string,
    filters?: Array<any>,
    height?: string,
    contextmenus?: Array<Object>,
    hideactions?: "false" | "true",
    column?: string,
    valuefield?: string,
    rootvisible?: string,
    winreloadstores?: "true" | "false",
    collectionvalues?: "object" | "array",
    reloadmaster?: "false" | "true",
    selmode?: "SINGLE" | "SIMPLE" | "MULTI",
    collapsed?: "true" | "false",
    autoselectidentity?: string,
    stepnamenext?: string,
    detail?: Array<BuilderBaseType>,
};

export interface GridModelInterface extends StoreBaseModelInterface {
    +bc: GridBuilderType;
    +recordsStore: RecordsModelType;
    +expansionRecords: Map<CkIdType, boolean>;
    +refs: Map<CkIdType, any>;
    +isEdit: boolean;
    +rootNode: boolean;
    +editMode: string;
    +selectedRecord: Object | null;
    +selectedRecords: Map<CkIdType, Object>;
    +isPageSelectedRecords: boolean;
    +columnsWidth: Map<CkIdType, number | string>;
    +gridColumns: Array<Object>;
    +gridBtnsConfig: GridBtnsConfigType;
    +recordsTree: {
        [$Keys: null | number | string]: Array<Object>,
    };
    +isInlineEditing: boolean;
    +valueFields: Array<any>;
    +gridHeight: number;
    scrollTop: number;
    +height: number;
    +minHeight: number;
    +gridColumnsInitial: Array<Object>;
    +defaultHandlerBtnAction: () => void;
    +saveAction: (values: Object, config: GridSaveConfigType) => void;
    +openCloseExpansionAction: (ckId: CkIdType, isExpanded?: boolean) => void;
    +addRefAction: (ckId: CkIdType, node: any) => void;
    +removeRefAction: (ckId: CkIdType) => void;
    +expandSelectedAction: () => void;
    +handleNextStepAction: () => void;
    +loadRecordsAction: () => Promise<*>;
    +removeSelectedRecordAction: () => boolean;
    +toggleSelectedRecordAction: (ckId: CkIdType, record: Object, isChecked?: boolean) => boolean;
    +setAllSelectedRecords: (all: boolean) => void;
    +scrollToRecordAction: (params: Object) => Promise<void>;
    +winReloadStores: () => void;
    +setColumnsWidth: (ckId: CkIdType, width: number) => void;
    +onPrintExcel: (values: Object, bcBtn: BuilderBaseType) => Promise<boolean>;
    +searchAction: (values: Object, options?: FormOptionsType) => Promise<void | Object>;
    +setHeightAction: (height: number) => void;
    +setMinHeightAction: (minHeight: number) => void;
    +setGridColumns: (gridColumns: Array<Object>) => void;
}

export type GridModelType = GridModelInterface;
