// @flow
import groupBy from "lodash/groupBy";
import {mergeComponents} from "../../utils/builder";
import {styleTheme} from "../../constants";
import {type GridBuilderType, type GridModelType, type GridBtnsConfigType} from "./GridModelType";

const getBtnDeleteConfig = (bc: GridBuilderType) => ({
    ckMaster: bc.ckPageObject,
    ckPageObject: `${bc.ckPageObject}-remove`,
    cnOrder: 1e10,
    confirmquestion: "Удалить?",
    cvDisplayed: "Удалить",
    handler: "removeSelectedRecordAction",
    iconfont: "trash-o",
    onlyicon: "true",
    reqsel: "true",
});

const getBtnAuditConfig = (bc: GridBuilderType) => ({
    ckMaster: bc.ckPageObject,
    ckPageObject: `${bc.ckPageObject}-audit`,
    cnOrder: 1e10,
    cvDisplayed: "Информация",
    iconfont: "info",
    iconfontname: "fa",
    onlyicon: "true",
    readonly: "false",
    reqsel: "true",
});

const getBtnRefreshConfig = (bc: GridBuilderType, handler: Function) => ({
    ckMaster: bc.ckPageObject,
    ckPageObject: `${bc.ckPageObject}-refresh`,
    cnOrder: 1e10,
    cvDisplayed: "Обновить",
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
    cnOrder: 1e10,
    cvDisplayed: "Печать в excel",
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
    cnOrder: 1e10,
    cvDisplayed: "Сохранить",
    handler: "onSimpleSaveWindow",
    iconfont: bc.edittype === "inline" && styleTheme === "dark" ? "save" : undefined,
});

const getCancelInlineBtnConfig = (bc: GridBuilderType) => ({
    ckPageObject: `${bc.ckPageObject}_gridwindow-cancel`,
    ckParent: `${bc.ckPageObject}_gridwindow`,
    cnOrder: 1e10,
    confirmquestion: "Отменить?",
    cvDisplayed: "Отмена",
    handler: "onCloseWindow",
    iconfont: styleTheme === "dark" ? "times" : undefined,
});

const getCancelBtnConfig = (bc: GridBuilderType) => ({
    ckPageObject: `${bc.ckPageObject}_gridwindow-cancel`,
    ckParent: `${bc.ckPageObject}_gridwindow`,
    cnOrder: 1e10,
    confirmquestion: "Отменить?",
    confirmquestionposition: "top",
    cvDisplayed: "Отмена",
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
