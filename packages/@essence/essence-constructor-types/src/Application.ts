import type {ObservableMap} from "mobx";
import type {History} from "history";
import type {TFunction} from "i18next";
import type {IRoutesModel} from "./RoutesModel";
import type {IStoreBaseModel} from "./StoreBaseModel";
import type {IBuilderConfig, FieldValue, TText} from "./Builder";
import type {IAuthModel, IAuthSession} from "./AuthModel";
import type {IPagesModel} from "./PagesModel";

export interface ISession {
    session: string;
    cv_login: string;
    ca_actions: number[];
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
