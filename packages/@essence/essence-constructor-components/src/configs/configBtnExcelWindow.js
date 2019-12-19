// @flow
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CV_DESCRIPTION,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
} from "@essence/essence-constructor-share/constants";
import {type GridModelType} from "../stores/GridModel";

type ConfigBtnExcelWindowType = {
    ckPageObject: string,
    gridStore: GridModelType,
};

// eslint-disable-next-line max-lines-per-function
const configBtnExcelWindow = ({ckPageObject, gridStore}: ConfigBtnExcelWindowType) => ({
    [VAR_RECORD_CV_DESCRIPTION]: "7578080854A84CC3B4FAAD62D4499A4B",
    [VAR_RECORD_DISPLAYED]: "7578080854a84cc3b4faad62d4499a4b",
    [VAR_RECORD_NAME]: "Excel Window",
    [VAR_RECORD_OBJECT_ID]: `${ckPageObject}_excel_window`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${ckPageObject}_excel_window`,
    [VAR_RECORD_PARENT_ID]: ckPageObject,
    bottombtn: [
        {
            ...gridStore.gridBtnsConfig.overrides["Override Excel Button"],
            [VAR_RECORD_CV_DESCRIPTION]: "937E99F97AEA414F97F501E3B8A0B843",
            [VAR_RECORD_DISPLAYED]: "937e99f97aea414f97f501e3b8a0b843",
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
            [VAR_RECORD_CV_DESCRIPTION]: "64AACC431C4C4640B5F2C45DEF57CAE9",
            [VAR_RECORD_DISPLAYED]: "64aacc431c4c4640b5f2c45def57cae9",
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
            [VAR_RECORD_CV_DESCRIPTION]: "662D857575ED4A26BCA536B18FBAC6FF",
            [VAR_RECORD_DISPLAYED]: "662d857575ed4a26bca536b18fbac6ff",
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
