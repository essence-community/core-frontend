import type {ObservableMap, IObservableArray} from "mobx";
import type {IField, IForm} from "./Form";
import type {IBuilderConfig, FieldValue, IBuilderMode, TText} from "./Builder";
import type {IRouteRecord} from "./RoutesModel";
import type {IStoreBaseModel} from "./StoreBaseModel";
import type {IApplicationModel} from "./Application";
import type {IRecordsModel} from "./RecordsModel";

export type PageModelStores = ObservableMap<string, IStoreBaseModel>;
export type PageModelWindows = IObservableArray<IBuilderConfig>;
export type PageModelFieldValues = ObservableMap<string, unknown>;
export type PageModelSaveCallback = (status: 0 | 1 | 2) => void;

type PageModelParamsType = any;

export type TScrollEvent = (...arg: any) => void;
export interface IScrollEl extends Record<string, any> {
    container: HTMLDivElement;
    view: HTMLDivElement;
}

export interface IPageModel {
    pageBc: IBuilderConfig[];
    pagerBc: IBuilderConfig;
    applicationStore: IApplicationModel;
    fieldValueMaster: PageModelFieldValues;
    stores: PageModelStores;
    windows: PageModelWindows;
    forms: ObservableMap<string, IForm>;
    globalValues: ObservableMap<string, unknown>;
    pageId: string;
    showQuestionWindow: boolean;
    questionWindow?: TText[];
    saveCallBack: PageModelSaveCallback | null;
    route?: IRouteRecord;
    pageEl: HTMLDivElement | null;
    pageScrollEl: IScrollEl | null;
    pageInnerEl: HTMLDivElement | null;
    isEdit: boolean;
    isReadOnly: boolean;
    currentStep?: string;
    isLoading: boolean;
    loadingCount: number;
    hiddenPage: boolean;
    isActiveRedirect: boolean;
    globalStores: Map<string, IStoreBaseModel[]>;
    masters: Record<string, IField[]>;
    scrollEvents: TScrollEvent[];
    visible: boolean;
    recordsStore: IRecordsModel;
    titleRoutePath: string;
    updateGlobalValues(values: Record<string, unknown>): void;
    openQuestionWindow(questionWindow: TText[], saveCallBack: PageModelSaveCallback): void;
    handleQuestionAccept(): void;
    handleQuestionDecline(): void;
    addFieldValueMaster(name: string, value: unknown): void;
    removeFieldValueMaster(name: string): void;
    addStore(store: IStoreBaseModel, name: string, allowNewName?: boolean): string;
    removeStore(name: string, store: IStoreBaseModel): void;
    addGlobalStoresAction(name: string, store: IStoreBaseModel): void;
    removeGlobalStoresAction(name: string, store: IStoreBaseModel): void;
    loadConfigAction(pageId: string): Promise<void | Record<string, any>>;
    setPageElAction(pageEl: HTMLDivElement | null): void;
    setPageScrollEl(pageEl: IScrollEl | null): void;
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
    addToMastersAction(masterId: string, field: IField): void;
    removeFromMastersAction(masterId?: string, field?: IField): void;
    addScrollEvent(scrollEvent: TScrollEvent): void;
    removeScrollEvent(scrollEvent: TScrollEvent): void;
    fireScrollEvent(): void;
    clearAction(): void;
    createWindowAction(winBc: IBuilderConfig): void;
    closeWindowAction(ckPageObject: string): void;
    addForm(name: string, form: IForm): void;
    removeForm(name: string): void;
}

export type IPageModelConstructor = new (props: PageModelParamsType) => IPageModel;
