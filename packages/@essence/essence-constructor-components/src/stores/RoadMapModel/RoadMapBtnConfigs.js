// @flow
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    VAR_RECORD_G_IS_START,
    VAR_RECORD_G_IS_END,
    VAR_RECORD_G_PANEL_NUM,
    VAR_RECORD_G_PANEL_INDEX,
} from "@essence/essence-constructor-share/constants";
import {type BuilderBaseType} from "../../BuilderType";
import {mergeComponents} from "../../utils/builder";

export function getBackButtonConfig(bc: BuilderBaseType) {
    return {
        [VAR_RECORD_DISPLAYED]: "static:85c19e316e9e446d9383a9ffe184d19a",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Back Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_back`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_back`,
        handler: "setBackTab",
        hiddenrules: VAR_RECORD_G_IS_START,
        readonly: "false",
        type: "BTN",
        uitype: "2",
    };
}

export function getNextButtonConfig(bc: BuilderBaseType) {
    return {
        [VAR_RECORD_DISPLAYED]: "static:dcfd5234c348410994c690eec7d28028",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Next Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_next`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_next`,
        handler: "setNextTab",
        hiddenrules: VAR_RECORD_G_IS_END,
        readonly: "false",
        type: "BTN",
    };
}

export const getSaveBtnConfig = (bc: BuilderBaseType) => ({
    [VAR_RECORD_DISPLAYED]: "static:8a930c6b5dd440429c0f0e867ce98316",
    [VAR_RECORD_NAME]: "Override Save Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-save`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-save`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    handler: "onSimpleSave",
    hiddenrules: `!${VAR_RECORD_G_IS_END}`,
    mode: "1",
    type: "BTN",
});

export const getCancelBtnConfig = (bc: BuilderBaseType) => ({
    [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
    [VAR_RECORD_NAME]: "Override Cancel Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    confirmquestion: "static:b03cbbb047ca438f920c799c5f48ecaf",
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
                .replace(new RegExp(VAR_RECORD_G_IS_START, "giu"), `gIsStart_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`)
                .replace(new RegExp(VAR_RECORD_G_IS_END, "giu"), `gIsEnd_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`)
                .replace(new RegExp(VAR_RECORD_G_PANEL_NUM, "giu"), `gPanelNum_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`)
                .replace(new RegExp(VAR_RECORD_G_PANEL_INDEX, "giu"), `gPanelIndex_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`);
        }
        if (btn.disabledrules) {
            btn.disabledrules = btn.disabledrules
                .replace(new RegExp(VAR_RECORD_G_IS_START, "giu"), `gIsStart_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`)
                .replace(new RegExp(VAR_RECORD_G_IS_END, "giu"), `gIsEnd_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`)
                .replace(new RegExp(VAR_RECORD_G_PANEL_NUM, "giu"), `gPanelNum_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`)
                .replace(new RegExp(VAR_RECORD_G_PANEL_INDEX, "giu"), `gPanelIndex_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`);
        }
        if (btn.getglobaltostore) {
            btn.getglobaltostore = btn.getglobaltostore
                .replace(new RegExp(VAR_RECORD_G_IS_START, "giu"), `gIsStart_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`)
                .replace(new RegExp(VAR_RECORD_G_IS_END, "giu"), `gIsEnd_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`)
                .replace(new RegExp(VAR_RECORD_G_PANEL_NUM, "giu"), `gPanelNum_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`)
                .replace(new RegExp(VAR_RECORD_G_PANEL_INDEX, "giu"), `gPanelIndex_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`);
        }
    });

    return btns;
};
