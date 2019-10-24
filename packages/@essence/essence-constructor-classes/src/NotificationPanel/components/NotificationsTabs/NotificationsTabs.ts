import {IBuilderConfig} from "@essence/essence-constructor-share";
import {mergeComponents} from "@essence/essence-constructor-share/utils";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
} from "@essence/essence-constructor-share/constants/variables";

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
        [VAR_RECORD_DISPLAYED]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_DISPLAYED]: "Все",
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
        [VAR_RECORD_DISPLAYED]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_DISPLAYED]: "Информация",
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
        [VAR_RECORD_DISPLAYED]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_DISPLAYED]: "Ошибки",
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
        [VAR_RECORD_DISPLAYED]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_DISPLAYED]: "Предупреждения",
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
        [VAR_RECORD_DISPLAYED]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_DISPLAYED]: "Оповещения",
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
        [VAR_RECORD_DISPLAYED]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_DISPLAYED]: "Разработка",
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
