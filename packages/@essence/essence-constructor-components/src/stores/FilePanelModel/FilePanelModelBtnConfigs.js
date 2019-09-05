// @flow
import groupBy from "lodash/groupBy";
import {styleTheme} from "../../constants";
import {mergeComponents} from "../../utils/builder";
import {type FilePanelBcType} from "./FilePanelModelTypes";

const getAddBtnConfig = (bc: FilePanelBcType) => ({
    ckObject: `${bc.ckObject}_add`,
    ckPage: bc.ckPage,
    ckPageObject: `${bc.ckPageObject}_add`,
    ckParent: bc.ckPageObject,
    cvDescription: "Кнопка добавления документа",
    cvDisplayed: "Добавить",
    cvName: "Add Document Button",
    handler: "addFileAction",
    hidden: styleTheme === "light" ? undefined : "false",
    iconfont: "fa-plus",
    iconfontname: "fa",
    mode: "1",
    reqsel: "false",
    type: "BTN",
    uitype: "1",
});

export const getSaveBtnConfig = (bc: FilePanelBcType) => ({
    ckObject: `${bc.ckObject}_gridwindow-save`,
    ckPageObject: `${bc.ckPageObject}_gridwindow-save`,
    ckParent: `${bc.ckPageObject}_gridwindow`,
    cvDisplayed: "Добавить файл",
    cvName: "Override Save Button",
    filemode: bc.filemode,
    filetypes: "doc,docx,pdf,zip,txt,ods,odt,xls,xlsx",
    handler: "onSimpleSaveWindow",
    maxfile: "5242880",
    mode: "8",
    type: "BTN",
});

export const getCancelBtnConfig = (bc: FilePanelBcType) => ({
    ckObject: `${bc.ckObject}_gridwindow-cancel`,
    ckPageObject: `${bc.ckPageObject}_gridwindow-cancel`,
    ckParent: `${bc.ckPageObject}_gridwindow`,
    confirmquestion: "Отменить?",
    confirmquestionposition: "top",
    cvDisplayed: "Отмена",
    handler: "onCloseWindow",
    type: "BTN",
    uitype: "2",
});

export const getDownloadBtnConfig = (bc: FilePanelBcType) => ({
    ckObject: `${bc.ckObject}-download`,
    ckPageObject: `${bc.ckPageObject}-download`,
    ckParent: bc.ckPageObject,
    cvDisplayed: "Загрузить",
    type: "BTN",
});

const getDeleteButton = (bc: FilePanelBcType) => ({
    ckObject: `${bc.ckObject}-cancel`,
    ckPageObject: `${bc.ckPageObject}-cancel`,
    ckParent: bc.ckPageObject,
    cvDisplayed: "Удалить",
    handler: "deleteAction",
    iconfont: "times",
    iconfontname: "fa",
    onlyicon: "true",
    type: "BTN",
});

export const getFilePanelBtnsConfig = (bc: FilePanelBcType) => {
    const {components, overrides} = mergeComponents(bc.topbtn, {
        "Override Add Button": getAddBtnConfig(bc),
        "Override Cancel Button": getCancelBtnConfig(bc),
        "Override Delete Button": getDeleteButton(bc),
        "Override Download Button": getDownloadBtnConfig(bc),
        "Override Save Button": getSaveBtnConfig(bc),
    });

    const {BTN = [], BTNCOLLECTOR} = groupBy(components, "type");

    return {btns: BTN, btnsCollector: BTNCOLLECTOR, overrides};
};
