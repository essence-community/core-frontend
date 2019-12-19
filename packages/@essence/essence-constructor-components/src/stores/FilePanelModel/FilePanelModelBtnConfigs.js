// @flow
import groupBy from "lodash/groupBy";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CV_DESCRIPTION,
} from "@essence/essence-constructor-share/constants";
import {styleTheme} from "../../constants";
import {mergeComponents} from "../../utils/builder";
import {type FilePanelBcType} from "./FilePanelModelTypes";

const getAddBtnConfig = (bc: FilePanelBcType) => ({
    [VAR_RECORD_CV_DESCRIPTION]: "A1FF62833BA8490FB626BAA1DDF0F0F7",
    [VAR_RECORD_DISPLAYED]: "3a5239ee97d9464c9c4143c18fda9815",
    [VAR_RECORD_NAME]: "Add Document Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_add`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_add`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_ROUTE_PAGE_ID]: bc[VAR_RECORD_ROUTE_PAGE_ID],
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
    [VAR_RECORD_DISPLAYED]: "0e55e1e9994c44f7978f3b76f5bd819f",
    [VAR_RECORD_NAME]: "Override Save Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_gridwindow-save`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow-save`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    filemode: bc.filemode,
    filetypes: "doc,docx,pdf,zip,txt,ods,odt,xls,xlsx",
    handler: "onSimpleSaveWindow",
    maxfile: "5242880",
    mode: "8",
    type: "BTN",
});

export const getCancelBtnConfig = (bc: FilePanelBcType) => ({
    [VAR_RECORD_DISPLAYED]: "64aacc431c4c4640b5f2c45def57cae9",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_gridwindow-cancel`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow-cancel`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    confirmquestion: "9b475e25ae8a40b0b158543b84ba8c08",
    confirmquestionposition: "top",
    handler: "onCloseWindow",
    type: "BTN",
    uitype: "2",
});

export const getDownloadBtnConfig = (bc: FilePanelBcType) => ({
    [VAR_RECORD_DISPLAYED]: "02260da507494f2f9956ba9e0f37b1f1",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-download`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-download`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    type: "BTN",
});

const getDeleteButton = (bc: FilePanelBcType) => ({
    [VAR_RECORD_DISPLAYED]: "f7e324760ede4c88b4f11f0af26c9e97",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
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
