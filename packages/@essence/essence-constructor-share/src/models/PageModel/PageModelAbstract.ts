/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import {IApplicationModel, IBuilderMode, IPageModel, IBuilderConfig} from "../../types";

export class PageModelAbstract implements IPageModel {
    public fieldValueMaster: Map<string, string> = new Map();

    public pageBc: IBuilderConfig[] = [];

    public stores: Map<string, any> = new Map();

    public globalValues: any = new Map();

    public ckPage = "1";

    public showQuestionWindow = false;

    public route: Record<string, string>;

    public pageEl?: HTMLDivElement;

    public pageInnerEl?: HTMLDivElement;

    public isEdit: boolean;

    public isLoading: boolean;

    public isReadOnly: boolean;

    public applicationStore: IApplicationModel;

    public hiddenPage: boolean;

    public isActiveRedirect: boolean;

    public globalStores: Map<string, any[]> = new Map();

    public masters: {[$Key: string]: any[]} = {};

    public visible = true;

    public windowsOne: any = [];

    public styleTheme: "dark" | "light" = "light";

    public fireScrollEvent = () => {};

    public updateGlobalValues = (_values: object) => {};

    public addStore = (_store: any, _name: string) => {};

    public removeStore = (_name: string, _store: any) => {};

    public addWindowAction = (_window: any, _name: string) => {};

    public removeWindowAction = (_name: string) => {};

    public addFieldValueMaster = (_name: string, _value: any) => {};

    public removeFieldValueMaster = (_name: string) => {};

    public loadConfigAction = (_ckPage: string | number, _session: string) => Promise.resolve(undefined);

    public setPageElAction = (_pageEl?: HTMLDivElement) => {};

    public setPageInnerElAction = (_pageInnerEl?: HTMLDivElement) => {};

    public addFormAction = (_formType: any, _form: any) => {};

    public removeFormAction = (_formType: any, _form: any) => {};

    public setLoadingAction = (_isLoading: boolean) => {};

    public resetStepAction = () => {};

    public nextStepAction = (_mode: IBuilderMode, _bc: object) => {};

    public scrollToRecordAction = (_params: object) => {};

    public handleQuestionAccept = () => {};

    public handleQuestionDecline = () => {};

    public reloadPageAction = () => {};

    public addGlobalStoresAction = (_name: string, _store: any) => {};

    public removeGlobalStoresAction = (_name: string, _store: any) => {};

    public freezeScrollAction = () => {};

    public addToMastersAction = (_ckMaster: string, _field: any) => {};

    public removeFromMastersAction = (_ckMaster?: string, _field?: any) => {};

    public clearAction = () => {};

    public removePageAction = () => {};

    public openQuestionWindow = () => {};

    public createWindowAction = () => {};

    public closeWindowAction = () => {};

    public addScrollEvent = () => {};

    public removeScrollEvent = () => {};
}
