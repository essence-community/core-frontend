// @flow
import groupBy from "lodash/groupBy";
import {mergeComponents} from "../../utils/builder";
import {styleTheme} from "../../constants";
import {type GridBuilderType, type GridModelType, type GridBtnsConfigType} from "./GridModelType";

const getBtnDeleteConfig = (bc: GridBuilderType) => ({
    ckMaster: bc.ckPageObject,
    ckPageObject: `${bc.ckPageObject}-remove`,
    cnOrder: 1e6,
    confirmquestion: "0cd0fc9bff2641f68f0f9712395f7b82",
    cvDisplayed: "f7e324760ede4c88b4f11f0af26c9e97",
    handler: "removeSelectedRecordAction",
    iconfont: "trash-o",
    onlyicon: "true",
    reqsel: "true",
});

const getBtnAuditConfig = (bc: GridBuilderType) => ({
    ckMaster: bc.ckPageObject,
    ckPageObject: `${bc.ckPageObject}-audit`,
    cnOrder: 1e6,
    cvDisplayed: "627518f4034947aa9989507c5688cfff",
    iconfont: "info",
    iconfontname: "fa",
    onlyicon: "true",
    readonly: "false",
    reqsel: "true",
});

const getBtnRefreshConfig = (bc: GridBuilderType, handler: Function) => ({
    ckMaster: bc.ckPageObject,
    ckPageObject: `${bc.ckPageObject}-refresh`,
    cnOrder: 1e6,
    cvDisplayed: "33c9b02a9140428d9747299b9a767abb",
    handlerFn: handler,
    iconfont: "refresh",
    iconfontname: "fa",
    onlyicon: "true",
    readonly: "false",
});

const getBtnExcelConfig = (bc: GridBuilderType) => ({
    ckMaster: bc.ckPageObject,
    ckPageObject: `${bc.ckPageObject}-excel`,
    ckwindow: "btnexcel",
    cnOrder: 1e6,
    cvDisplayed: "7578080854a84cc3b4faad62d4499a4b",
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
    ckPageObject: `${bc.ckPageObject}_gridwindow-save`,
    ckParent: `${bc.ckPageObject}_gridwindow`,
    cnOrder: 1e6,
    cvDisplayed: "8a930c6b5dd440429c0f0e867ce98316",
    handler: "onSimpleSaveWindow",
    iconfont: bc.edittype === "inline" && styleTheme === "dark" ? "save" : undefined,
});

const getCancelInlineBtnConfig = (bc: GridBuilderType) => ({
    ckPageObject: `${bc.ckPageObject}_gridwindow-cancel`,
    ckParent: `${bc.ckPageObject}_gridwindow`,
    cnOrder: 1e6,
    confirmquestion: "9b475e25ae8a40b0b158543b84ba8c08",
    cvDisplayed: "64aacc431c4c4640b5f2c45def57cae9",
    handler: "onCloseWindow",
    iconfont: styleTheme === "dark" ? "times" : undefined,
});

const getCancelBtnConfig = (bc: GridBuilderType) => ({
    ckPageObject: `${bc.ckPageObject}_gridwindow-cancel`,
    ckParent: `${bc.ckPageObject}_gridwindow`,
    cnOrder: 1e6,
    confirmquestion: "9b475e25ae8a40b0b158543b84ba8c08",
    confirmquestionposition: "top",
    cvDisplayed: "64aacc431c4c4640b5f2c45def57cae9",
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
