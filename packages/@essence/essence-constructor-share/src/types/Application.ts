import {ObservableMap} from "mobx";
import {History} from "history";
import {VAR_RECORD_CV_LOGIN, VAR_RECORD_CA_ACTIONS} from "../constants";
import {TFunction} from "../utils/I18n";
import {IRoutesModel} from "./RoutesModel";
import {IStoreBaseModel} from "./StoreBaseModel";
import {TText} from "./SnackbarModel";
import {IBuilderConfig, FieldValue, IAuthModel, IPagesModel, IAuthSession} from ".";

export interface ISession {
    session: string;
    [VAR_RECORD_CV_LOGIN]: string;
    [VAR_RECORD_CA_ACTIONS]: number[];
}
export interface IConfigs {
    baseUrl: string;
    colors: string[];
}

export interface IApplicationModel extends IStoreBaseModel {
    routesStore: IRoutesModel | null;
    bc: IBuilderConfig;
    authStore: IAuthModel;
    globalValues: ObservableMap<string, FieldValue>;
    isApplicationReady: boolean;
    wsClient: WebSocket | null;
    countConnect: number;
    isBlock: boolean;
    blockText: string | ((trans: TFunction) => string);
    pagesStore: IPagesModel;
    history: History;
    url: string;
    defaultValue: string;
    updateGlobalValuesAction(values: Record<string, string>): void;
    setSesssionAction(userInfo: IAuthSession): Promise<void>;
    logoutAction(): void;
    redirectToAction(pageId: string, params: Record<string, FieldValue>): Promise<void>;
    loadApplictionConfigs(): Promise<void>;
    loadApplicationAction(): Promise<boolean>;
    blockApplicationAction(type: string, text: TText): void;
    initWsClient(session: string): void;
    handleWsMessage(msg: MessageEvent): void;
    reloadUserInfoAction(authValues: IAuthSession): void;
    reloadPageObjectAction(pageId: string, ckPageObject: string): void;
    reloadApplication(appName: string, routerPageId?: string, filter?: string): Promise<void>;
    handleChangeUrl(url: string): Promise<void>;
    handleSetPage(pageId: string, filter?: string): Promise<void>;
}
