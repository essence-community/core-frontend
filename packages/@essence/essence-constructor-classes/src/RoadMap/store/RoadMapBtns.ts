import {IBuilderConfig} from "@essence-community/constructor-share/types";
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
} from "@essence-community/constructor-share/constants";
import {mergeComponents} from "@essence-community/constructor-share/utils";

export function getBackButtonConfig(bc: IBuilderConfig): IBuilderConfig {
    return {
        [VAR_RECORD_DISPLAYED]: "static:85c19e316e9e446d9383a9ffe184d19a",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Back Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_back`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_back`,
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        handler: "onBackTab",
        hiddenrules: VAR_RECORD_G_IS_START,
        iconfont: "angle-double-left",
        readonly: false,
        type: "BTN",
        uitype: "2",
    };
}

export function getNextButtonConfig(bc: IBuilderConfig): IBuilderConfig {
    return {
        [VAR_RECORD_DISPLAYED]: "static:dcfd5234c348410994c690eec7d28028",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Next Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_next`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_next`,
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        handler: "onNextTab",
        hiddenrules: VAR_RECORD_G_IS_END,
        iconfont: "angle-double-right",
        readonly: false,
        type: "BTN",
        uitype: "1",
    };
}

export const getSaveBtnConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:8a930c6b5dd440429c0f0e867ce98316",
    [VAR_RECORD_NAME]: "Override Save Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-save`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-save`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    handler: "onSimpleSave",
    hiddenrules: `!${VAR_RECORD_G_IS_END}`,
    mode: "1",
    type: "BTN",
    uitype: "1",
});

export const getCancelBtnConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
    [VAR_RECORD_NAME]: "Override Cancel Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    confirmquestion: "static:b03cbbb047ca438f920c799c5f48ecaf",
    handler: "onSimpleCancel",
    readonly: false,
    type: "BTN",
    uitype: "2",
});

export const getBtn = (bc: IBuilderConfig, topbtn: IBuilderConfig[]) => {
    const {overrides} = mergeComponents(
        topbtn,
        {
            "Override Back Button": getBackButtonConfig(bc),
            "Override Cancel Button": getCancelBtnConfig(bc),
            "Override Next Button": getNextButtonConfig(bc),
            "Override Save Button": getSaveBtnConfig(bc),
        },
        {
            include: [VAR_RECORD_MASTER_ID, "setglobal"],
        },
    );
    const btns = [
        overrides["Override Back Button"],
        overrides["Override Next Button"],
        overrides["Override Save Button"],
        overrides["Override Cancel Button"],
    ];

    btns.forEach((btn: IBuilderConfig) => {
        if (btn.hiddenrules) {
            btn.hiddenrules = btn.hiddenrules
                .replace(
                    new RegExp(VAR_RECORD_G_IS_START, "giu"),
                    `g_is_start_${bc.ckobject || bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                )
                .replace(
                    new RegExp(VAR_RECORD_G_IS_END, "giu"),
                    `g_is_end_${bc.ckobject || bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                )
                .replace(
                    new RegExp(VAR_RECORD_G_PANEL_NUM, "giu"),
                    `g_panel_num_${bc.ckobject || bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                )
                .replace(
                    new RegExp(VAR_RECORD_G_PANEL_INDEX, "giu"),
                    `g_panel_index_${bc.ckobject || bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                );
        }
        if (btn.disabledrules) {
            btn.disabledrules = btn.disabledrules
                .replace(
                    new RegExp(VAR_RECORD_G_IS_START, "giu"),
                    `g_is_start_${bc.ckobject || bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                )
                .replace(
                    new RegExp(VAR_RECORD_G_IS_END, "giu"),
                    `g_is_end_${bc.ckobject || bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                )
                .replace(
                    new RegExp(VAR_RECORD_G_PANEL_NUM, "giu"),
                    `g_panel_num_${bc.ckobject || bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                )
                .replace(
                    new RegExp(VAR_RECORD_G_PANEL_INDEX, "giu"),
                    `g_panel_index_${bc.ckobject || bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                );
        }
        if (btn.getglobaltostore) {
            btn.getglobaltostore = btn.getglobaltostore.map((params) => ({
                ...params,
                in: `${params.in}_${bc.ckobject || bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
            }));
        }
    });

    return btns;
};
