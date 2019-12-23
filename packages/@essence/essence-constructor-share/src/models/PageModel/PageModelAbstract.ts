/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import {ObservableMap, observable} from "mobx";
import {
    IApplicationModel,
    IBuilderMode,
    IPageModel,
    IBuilderConfig,
    FieldValue,
    IStoreBaseModel,
    IWindowModel,
    PageModelWindows,
    PageModelSaveCallback,
    IRecordsModel,
} from "../../types";

export class PageModelAbstract implements IPageModel {
    public fieldValueMaster: ObservableMap<string, FieldValue> = observable.map();

    public pageBc: IBuilderConfig[] = [];

    public pagerBc: IBuilderConfig = {
        ckPageObject: "null",
        ckParent: "null",
    };

    public stores: ObservableMap<string, IStoreBaseModel> = observable.map();

    public globalValues: ObservableMap<string, FieldValue> = observable.map();

    public ckPage = "1";

    public showQuestionWindow = false;

    public route: Record<string, string>;

    public pageEl: HTMLDivElement | null;

    public pageInnerEl: HTMLDivElement | null;

    public isEdit: boolean;

    public isLoading: boolean;

    public isReadOnly: boolean;

    public applicationStore: IApplicationModel;

    public hiddenPage: boolean;

    public isActiveRedirect: boolean;

    public globalStores: Map<string, any[]> = new Map();

    public masters: {[$Key: string]: any[]} = {};

    public visible = true;

    public windows: PageModelWindows = observable.array();

    public windowsOne: any = [];

    public styleTheme: "dark" | "light" = "light";

    public saveCallBack: PageModelSaveCallback | null = null;

    public loadingCount = 0;

    public scrollEvents: Function[] = [];

    public recordsStore: IRecordsModel;

    public fireScrollEvent = () => {};

    public updateGlobalValues = (_values: object) => {};

    public addStore = (_store: any, _name: string): string => "";

    public removeStore = (_name: string, _store: any) => {};

    public addWindowAction = (_window: IWindowModel) => {};

    public removeWindowAction = (_window: IWindowModel) => {};

    public addFieldValueMaster = (_name: string, _value: any) => {};

    public removeFieldValueMaster = (_name: string) => {};

    public loadConfigAction = (_ckPage: string | number) => Promise.resolve(undefined);

    public setPageElAction = (_pageEl: HTMLDivElement | null) => {};

    public setPageInnerElAction = (_pageInnerEl: HTMLDivElement | null) => {};

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

    public handleNextStep = (_stepnamenext: string) => {};

    public getNextStepName = (stepnamenext?: string) => undefined;

    public handleScrollAction = () => {};
}
