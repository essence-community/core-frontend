// @flow
import cloneDeep from "lodash/cloneDeep";
import {choiceWindow} from "../../utils/choiceWindow";
import configBtnExcelWindow from "../../configs/configBtnExcelWindow";
import {type AddWinowToPagePropsType} from "./WindowModelTypes";
import {WindowModel} from "./WindowModel";

const getDefaultWindowBc = (bc) => ({
    autobuild: "true",
    bottombtn: [],
    checkaddmore: bc.checkaddmore,
    childs: [],
    ckMaster: bc.ckPageObject,
    ckObject: `${bc.ckPageObject}_gridwindow`,
    ckPage: bc.ckPage,
    ckPageObject: `${bc.ckPageObject}_gridwindow`,
    ckParent: bc.ckPageObject,
    ckwindow: "gridwindow",
    columns: bc.columns,
    cvDescription: bc.cvDescription,
    cvDisplayed: "",
    cvName: `${bc.cvName}_gridwindow`,
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
        return configBtnExcelWindow({ckPageObject: gridStore.bc.ckPageObject, gridStore});
    } else if (bc.childwindow) {
        windowBc = bc.childwindow.find(
            (childwindow) => (childwindow.ckwindow || childwindow.ckPageObject) === ckwindow,
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
