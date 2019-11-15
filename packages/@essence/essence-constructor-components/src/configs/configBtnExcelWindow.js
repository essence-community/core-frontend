// @flow
import {type GridModelType} from "../stores/GridModel";

type ConfigBtnExcelWindowType = {
    ckPageObject: string,
    gridStore: GridModelType,
};

const configBtnExcelWindow = ({ckPageObject, gridStore}: ConfigBtnExcelWindowType) => ({
    bottombtn: [
        {
            ...gridStore.gridBtnsConfig.overrides["Override Excel Button"],
            ckMaster: undefined,
            ckObject: `${ckPageObject}_excel_window_btn_print`,
            ckPageObject: `${ckPageObject}_excel_window_btn_print`,
            ckParent: `${ckPageObject}_excel_window`,
            cvDescription: "937E99F97AEA414F97F501E3B8A0B843",
            cvDisplayed: "937e99f97aea414f97f501e3b8a0b843",
            cvName: "Botton Btn Print",
            handler: "onPrintExcel",
            iconfontname: "",
            onlyicon: "false",
            type: "BTN",
            uitype: "1",
        },
        {
            ckObject: `${ckPageObject}_excel_window_btn_cancel`,
            ckPageObject: `${ckPageObject}_excel_window_btn_cancel`,
            ckParent: `${ckPageObject}_excel_window`,
            cvDescription: "64AACC431C4C4640B5F2C45DEF57CAE9",
            cvDisplayed: "64aacc431c4c4640b5f2c45def57cae9",
            cvName: "Botton Btn Close",
            handler: "onCloseWindow",
            type: "BTN",
            uitype: "2",
        },
    ],
    childs: [
        {
            ckObject: `${ckPageObject}_excel_window_filename`,
            ckPageObject: `${ckPageObject}_excel_window_filename`,
            ckParent: `${ckPageObject}_excel_window`,
            column: "excelname",
            cvDescription: "662D857575ED4A26BCA536B18FBAC6FF",
            cvDisplayed: "662d857575ed4a26bca536b18fbac6ff",
            cvName: "File Name",
            datatype: "text",
            defaultvalue: "export_excel",
            maxsize: "128",
            // eslint-disable-next-line quotes
            regexp: '[^\\\\/:*?"<>|+]*[^\\\\/:*?"<>|+ ]',
            required: "true",
            type: "IFIELD",
        },
    ],
    ckObject: `${ckPageObject}_excel_window`,
    ckPageObject: `${ckPageObject}_excel_window`,
    ckParent: ckPageObject,
    ckwindow: "btnexcel",
    cvDescription: "7578080854A84CC3B4FAAD62D4499A4B",
    cvDisplayed: "7578080854a84cc3b4faad62d4499a4b",
    cvName: "Excel Window",
    type: "WIN",
    wintype: "default",
});

export default configBtnExcelWindow;
