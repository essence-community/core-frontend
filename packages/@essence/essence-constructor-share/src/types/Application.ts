import {ObservableMap} from "./Base";
import {IRecordsModelConstructor} from "./RecordsModel";

export interface ISession {
    session: string;
    cvLogin: string;
    caActions: number[];
    mode: "reports" | "page";
}
export interface IConfigs {
    baseUrl: string;
    colors: string[];
}

export interface IApplicationModel {
    authData: object;
    session: string;
    blockText: string;
    cvLogin: string;
    caActions: number[];
    snackbarStore: any;
    pagesStore: any;
    isApplicationReady: boolean;
    isBlock: boolean;
    globalValues: ObservableMap<string, any>;
    routesStore: any;
    mode: "reports" | "page";
    settingsStore: any;
    configs: IConfigs,
    setSesssionAction: (session: ISession) => void;
    logoutAction: () => void;
    redirectToAction: (ckPage: string, params: object) => void;
    updateGlobalValuesAction: (values: object) => void;
    blockApplicationAction: (type: string, text: string) => void;
    loadApplicationAction: () => void;
    initWsClient: (session: string) => void;
}
