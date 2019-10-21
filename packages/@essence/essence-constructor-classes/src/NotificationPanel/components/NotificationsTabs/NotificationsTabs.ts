import {IBuilderConfig} from "@essence/essence-constructor-share";
import {mergeComponents} from "@essence/essence-constructor-share/utils";

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

export function getAllPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_info`,
        ckPageObject: `${bc.ckPageObject}_info`,
        ckParent: bc.ckPageObject,
        cvDisplayed: "Все",
        cvName: "Override All Tab",
        value: "all",
    };
}

export function getInfoPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_info`,
        ckPageObject: `${bc.ckPageObject}_info`,
        ckParent: bc.ckPageObject,
        cvDisplayed: "Информация",
        cvName: "Override Info Tab",
        value: "info",
    };
}

export function getErrorPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_error`,
        ckPageObject: `${bc.ckPageObject}_error`,
        ckParent: bc.ckPageObject,
        cvDisplayed: "Ошибки",
        cvName: "Override Error Tab",
        value: "error",
    };
}

export function getWarningPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_warning`,
        ckPageObject: `${bc.ckPageObject}_warning`,
        ckParent: bc.ckPageObject,
        cvDisplayed: "Предупреждения",
        cvName: "Override Warning Tab",
        value: "warning",
    };
}

export function getNotificationPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_notification`,
        ckPageObject: `${bc.ckPageObject}_notification`,
        ckParent: bc.ckPageObject,
        cvDisplayed: "Оповещения",
        cvName: "Override Notification Tab",
        value: "notification",
    };
}

export function getDebugPanelConfig(bc: IBuilderConfig): ITabBc {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_debug`,
        ckPageObject: `${bc.ckPageObject}_debug`,
        ckParent: bc.ckPageObject,
        cvDisplayed: "Разработка",
        cvName: "Override Debug Tab",
        hiddenrules: "!(499 in gSessCaActions)",
        value: "debug",
    };
}

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
