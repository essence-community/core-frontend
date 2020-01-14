import {IBuilderConfig} from "@essence-community/constructor-share";
import {mergeComponents} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants/variables";

export const mapNotification = {
    all: 0,
    block: 7,
    debug: 5,
    error: 2,
    errorUpload: 10,
    info: 1,
    notification: 4,
    progress: 6,
    unblock: 8,
    uploaded: 9,
    warning: 3,
};

// @ts-ignore
export interface ITabBc extends IBuilderConfig, Record<string, string> {
    value: string;
}
/* eslint-disable sort-keys */

export function getAllPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_info`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_info`,
        [VAR_RECORD_DISPLAYED]: "static:bfecce4e8b9844afab513efa5ea53353",
        [VAR_RECORD_NAME]: "Override All Tab",
        value: "all",
    };
}

export function getInfoPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_info`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_info`,
        [VAR_RECORD_DISPLAYED]: "static:627518f4034947aa9989507c5688cfff",
        [VAR_RECORD_NAME]: "Override Info Tab",
        value: "info",
    };
}

export function getErrorPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_error`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_error`,
        [VAR_RECORD_DISPLAYED]: "static:7185a3b731b14e1ea8fb86056b571fe5",
        [VAR_RECORD_NAME]: "Override Error Tab",
        value: "error",
    };
}

export function getWarningPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_warning`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_warning`,
        [VAR_RECORD_DISPLAYED]: "static:10666aec26534e179b22f681700f22b7",
        [VAR_RECORD_NAME]: "Override Warning Tab",
        value: "warning",
    };
}

export function getNotificationPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_notification`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_notification`,
        [VAR_RECORD_DISPLAYED]: "static:880a932500234fa2b2f22a4b36bd6cd8",
        [VAR_RECORD_NAME]: "Override Notification Tab",
        value: "notification",
    };
}

export function getDebugPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_debug`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_debug`,
        [VAR_RECORD_DISPLAYED]: "static:1650aebec6b348f094680ba725441ef0",
        [VAR_RECORD_NAME]: "Override Debug Tab",
        hiddenrules: "!(499 in gSessCaActions)",
        value: "debug",
    };
}
/* eslint-enable sort-keys */
export const getTabsData = (bc: IBuilderConfig, childs: IBuilderConfig[]): ITabBc[] => {
    const {overrides} = mergeComponents(childs, {
        "Override All Tab": getAllPanelConfig(bc),
        "Override Debug Tab": getDebugPanelConfig(bc),
        "Override Error Tab": getErrorPanelConfig(bc),
        "Override Info Tab": getInfoPanelConfig(bc),
        "Override Notification Tab": getNotificationPanelConfig(bc),
        "Override Warning Tab": getWarningPanelConfig(bc),
    });
    const tabsBc = [
        overrides["Override All Tab"],
        overrides["Override Info Tab"],
        overrides["Override Error Tab"],
        overrides["Override Warning Tab"],
        overrides["Override Notification Tab"],
        overrides["Override Debug Tab"],
    ];

    return tabsBc;
};
