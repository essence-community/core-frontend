/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import {ObservableMap, observable} from "mobx";
import {v4} from "uuid";
import {
    IApplicationModel,
    IBuilderMode,
    IPageModel,
    IBuilderConfig,
    FieldValue,
    IStoreBaseModel,
    PageModelWindows,
    PageModelSaveCallback,
    IRecordsModel,
    TText,
} from "../../types";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "../../constants";
import {IForm} from "../../Form";
import {TScrollEvent, IScrollEl} from "../../types/PageModel";

export class PageModelAbstract implements IPageModel {
    public questionWindow?: TText[] | undefined;
    public pageScrollEl: IScrollEl | null;
    public currentStep?: string | undefined;
    public setPageScrollEl = (pageEl: IScrollEl) => {};
    public fieldValueMaster: ObservableMap<string, FieldValue> = observable.map();

    public pageBc: IBuilderConfig[] = [];

    public pagerBc: IBuilderConfig = {
        [VAR_RECORD_PAGE_OBJECT_ID]: "null",
        [VAR_RECORD_PARENT_ID]: "null",
        type: "NONE",
    };

    public isMulti = false;

    public stores: ObservableMap<string, IStoreBaseModel> = observable.map();

    public globalValues: ObservableMap<string, FieldValue> = observable.map();

    public forms: ObservableMap<string, IForm> = observable.map();

    public pageId = "1";

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

    public saveCallBack: PageModelSaveCallback | null = null;

    public loadingCount = 0;

    public scrollEvents: TScrollEvent[] = [];

    public recordsStore: IRecordsModel;

    public titleRoutePath = "";

    public uniqueId = v4();

    public fireScrollEvent = () => {};

    public updateGlobalValues = (_values: any) => {};

    public addStore = (_store: any, _name: string): string => "";

    public removeStore = (_name: string, _store: any) => {};

    public addFieldValueMaster = (_name: string, _value: any) => {};

    public removeFieldValueMaster = (_name: string) => {};

    public loadConfigAction = (_ckPage: string | number) => Promise.resolve(undefined);

    public setPageElAction = (_pageEl: HTMLDivElement | null) => {};

    public setPageInnerElAction = (_pageInnerEl: HTMLDivElement | null) => {};

    public setLoadingAction = (_isLoading: boolean) => {};

    public resetStepAction = () => {};

    public nextStepAction = (_mode: IBuilderMode, _bc: any) => {};

    public scrollToRecordAction = (_params: any) => {};

    public handleQuestionAccept = () => {};

    public handleQuestionDecline = () => {};

    public reloadPageAction = () => {};

    public addGlobalStoresAction = (_name: string, _store: any) => {};

    public removeGlobalStoresAction = (_name: string, _store: any) => {};

    public freezeScrollAction = () => {};

    public addToMastersAction = (_ckMaster: string, _field: any) => {};

    public removeFromMastersAction = (_ckMaster?: string, _field?: any) => {};

    public clearAction = () => {};

    public openQuestionWindow = () => {};

    public createWindowAction = () => {};

    public closeWindowAction = () => {};

    public addScrollEvent = () => {};

    public removeScrollEvent = () => {};

    public handleNextStep = (_stepnamenext: string) => {};

    public getNextStepName = (stepnamenext?: string) => undefined;

    public handleScrollAction = () => {};

    public addForm = () => {};

    public removeForm = () => {};
}
