// @flow
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CV_DESCRIPTION,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {type GridModelType} from "../stores/GridModel";

type ConfigBtnExcelWindowType = {
    ckPageObject: string,
    gridStore: GridModelType,
};

// eslint-disable-next-line max-lines-per-function
const configBtnExcelWindow = ({ckPageObject, gridStore}: ConfigBtnExcelWindowType) => ({
    [VAR_RECORD_CV_DESCRIPTION]: "static:7578080854a84cc3b4faad62d4499a4b",
    [VAR_RECORD_DISPLAYED]: "static:7578080854a84cc3b4faad62d4499a4b",
    [VAR_RECORD_NAME]: "Excel Window",
    [VAR_RECORD_OBJECT_ID]: `${ckPageObject}_excel_window`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${ckPageObject}_excel_window`,
    [VAR_RECORD_PARENT_ID]: ckPageObject,
    bottombtn: [
        {
            ...gridStore.gridBtnsConfig.overrides["Override Excel Button"],
            [VAR_RECORD_CV_DESCRIPTION]: "static:937e99f97aea414f97f501e3b8a0b843",
            [VAR_RECORD_DISPLAYED]: "static:937e99f97aea414f97f501e3b8a0b843",
            [VAR_RECORD_MASTER_ID]: undefined,
            [VAR_RECORD_NAME]: "Botton Btn Print",
            [VAR_RECORD_OBJECT_ID]: `${ckPageObject}_excel_window_btn_print`,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${ckPageObject}_excel_window_btn_print`,
            [VAR_RECORD_PARENT_ID]: `${ckPageObject}_excel_window`,
            handler: "onPrintExcel",
            iconfontname: "",
            onlyicon: "false",
            type: "BTN",
            uitype: "1",
        },
        {
            [VAR_RECORD_CV_DESCRIPTION]: "static:64aacc431c4c4640b5f2c45def57cae9",
            [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
            [VAR_RECORD_NAME]: "Botton Btn Close",
            [VAR_RECORD_OBJECT_ID]: `${ckPageObject}_excel_window_btn_cancel`,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${ckPageObject}_excel_window_btn_cancel`,
            [VAR_RECORD_PARENT_ID]: `${ckPageObject}_excel_window`,
            handler: "onCloseWindow",
            type: "BTN",
            uitype: "2",
        },
    ],
    childs: [
        {
            [VAR_RECORD_CV_DESCRIPTION]: "static:662d857575ed4a26bca536b18fbac6ff",
            [VAR_RECORD_DISPLAYED]: "static:662d857575ed4a26bca536b18fbac6ff",
            [VAR_RECORD_NAME]: "File Name",
            [VAR_RECORD_OBJECT_ID]: `${ckPageObject}_excel_window_filename`,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${ckPageObject}_excel_window_filename`,
            [VAR_RECORD_PARENT_ID]: `${ckPageObject}_excel_window`,
            column: "excelname",
            datatype: "text",
            defaultvalue: "export_excel",
            maxsize: "128",
            // eslint-disable-next-line quotes
            regexp: '[^\\\\/:*?"<>|+]*[^\\\\/:*?"<>|+ ]',
            required: "true",
            type: "IFIELD",
        },
    ],
    ckwindow: "btnexcel",
    type: "WIN",
    wintype: "default",
});

export default configBtnExcelWindow;
