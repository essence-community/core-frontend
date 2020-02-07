// @flow
import cloneDeep from "lodash/cloneDeep";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CV_DESCRIPTION,
} from "@essence-community/constructor-share/constants";
import {choiceWindow} from "../../utils/choiceWindow";
import configBtnExcelWindow from "../../configs/configBtnExcelWindow";
import {type AddWinowToPagePropsType} from "./WindowModelTypes";
import {WindowModel} from "./WindowModel";

const getDefaultWindowBc = (bc) => ({
    [VAR_RECORD_CV_DESCRIPTION]: bc[VAR_RECORD_CV_DESCRIPTION],
    [VAR_RECORD_DISPLAYED]: "",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_NAME]: `${bc[VAR_RECORD_NAME]}_gridwindow`,
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_ROUTE_PAGE_ID]: bc[VAR_RECORD_ROUTE_PAGE_ID],
    autobuild: "true",
    bottombtn: [],
    checkaddmore: bc.checkaddmore,
    childs: [],
    ckwindow: "gridwindow",
    columns: bc.columns,
    detail: bc.detail,
    edittype: bc.edittype,
    stepnamenext: bc.stepnamenext,
    wintype: bc.wintype,
});

// eslint-disable-next-line max-statements
const getWindowBc = ({btnBc, ckWindowDefault, pageStore, gridStore}: AddWinowToPagePropsType) => {
    const {bc} = gridStore;
    let windowBc = null;
    let ckwindow = ckWindowDefault ? ckWindowDefault : btnBc.ckwindow;

    if (ckwindow && ckwindow.indexOf("\x22") > -1) {
        ckwindow = choiceWindow(ckwindow, pageStore, gridStore.recordsStore);
    }

    if (ckwindow === "btnexcel") {
        return configBtnExcelWindow({ckPageObject: gridStore.bc[VAR_RECORD_PAGE_OBJECT_ID], gridStore});
    } else if (bc.childwindow) {
        windowBc = bc.childwindow.find(
            (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === ckwindow,
        );
    }

    return windowBc || getDefaultWindowBc(bc);
};

/**
 * Создает новое окно с инициализацией.
 *
 *
 * @param {AddWinowToPagePropsType} props Парамтеры для создания окна
 * @returns {void}
 */
export const addWinowToPage = (props: AddWinowToPagePropsType) => {
    const {pageStore, gridStore, mode} = props;
    const bc = getWindowBc(props);
    const windowStore = new WindowModel({
        bc,
        gridStore,
        mode,
        pageStore,
        values:
            mode === "1" || !gridStore.recordsStore.selectedRecord
                ? {}
                : cloneDeep(gridStore.recordsStore.selectedRecord),
    });

    pageStore.windowsOne.push(windowStore);
};
