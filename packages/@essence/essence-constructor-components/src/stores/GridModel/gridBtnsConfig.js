// @flow
import groupBy from "lodash/groupBy";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_CN_ORDER,
} from "@essence/essence-constructor-share/constants";
import {mergeComponents} from "../../utils/builder";
import {styleTheme} from "../../constants";
import {type GridBuilderType, type GridModelType, type GridBtnsConfigType} from "./GridModelType";

const getBtnDeleteConfig = (bc: GridBuilderType) => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:f7e324760ede4c88b4f11f0af26c9e97",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-remove`,
    confirmquestion: "static:0cd0fc9bff2641f68f0f9712395f7b82",
    handler: "removeSelectedRecordAction",
    iconfont: "trash-o",
    onlyicon: "true",
    reqsel: "true",
});

const getBtnAuditConfig = (bc: GridBuilderType) => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:627518f4034947aa9989507c5688cfff",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-audit`,
    iconfont: "info",
    iconfontname: "fa",
    onlyicon: "true",
    readonly: "false",
    reqsel: "true",
});

const getBtnRefreshConfig = (bc: GridBuilderType, handler: Function) => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:33c9b02a9140428d9747299b9a767abb",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-refresh`,
    handlerFn: handler,
    iconfont: "refresh",
    iconfontname: "fa",
    onlyicon: "true",
    readonly: "false",
});

const getBtnExcelConfig = (bc: GridBuilderType) => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:7578080854a84cc3b4faad62d4499a4b",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-excel`,
    ckwindow: "btnexcel",
    disabledemptymaster: "true",
    edit: "false",
    extraplugingate: "PrintJasperServer",
    handler: "onCreateChildWindowMaster",
    iconfont: "table",
    iconfontname: "fa",
    onlyicon: "true",
    readonly: "false",
});

const getSaveBtnConfig = (bc: GridBuilderType) => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:8a930c6b5dd440429c0f0e867ce98316",
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow-save`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    handler: "onSimpleSaveWindow",
    iconfont: bc.edittype === "inline" && styleTheme === "dark" ? "save" : undefined,
});

const getCancelInlineBtnConfig = (bc: GridBuilderType) => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow-cancel`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    confirmquestion: "static:9b475e25ae8a40b0b158543b84ba8c08",
    handler: "onCloseWindow",
    iconfont: styleTheme === "dark" ? "times" : undefined,
});

const getCancelBtnConfig = (bc: GridBuilderType) => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow-cancel`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    confirmquestion: "static:9b475e25ae8a40b0b158543b84ba8c08",
    confirmquestionposition: "top",
    handler: "onCloseWindow",
    type: "BTN",
    uitype: "2",
});

export const getGridBtnsConfig = (bc: GridBuilderType, gridStore: GridModelType): GridBtnsConfigType => {
    const handleRefresh = async () => {
        if (gridStore.recordsStore.loadCounter > 0 || (await gridStore.applyFiltersAction())) {
            await gridStore.loadRecordsAction();
        }
    };

    const {components, overrides} = mergeComponents(bc.topbtn, {
        "Override Audit Button": getBtnAuditConfig(bc),
        "Override Cancel Button": bc.edittype === "inline" ? getCancelInlineBtnConfig(bc) : getCancelBtnConfig(bc),
        "Override Delete Button": getBtnDeleteConfig(bc),
        "Override Excel Button": getBtnExcelConfig(bc),
        "Override Refresh Button": getBtnRefreshConfig(bc, handleRefresh),
        "Override Save Button": getSaveBtnConfig(bc),
    });

    const {BTN = [], BTNCOLLECTOR} = groupBy(components, "type");

    return {btns: BTN, btnsCollector: BTNCOLLECTOR, overrides};
};
