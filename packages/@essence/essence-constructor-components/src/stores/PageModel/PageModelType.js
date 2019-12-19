// @flow
import {Field, Form} from "mobx-react-form";
import {type ObservableMap} from "mobx";
import {type IObservableArray} from "mobx/lib/mobx.js.flow";
import {type BuilderModeType, type BuilderBaseType} from "../../BuilderType";
import {type RoutesModelType} from "../RoutesModel";
import {type WindowModelType, type WindowBcType} from "../WindowModel/WindowModelTypes";
import {type ApplicationModelType} from "../StoreTypes";

export type StoreModelTypes = WindowModelType;
export type PageModelWindowsType = Map<string, WindowModelType>;
export type PageModelStoresType = Map<string, any>;
export type FormType = "filter";
export type PageModelParamsType = {|
    initialBc?: BuilderBaseType[],
    applicationStore: ApplicationModelType,
    routesStore?: RoutesModelType,
    pageId: string,
    isActiveRedirect: boolean,
    isReadOnly?: boolean,
    styleTheme?: "dark" | "light",
|};
export type NextComponentReturnType = {
    childBc?: Object,
    lastChildBc?: Object,
};

export type CreateWindowType = {|
    windowBc: WindowBcType,
    values?: Object,
    mode: BuilderModeType,
|};

export interface PageModelInterface {
    fieldValueMaster: Map<string, string>;
    showQuestionWindow: boolean;
    questionWindow: ?string;
    saveCallBack: ?Function;
    pageBc: BuilderBaseType[];
    stores: PageModelStoresType;
    windows: PageModelWindowsType;
    globalValues: ObservableMap<string, mixed>;
    pageId: string;
    route: Object;
    pageEl: ?HTMLDivElement;
    pageInnerEl: ?HTMLDivElement;
    isEdit: boolean;
    isLoading: boolean;
    isReadOnly: boolean;
    applicationStore: ApplicationModelType;
    hiddenPage: boolean;
    isActiveRedirect: boolean;
    globalStores: Map<string, Array<any>>;
    masters: {
        [string]: Array<Field>,
    };
    visible: boolean;
    formFilters: Array<Form>;
    windowsOne: IObservableArray<WindowModelType>;
    styleTheme: "dark" | "light";
    constructor(props: PageModelParamsType): void;
    addScrollEvent: (Function) => void;
    removeScrollEvent: (Function) => void;
    fireScrollEvent: () => void;
    openQuestionWindow: (questionWindow: string, saveCallBack: Function) => void;
    updateGlobalValues: (values: Object) => void;
    addStore: (store: StoreModelTypes, name: string) => void;
    removeStore: (name: string, store: StoreModelTypes) => void;
    addWindowAction: (window: WindowModelType, name: string) => void;
    removeWindowAction: (name: string) => void;
    addFieldValueMaster: (name: string, value: any) => void;
    removeFieldValueMaster: (name: string) => void;
    loadConfigAction: (pageId: string, session: string) => Promise<void>;
    setPageElAction: (pageEl: ?HTMLDivElement) => void;
    setPageInnerElAction: (pageInnerEl: ?HTMLDivElement) => void;
    addFormAction: (formType: FormType, form: any) => void;
    removeFormAction: (formType: FormType, form: any) => void;
    setLoadingAction: (isLoading: boolean) => void;
    resetStepAction: () => void;
    nextStepAction: (mode: BuilderModeType, bc: Object) => void;
    scrollToRecordAction: (params: Object) => void;
    handleQuestionAccept: () => void;
    handleQuestionDecline: () => void;
    reloadPageAction: () => void;
    addGlobalStoresAction: (name: string, store: any) => void;
    removeGlobalStoresAction: (name: string, store: any) => void;
    freezeScrollAction: () => void;
    addToMastersAction: (masterId: string, field: Field) => void;
    removeFromMastersAction: (masterId?: string, field: ?Field) => void;
    clearAction: () => void;
    removePageAction: () => void;
}
export type PageModelType = $ReadOnly<PageModelInterface>;
