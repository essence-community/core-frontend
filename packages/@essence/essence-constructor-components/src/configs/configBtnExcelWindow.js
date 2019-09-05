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
            cvDescription: "Печать",
            cvDisplayed: "Печать",
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
            cvDescription: "Отмена",
            cvDisplayed: "Отмена",
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
            cvDescription: "Hаименование файла",
            cvDisplayed: "Hаименование файла",
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
    cvDescription: "Печать в excel",
    cvDisplayed: "Печать в excel",
    cvName: "Excel Window",
    type: "WIN",
    wintype: "default",
});

export default configBtnExcelWindow;
