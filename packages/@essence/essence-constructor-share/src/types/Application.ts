import {ObservableMap} from "mobx";
import {History} from "history";
import {IRoutesModel} from "./RoutesModel";
import {IStoreBaseModel} from "./StoreBaseModel";
import {IBuilderConfig, FieldValue, IAuthModel, IPagesModel, IAuthSession} from ".";

export interface ISession {
    session: string;
    cvLogin: string;
    caActions: number[];
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
    blockText: string;
    pagesStore: IPagesModel;
    history: History;
    cvUrl: string;
    updateGlobalValuesAction(values: Record<string, string>): void;
    setSesssionAction(userInfo: IAuthSession): Promise<void>;
    logoutAction(): void;
    redirectToAction(ckPage: string, params: Record<string, FieldValue>): Promise<void>;
    loadApplicationAction(): Promise<void>;
    blockApplicationAction(type: string, text: string): void;
    initWsClient(session: string): void;
    handleWsMessage(msg: Record<string, string>): void;
    reloadUserInfoAction(authValues: IAuthSession): void;
    reloadPageObjectAction(ckPage: string, ckPageObject: string): void;
}
