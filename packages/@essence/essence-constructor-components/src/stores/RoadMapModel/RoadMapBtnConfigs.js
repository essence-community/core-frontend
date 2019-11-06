// @flow
import {type BuilderBaseType} from "../../BuilderType";
import {mergeComponents} from "../../utils/builder";

export function getBackButtonConfig(bc: BuilderBaseType) {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_back`,
        ckPageObject: `${bc.ckPageObject}_back`,
        cvDisplayed: "Назад",
        cvName: "Override Back Button",
        handler: "setBackTab",
        hiddenrules: "gIsStart",
        readonly: "false",
        type: "BTN",
        uitype: "2",
    };
}

export function getNextButtonConfig(bc: BuilderBaseType) {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_next`,
        ckPageObject: `${bc.ckPageObject}_next`,
        cvDisplayed: "Далее",
        cvName: "Override Next Button",
        handler: "setNextTab",
        hiddenrules: "gIsEnd",
        readonly: "false",
        type: "BTN",
    };
}

export const getSaveBtnConfig = (bc: BuilderBaseType) => ({
    ckObject: `${bc.ckObject}-save`,
    ckPageObject: `${bc.ckPageObject}-save`,
    ckParent: bc.ckPageObject,
    cvDisplayed: "Сохранить",
    cvName: "Override Save Button",
    handler: "onSimpleSave",
    hiddenrules: "!gIsEnd",
    mode: "1",
    type: "BTN",
});

export const getCancelBtnConfig = (bc: BuilderBaseType) => ({
    ckObject: `${bc.ckObject}-cancel`,
    ckPageObject: `${bc.ckPageObject}-cancel`,
    ckParent: bc.ckPageObject,
    confirmquestion: "Сбросить все данные?",
    cvDisplayed: "Отмена",
    cvName: "Override Cancel Button",
    handler: "onSimpleCancel",
    type: "BTN",
    uitype: "2",
});

export const getBtn = (bc: BuilderBaseType, topbtn: Array<BuilderBaseType>) => {
    const {overrides} = mergeComponents(topbtn, {
        "Override Back Button": getBackButtonConfig(bc),
        "Override Cancel Button": getCancelBtnConfig(bc),
        "Override Next Button": getNextButtonConfig(bc),
        "Override Save Button": getSaveBtnConfig(bc),
    });
    const btns = [
        overrides["Override Back Button"],
        overrides["Override Next Button"],
        overrides["Override Save Button"],
        overrides["Override Cancel Button"],
    ];

    btns.forEach((btn: BuilderBaseType) => {
        if (btn.hiddenrules) {
            btn.hiddenrules = btn.hiddenrules
                .replace(/gIsStart/gi, `gIsStart_${bc.ckPageObject}`)
                .replace(/gIsEnd/gi, `gIsEnd_${bc.ckPageObject}`)
                .replace(/gPanelNum/gi, `gPanelNum_${bc.ckPageObject}`)
                .replace(/gPanelIndex/gi, `gPanelIndex_${bc.ckPageObject}`);
        }
        if (btn.disabledrules) {
            btn.disabledrules = btn.disabledrules
                .replace(/gIsStart/gi, `gIsStart_${bc.ckPageObject}`)
                .replace(/gIsEnd/gi, `gIsEnd_${bc.ckPageObject}`)
                .replace(/gPanelNum/gi, `gPanelNum_${bc.ckPageObject}`)
                .replace(/gPanelIndex/gi, `gPanelIndex_${bc.ckPageObject}`);
        }
        if (btn.getglobaltostore) {
            btn.getglobaltostore = btn.getglobaltostore
                .replace(/gIsStart/gi, `gIsStart_${bc.ckPageObject}`)
                .replace(/gIsEnd/gi, `gIsEnd_${bc.ckPageObject}`)
                .replace(/gPanelNum/gi, `gPanelNum_${bc.ckPageObject}`)
                .replace(/gPanelIndex/gi, `gPanelIndex_${bc.ckPageObject}`);
        }
    });

    return btns;
};
