// @flow
import {type BuilderBaseType} from "../../BuilderType";
import {mergeComponents} from "../../utils/builder";

export function getBackButtonConfig(bc: BuilderBaseType) {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_back`,
        ckPageObject: `${bc.ckPageObject}_back`,
        cvDisplayed: "85c19e316e9e446d9383a9ffe184d19a",
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
        cvDisplayed: "dcfd5234c348410994c690eec7d28028",
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
    cvDisplayed: "8a930c6b5dd440429c0f0e867ce98316",
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
    confirmquestion: "b03cbbb047ca438f920c799c5f48ecaf",
    cvDisplayed: "64aacc431c4c4640b5f2c45def57cae9",
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
