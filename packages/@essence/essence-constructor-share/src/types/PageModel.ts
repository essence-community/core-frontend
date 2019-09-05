import {IApplicationModel} from "./Application";
import {Field, FormType, IBuilderMode, IObservableArray, ObservableMap, StoreModelTypes, WindowModelType} from "./Base";
import { IBuilderConfig } from ".";


type PageModelParamsType = any;

export interface ICreateWindowType {
    windowBc: IBuilderConfig;
    values?: Object;
    mode: IBuilderMode;
};

export interface IPageModel {
    fieldValueMaster: Map<string, string>,
    pageBc: object[],
    stores: Map<string, any>,
    globalValues: ObservableMap<string, any>,
    ckPage: string,
    route: object,
    pageEl?: HTMLDivElement,
    pageInnerEl?: HTMLDivElement,
    isEdit: boolean,
    isLoading: boolean,
    isReadOnly: boolean,
    applicationStore: IApplicationModel,
    hiddenPage: boolean,
    isActiveRedirect: boolean,
    globalStores: Map<string, any[]>,
    masters: {
        [$Key: string]: Field[],
    },
    visible: boolean,
    windowsOne: IObservableArray<WindowModelType>,
    styleTheme: "dark" | "light",
    fireScrollEvent: () => void,
    openQuestionWindow: (questionWindow: string, saveCallBack: (clWarningNew: any) => void) => void,
    updateGlobalValues: (values: object) => void,
    addStore: (store: StoreModelTypes, name: string) => void,
    removeStore: (name: string, store: StoreModelTypes) => void,
    addWindowAction: (window: WindowModelType, name: string) => void,
    removeWindowAction: (name: string) => void,
    addFieldValueMaster: (name: string, value: any) => void,
    removeFieldValueMaster: (name: string) => void,
    loadConfigAction: (ckPage: string, session: string) => Promise<void>,
    setPageElAction: (pageEl?: HTMLDivElement) => void,
    setPageInnerElAction: (pageInnerEl?: HTMLDivElement) => void,
    addFormAction: (formType: FormType, form: any) => void,
    removeFormAction: (formType: FormType, form: any) => void,
    setLoadingAction: (isLoading: boolean) => void,
    resetStepAction: () => void,
    nextStepAction: (mode: IBuilderMode, bc: object) => void,
    scrollToRecordAction: (params: object) => void,
    reloadPageAction: () => void,
    addGlobalStoresAction: (name: string, store: any) => void,
    removeGlobalStoresAction: (name: string, store: any) => void,
    freezeScrollAction: () => void,
    addToMastersAction: (ckMaster: string, field: Field) => void,
    removeFromMastersAction: (ckMaster?: string, field?: Field) => void,
    clearAction: () => void,
    setVisibleAction: (visible: boolean) => void,
    removePageAction: () => void,  
    createWindowAction: (params: ICreateWindowType) => void,
    closeWindowAction: (ckPageObject: string) => void,
};

export type IPageModelConstructor = new (props: PageModelParamsType) => IPageModel;
