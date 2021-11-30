import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_CN_ORDER,
} from "@essence-community/constructor-share/constants";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {mergeComponents} from "@essence-community/constructor-share/utils";
import {IGridBtnsConfigType} from "../stores/GridModel/GridModel.types";

const getBtnDeleteConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:f7e324760ede4c88b4f11f0af26c9e97",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-remove`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    confirmquestion: "static:0cd0fc9bff2641f68f0f9712395f7b82",
    handler: "removeSelectedRecordAction",
    iconfont: "trash-o",
    onlyicon: true,
    reqsel: true,
    type: "BTN",
    uitype: "11",
});

const getBtnAuditConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:627518f4034947aa9989507c5688cfff",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-audit`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    iconfont: "info",
    iconfontname: "fa",
    onlyicon: true,
    readonly: false,
    reqsel: true,
    type: "AUDIT_INFO",
    uitype: "11",
});

const getBtnRefreshConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:33c9b02a9140428d9747299b9a767abb",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-refresh`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    handler: "onRefresh",
    iconfont: "refresh",
    iconfontname: "fa",
    onlyicon: true,
    readonly: false,
    type: "BTN",
    uitype: "11",
});

const getBtnExcelConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:7578080854a84cc3b4faad62d4499a4b",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-excel`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    ckwindow: "btnexcel",
    disabledemptymaster: true,
    extraplugingate: "PrintJasperServer",
    handler: "onCreateChildWindowMaster",
    iconfont: "table",
    iconfontname: "fa",
    onlyicon: true,
    readonly: false,
    type: "BTN",
    uitype: "11",
});

const getSaveBtnConfig = (bc: IBuilderConfig, layoutTheme: number): IBuilderConfig => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:8a930c6b5dd440429c0f0e867ce98316",
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow-save`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    handler: "onSimpleSaveWindow",
    iconfont: bc.edittype === "inline" && layoutTheme === 2 ? "save" : undefined,
    type: "BTN",
    uitype: "5",
});

const getCancelInlineBtnConfig = (bc: IBuilderConfig, layoutTheme: number): IBuilderConfig => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow-cancel`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    confirmquestion: "static:9b475e25ae8a40b0b158543b84ba8c08",
    handler: "onCloseWindow",
    iconfont: layoutTheme === 2 ? "times" : undefined,
    readonly: false,
    type: "BTN",
    uitype: "6",
});

const getCancelBtnConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow-cancel`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    confirmquestion: "static:9b475e25ae8a40b0b158543b84ba8c08",
    confirmquestionposition: "top",
    handler: "onCloseWindow",
    readonly: false,
    type: "BTN",
    uitype: "6",
});

const getDragDropBtnConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_drag-drop`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_drag-drop`,
    mode: "2",
    modeaction: "dragdrop",
    type: "BTN",
});

export const getGridBtnsConfig = (bc: IBuilderConfig, layoutTheme: number): IGridBtnsConfigType => {
    const {components, overrides} = mergeComponents(bc.topbtn, {
        "Override Audit Button": getBtnAuditConfig(bc),
        "Override Cancel Button":
            bc.edittype === "inline" ? getCancelInlineBtnConfig(bc, layoutTheme) : getCancelBtnConfig(bc),
        "Override Delete Button": getBtnDeleteConfig(bc),
        "Override DragDrop Button": getDragDropBtnConfig(bc),
        "Override Excel Button": getBtnExcelConfig(bc),
        "Override Refresh Button": getBtnRefreshConfig(bc),
        "Override Save Button": getSaveBtnConfig(bc, layoutTheme),
    });
    const btnsCollector: IBuilderConfig[] = [];
    const btns: IBuilderConfig[] = [];

    components.forEach((component: IBuilderConfig) => {
        if (component.type === "BTNCOLLECTOR") {
            btnsCollector.push(component);
        } else {
            btns.push(component);
        }
    });

    return {btns, btnsCollector, overrides};
};

export function getOverrideExcelButton(bc: IBuilderConfig) {
    const {overrides} = mergeComponents(bc.topbtn, {
        "Override Excel Button": getBtnExcelConfig(bc),
    });

    return overrides["Override Excel Button"];
}

export function getOverrideDragDropButton(bc: IBuilderConfig) {
    const {overrides} = mergeComponents(bc.topbtn, {
        "Override DragDrop Button": getDragDropBtnConfig(bc),
    });

    return overrides["Override DragDrop Button"];
}

export function getOverrideWindowBottomBtn(bc: IBuilderConfig) {
    const {overrides} = mergeComponents(bc.topbtn, {
        "Override Cancel Button": getCancelBtnConfig(bc),
        "Override Save Button": getSaveBtnConfig(bc, 1),
    });

    return [overrides["Override Save Button"], overrides["Override Cancel Button"]];
}
