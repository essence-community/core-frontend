// eslint-disable-next-line import/named
import {ObservableMap, IObservableArray} from "mobx";
import {Field} from "./Base";
import {
    FieldValue,
    IBuilderConfig,
    IStoreBaseModel,
    IApplicationModel,
    IBuilderMode,
    IWindowModel,
    IRouteRecord,
    IRecordsModel,
} from ".";

export interface ICreateWindow {
    windowBc: IBuilderConfig;
    values?: Record<string, FieldValue>;
    mode: IBuilderMode;
}

export interface IPageModelProps {
    ckPage: string;
    isActiveRedirect: boolean;
    isReadOnly?: boolean;
    applicationStore: IApplicationModel;
    defaultVisible?: boolean;
}

export interface INextComponentReturn {
    childBc?: IBuilderConfig;
    lastChildBc?: IBuilderConfig;
}

export type PageModelStores = ObservableMap<string, IStoreBaseModel>;
export type PageModelWindows = IObservableArray<IWindowModel>;
export type PageModelFieldValues = ObservableMap<string, FieldValue>;
export type PageModelSaveCallback = (status: 0 | 1 | 2) => void;

type PageModelParamsType = any;

export interface ICreateWindowType {
    windowBc: IBuilderConfig;
    values?: Record<string, any>;
    mode: IBuilderMode;
}

export interface IPageModel {
    pageBc: IBuilderConfig[];
    fieldValueMaster: PageModelFieldValues;
    stores: PageModelStores;
    windows: PageModelWindows;
    // @deprecated
    windowsOne: PageModelWindows;
    globalValues: ObservableMap<string, FieldValue>;
    ckPage: string;
    showQuestionWindow: boolean;
    questionWindow?: string;
    saveCallBack: PageModelSaveCallback | null;
    route?: IRouteRecord;
    pageEl: HTMLDivElement | null;
    pageInnerEl: HTMLDivElement | null;
    isEdit: boolean;
    isReadOnly: boolean;
    currentStep?: string;
    isLoading: boolean;
    loadingCount: number;
    hiddenPage: boolean;
    isActiveRedirect: boolean;
    globalStores: Map<string, IStoreBaseModel[]>;
    masters: Record<string, Field[]>;
    scrollEvents: Function[];
    visible: boolean;
    recordsStore: IRecordsModel;
    updateGlobalValues(values: Record<string, FieldValue>): void;
    openQuestionWindow(questionWindow: string, saveCallBack: PageModelSaveCallback): void;
    handleQuestionAccept(): void;
    handleQuestionDecline(): void;
    addFieldValueMaster(name: string, value: FieldValue): void;
    removeFieldValueMaster(name: string): void;
    addStore(store: IStoreBaseModel, name: string, allowNewName?: boolean): string;
    removeStore(name: string, store: IStoreBaseModel): void;
    addGlobalStoresAction(name: string, store: IStoreBaseModel): void;
    removeGlobalStoresAction(name: string, store: IStoreBaseModel): void;
    addWindowAction(window: IWindowModel): void;
    removeWindowAction(window: IWindowModel): void;
    loadConfigAction(ckPage: string): Promise<void | object>;
    setPageElAction(pageEl: HTMLDivElement | null): void;
    setPageInnerElAction(pageInnerEl: HTMLDivElement | null): void;
    resetStepAction(): void;
    handleNextStep(stepnamenext: string): void;
    nextStepAction(mode: IBuilderMode, bc: IBuilderConfig): void;
    getNextStepName(stepnamenext?: string): undefined | string;
    setLoadingAction(isLoading: boolean): void;
    scrollToRecordAction(params: Record<string, FieldValue>): void;
    reloadPageAction(): void;
    handleScrollAction(): void;
    freezeScrollAction(): void;
    addToMastersAction(ckMaster: string, field: Field): void;
    removeFromMastersAction(ckMaster?: string, field?: Field): void;
    addScrollEvent(scrollEvent: Function): void;
    removeScrollEvent(scrollEvent: Function): void;
    fireScrollEvent(): void;
    clearAction(): void;
    createWindowAction(params: ICreateWindow): void;
    closeWindowAction(ckPageObject: string): void;
}

export type IPageModelConstructor = new (props: PageModelParamsType) => IPageModel;
