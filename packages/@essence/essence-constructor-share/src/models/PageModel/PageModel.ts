/* eslint-disable max-statements */
/* eslint-disable max-lines */
import {action, observable, ObservableMap, computed} from "mobx";
import {v4} from "uuid";
import {
    loggerRoot,
    VAR_RECORD_ID,
    VAR_RECORD_GLOBAL_VALUE,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CA_ACTIONS,
    VAR_RECORD_CN_ACTION_EDIT,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_NOLOAD,
    VAR_RECORD_PAGE_REDIRECT,
} from "../../constants";
import {
    IBuilderConfig,
    FieldValue,
    IStoreBaseModel,
    IPageModel,
    IBuilderMode,
    IRouteRecord,
    PageModelFieldValues,
    PageModelStores,
    PageModelWindows,
    PageModelSaveCallback,
    IPageModelProps,
    IApplicationModel,
    IRecord,
} from "../../types";
import {noop, isEmpty, parseMemoize, i18next, findClassNames, deepFind, makeRedirect} from "../../utils";
import {RecordsModel} from "../RecordsModel";
import {snackbarStore} from "../SnackbarModel";
import {loadComponentsFromModules} from "../../components";
import {TText} from "../../types/SnackbarModel";
import {IField, IForm} from "../../Form";
import {IScrollEl} from "../../types/PageModel";
import {getNextComponent} from "./PageModel.utils";

const logger = loggerRoot.extend("PageModel");

export class PageModel implements IPageModel {
    public pageId: string;

    public saveCallBack: PageModelSaveCallback | null;

    public pageEl: HTMLDivElement | null;

    public pageScrollEl: IScrollEl | null;

    public pageInnerEl: HTMLDivElement | null;

    public isEdit: boolean;

    public currentStep = "";

    public loadingCount = 0;

    public isActiveRedirect = false;

    public globalStores: Map<string, IStoreBaseModel[]> = new Map();

    public masters: Record<string, IField[]> = {};

    public scrollEvents: Array<() => void> = [];

    public recordsStore: RecordsModel;

    public applicationStore: IApplicationModel;

    private defaultVisible: boolean;

    private defaultIsReadOnly: boolean | undefined;

    @observable public pageBc: IBuilderConfig[] = observable.array([], {deep: false});

    @observable public fieldValueMaster: PageModelFieldValues = observable.map();

    @observable public stores: PageModelStores = observable.map();

    @observable public forms: ObservableMap<string, IForm> = observable.map();

    @observable public windows: PageModelWindows = observable.array();

    @observable public globalValues: ObservableMap<string, FieldValue>;

    @observable showQuestionWindow = false;

    @observable questionWindow?: TText[] = undefined;

    @observable public isLoading = false;

    @computed public get pagerBc(): IBuilderConfig {
        return {
            [VAR_RECORD_PAGE_OBJECT_ID]: this.pageId,
            [VAR_RECORD_PARENT_ID]: this.applicationStore.bc[VAR_RECORD_PAGE_OBJECT_ID],
            defaultvalue: this.applicationStore.bc.defaultvalue,
            type: "PAGER",
        };
    }

    @computed public get route(): IRouteRecord | undefined {
        const {routesStore} = this.applicationStore;

        return (
            (this.recordsStore.selectedRecordValues?.route as IRouteRecord) ||
            (routesStore &&
                routesStore.recordsStore.recordsState.records.find(
                    (record: Record<string, FieldValue>) => record[VAR_RECORD_ID] === this.pageId,
                )) || {
                [VAR_RECORD_ID]: this.pageId,
            }
        );
    }

    @computed public get isReadOnly(): boolean {
        const actionEdit = this.route?.[VAR_RECORD_CN_ACTION_EDIT] as any;

        if (isEmpty(actionEdit)) {
            return typeof this.defaultIsReadOnly === "undefined" ? true : this.defaultIsReadOnly;
        }

        return (
            (this.applicationStore.authStore.userInfo[VAR_RECORD_CA_ACTIONS] || []).indexOf(parseInt(actionEdit, 10)) <
            0
        );
    }

    @computed public get hiddenPage(): boolean {
        return this.applicationStore.pagesStore.activePage !== this && !this.defaultVisible;
    }

    @computed public get visible(): boolean {
        return this.applicationStore.pagesStore.activePage === this || this.defaultVisible;
    }

    @computed public get titleRoutePath(): string {
        // Const recordsStore = this.applicationStore.routesStore?.recordsStore;
        const {routesStore} = this.applicationStore;

        if (!routesStore || !this.route) {
            return "";
        }

        const {recordsStore} = routesStore;
        const {recordId} = recordsStore;

        let name = `$t(${this.route[VAR_RECORD_ROUTE_NAME]})`;
        let parentRoute: IRouteRecord | undefined = this.route;

        while (parentRoute) {
            parentRoute = recordsStore.records.find(
                // eslint-disable-next-line no-loop-func
                (record) => record[recordId] === parentRoute?.[VAR_RECORD_PARENT_ID],
            );

            if (parentRoute) {
                name = `$t(${parentRoute[VAR_RECORD_ROUTE_NAME]}) - ${name}`;
            }
        }

        return name;
    }

    @computed public get isInlineEdit(): boolean {
        const inlineWindows = this.windows.filter((winBc: IBuilderConfig) => winBc.edittype === "inline");

        if (inlineWindows.length > 0) {
            return true;
        }

        return Array.from(this.stores.values()).filter((store) => store.editing === true).length > 0;
    }

    constructor({pageId, isActiveRedirect, isReadOnly, applicationStore, defaultVisible = false}: IPageModelProps) {
        this.pageId = pageId;
        this.isActiveRedirect = isActiveRedirect;
        this.applicationStore = applicationStore;

        this.recordsStore = new RecordsModel(
            {
                [VAR_RECORD_PAGE_OBJECT_ID]: "root",
                [VAR_RECORD_PARENT_ID]: "root",
                [VAR_RECORD_QUERY_ID]: "GetMetamodelPage2.0",
                defaultvalue: "##alwaysfirst##",
                type: "NONE",
            },
            {applicationStore, pageStore: this},
        );

        this.globalValues = observable.map(applicationStore.globalValues);
        this.defaultVisible = defaultVisible;
        this.defaultIsReadOnly = isReadOnly;
    }

    updateGlobalValues = (values: Record<string, FieldValue>) => {
        Object.entries(values).forEach(([key, value]) => {
            const oldValue = this.globalValues.get(key);

            if (oldValue !== value && (!isEmpty(oldValue) || !isEmpty(value))) {
                this.globalValues.set(key, value);
            }
        });
    };

    @action
    openQuestionWindow = (questionWindow: TText[], saveCallBack: PageModelSaveCallback) => {
        this.showQuestionWindow = true;
        this.questionWindow = questionWindow;
        this.saveCallBack = saveCallBack;
    };

    @action
    handleQuestionAccept = () => {
        this.showQuestionWindow = false;
        this.questionWindow = undefined;
        if (this.saveCallBack) {
            this.saveCallBack(1);
        }
        this.saveCallBack = null;
    };

    @action
    handleQuestionDecline = () => {
        this.showQuestionWindow = false;
        this.questionWindow = undefined;
        if (this.saveCallBack) {
            this.saveCallBack(0);
        }
        this.saveCallBack = null;
    };

    @action
    addFieldValueMaster = (name: string, value: FieldValue) => {
        this.fieldValueMaster.set(name, value);
    };

    @action
    removeFieldValueMaster = (name: string) => {
        this.fieldValueMaster.delete(name);
    };

    @action
    addStore = (store: IStoreBaseModel, name: string, allowNewName = false): string => {
        let newName = name;

        if (this.stores.has(name)) {
            logger(i18next.t("static:7ef1547ac7084e178bf1447361e3ccc3"));

            if (allowNewName) {
                newName = name + v4();
            }
        }

        this.stores.set(newName, store);

        return newName;
    };

    @action
    removeStore = (name: string, store: IStoreBaseModel) => {
        if (store && store === this.stores.get(name)) {
            this.stores.delete(name);
        }
    };

    @action
    addGlobalStoresAction = (name: string, store: IStoreBaseModel) => {
        let stores = this.globalStores.get(name);

        if (!stores) {
            stores = [];

            this.globalStores.set(name, stores);
        }

        stores.push(store);
    };

    @action
    removeGlobalStoresAction = (name: string, store: IStoreBaseModel) => {
        const stores = this.globalStores.get(name);

        if (stores) {
            const storeIndex = stores.findIndex((internalStore) => internalStore === store);

            if (storeIndex >= 0) {
                stores.splice(storeIndex, 1);
            }
        }
    };

    @action
    loadConfigAction = action("loadConfigAction", async (pageId: string) => {
        this.pageId = pageId;

        if (this.route?.[VAR_RECORD_NOLOAD] === 1) {
            return undefined;
        }

        this.setLoadingAction(true);

        try {
            await this.recordsStore.searchAction({[VAR_RECORD_ROUTE_PAGE_ID]: pageId});

            if (this.recordsStore.selectedRecord) {
                const {children, route: preRoute} = this.recordsStore.selectedRecordValues;
                const route = preRoute as IBuilderConfig;
                const pageBc = Array.isArray(children) ? children : [];

                const classNames = findClassNames(pageBc);
                const globalValue = this.recordsStore.selectedRecordValues[VAR_RECORD_GLOBAL_VALUE] as IRecord;

                await loadComponentsFromModules(classNames);

                if (globalValue) {
                    this.updateGlobalValues(globalValue);
                }

                if (route && route.activerules) {
                    const getValue = (name: string) => {
                        if (name.charAt(0) === "g") {
                            return this.globalValues.get(name);
                        }

                        if (route) {
                            const [isExistRecord, recValue] = deepFind(route as any, name);

                            if (isExistRecord) {
                                return recValue;
                            }
                        }

                        return undefined;
                    };

                    if (!parseMemoize((route as any).activerules).runer({get: getValue})) {
                        this.applicationStore.pagesStore.removePageAction((route as any)[VAR_RECORD_ID]);
                    }
                }

                if (route && (route.redirecturl || (route as any)[VAR_RECORD_PAGE_REDIRECT])) {
                    makeRedirect(
                        {...route, redirecturl: (route as any)[VAR_RECORD_PAGE_REDIRECT] || route.redirecturl} as any,
                        this,
                        route as any,
                        true,
                    );
                }

                this.pageBc = pageBc;
            } else {
                this.pageBc = [];
            }
        } catch (error) {
            this.pageBc = [];
            snackbarStore.checkExceptResponse(error, this.route, this.applicationStore);
        }

        this.setLoadingAction(false);

        return this.recordsStore.selectedRecord;
    });

    setPageElAction = action("setPageElAction", (pageEl: HTMLDivElement | null) => {
        this.pageEl = pageEl;
    });

    @action
    setPageScrollEl = (pageScrollEl: IScrollEl | null) => {
        this.pageScrollEl = pageScrollEl;
    };

    setPageInnerElAction = (pageInnerEl: HTMLDivElement | null) => {
        this.pageInnerEl = pageInnerEl;
    };

    resetStepAction = action("resetStepAction", () => {
        this.currentStep = "";
    });

    handleNextStep = (stepnamenext: string) => {
        const {lastChildBc: nextStepComponent} = getNextComponent(stepnamenext, this.pageBc, noop);

        if (!nextStepComponent) {
            return false;
        }

        const nextComponentStore = this.stores.get(nextStepComponent[VAR_RECORD_PAGE_OBJECT_ID]);

        if (!nextComponentStore) {
            return false;
        }

        if (nextComponentStore && nextComponentStore.handleNextStepAction) {
            nextComponentStore.handleNextStepAction();

            return true;
        }

        return false;
    };

    nextStepAction = action("nextStepAction", (mode: IBuilderMode, bc: IBuilderConfig) => {
        const canNextStep = mode === "1" && (!bc.stepname || bc.stepname === this.currentStep);
        const stepnamenext = this.getNextStepName(bc.stepnamenext);

        if (stepnamenext && canNextStep && this.handleNextStep(stepnamenext)) {
            this.currentStep = stepnamenext;
            getNextComponent(stepnamenext, this.pageBc, (childBc: IBuilderConfig, parentBc: IBuilderConfig) => {
                if (parentBc.type === "TABPANEL") {
                    const tabStore = this.stores.get(parentBc[VAR_RECORD_PAGE_OBJECT_ID]);

                    if (tabStore) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        tabStore.setActiveTab(childBc[VAR_RECORD_PAGE_OBJECT_ID]);
                    }
                }
            });
        } else {
            this.resetStepAction();
        }
    });

    getNextStepName = (stepnamenext?: string): undefined | string => {
        if (isEmpty(stepnamenext) || stepnamenext === undefined) {
            return stepnamenext;
        }

        const stepNameQuery = stepnamenext.split("?");

        if (stepNameQuery.length <= 1) {
            return stepnamenext;
        }

        const [stepNameExp, stepNames] = stepNameQuery;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const isStepNameTurnFirst = parseMemoize(stepNameExp).runer(this.globalValues);

        return stepNames.split(":")[isStepNameTurnFirst ? 0 : 1];
    };

    setLoadingAction = action("setLoadingAction", (isLoading: boolean) => {
        this.loadingCount = Math.max(0, this.loadingCount + (isLoading ? 1 : -1));

        this.isLoading = this.loadingCount !== 0;
    });

    scrollToRecordAction = (params: Record<string, FieldValue>) => {
        this.stores.forEach((store) => {
            store.invokeHandler("onScrollToRecordAction", ["1", store.bc, {record: params}]);
        });
    };

    @action
    reloadPageAction = () => {
        this.clearAction();
        if (this.showQuestionWindow) {
            this.handleQuestionDecline();
        }

        this.loadConfigAction(this.pageId);
    };

    handleScrollAction = () => {
        const node = this.pageInnerEl ? this.pageInnerEl.parentElement : null;

        if (node instanceof HTMLElement && node.parentElement instanceof HTMLElement) {
            const container = node.parentElement;

            node.style.minHeight = "";

            container.removeEventListener("scroll", this.handleScrollAction);
        }
    };

    freezeScrollAction = () => {
        const node = this.pageInnerEl ? this.pageInnerEl.parentElement : null;

        if (node instanceof HTMLElement && node.parentElement instanceof HTMLElement) {
            const container = node.parentElement;
            const {scrollTop} = container;

            if (node.offsetHeight > container.offsetHeight && scrollTop > 0) {
                node.style.minHeight = `${node.offsetHeight}px`;

                container.addEventListener("scroll", this.handleScrollAction);
            } else {
                node.style.minHeight = "";
            }
        }
    };

    addToMastersAction = (masterId: string, field: IField) => {
        if (!this.masters[masterId]) {
            this.masters[masterId] = [];
        }

        this.masters[masterId].push(field);
    };

    removeFromMastersAction = (masterId?: string, field?: IField) => {
        if (masterId && field && this.masters[masterId]) {
            this.masters[masterId] = this.masters[masterId].filter((masterBc) => masterBc !== field);
        }
    };

    addScrollEvent = (scrollEvent: () => void) => {
        this.scrollEvents.push(scrollEvent);
    };

    removeScrollEvent = (scrollEvent: () => void) => {
        this.scrollEvents = this.scrollEvents.filter((event) => event !== scrollEvent);
    };

    fireScrollEvent = () => {
        this.scrollEvents.forEach((event) => {
            event();
        });
    };

    @action
    clearAction = () => {
        this.recordsStore.clearRecordsAction();
        this.globalValues = observable.map(this.applicationStore.globalValues);
        this.stores.clear();
        this.windows.clear();
        this.fieldValueMaster.clear();
        this.pageBc = [];
    };

    @action
    createWindowAction = (bc: IBuilderConfig) => {
        this.windows.push(bc);
    };

    @action
    closeWindowAction = (ckPageObject?: string) => {
        const window = this.windows.find((bc) => bc[VAR_RECORD_PAGE_OBJECT_ID] === ckPageObject);

        if (window) {
            this.windows.remove(window);
        }
    };

    @action
    addForm = (name: string, form: IForm) => {
        this.forms.set(name, form);
    };

    @action
    removeForm = (name: string) => {
        this.forms.delete(name);
    };
}
