/* eslint-disable max-lines */
import {action, observable, ObservableMap, computed} from "mobx";
import {Field} from "mobx-react-form";
import uuid from "uuid";
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
} from "../../constants";
import {styleTheme} from "../../constants/deprecated";
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
    ICreateWindow,
    IWindowModel,
    IApplicationModel,
} from "../../types";
import {noop, isEmpty, parseMemoize, i18next, findClassNames} from "../../utils";
import {RecordsModel} from "../RecordsModel";
import {WindowModel} from "../WindowModel";
import {snackbarStore} from "../SnackbarModel";
import {loadComponentsFromModules} from "../../components";
import {TText} from "../../types/SnackbarModel";
import {getNextComponent} from "./PageModel.utils";

const logger = loggerRoot.extend("PageModel");

export class PageModel implements IPageModel {
    public pageId: string;

    public saveCallBack: PageModelSaveCallback | null;

    public pageEl: HTMLDivElement | null;

    public pageInnerEl: HTMLDivElement | null;

    public isEdit: boolean;

    public currentStep = "";

    public loadingCount = 0;

    public isActiveRedirect = false;

    public globalStores: Map<string, IStoreBaseModel[]> = new Map();

    public masters: Record<string, Field[]> = {};

    public scrollEvents: Array<Function> = [];

    public recordsStore: RecordsModel;

    // @deprecated
    public applicationStore: IApplicationModel;

    // @deprecated
    public styleTheme = styleTheme;

    // @deprecated
    public formFilters: Array<any> = [];

    private defaultVisible: boolean;

    private defaultIsReadOnly: boolean | undefined;

    @observable public pageBc: IBuilderConfig[] = observable.array([], {deep: false});

    @observable public fieldValueMaster: PageModelFieldValues = observable.map();

    @observable public stores: PageModelStores = observable.map();

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
        };
    }

    // @deprecated
    @computed public get windowsOne(): PageModelWindows {
        return this.windows;
    }

    @computed public get route(): IRouteRecord | undefined {
        const {routesStore} = this.applicationStore;

        return (
            (routesStore &&
                routesStore.recordsStore.recordsState.records.find(
                    (record: Record<string, FieldValue>) => record[VAR_RECORD_ID] === this.pageId,
                )) || {
                [VAR_RECORD_ID]: this.pageId,
            }
        );
    }

    @computed public get isReadOnly(): boolean {
        if (typeof this.defaultIsReadOnly === "undefined") {
            const actionEdit = this.route?.[VAR_RECORD_CN_ACTION_EDIT];

            if (typeof actionEdit !== "number") {
                return false;
            }

            return (this.applicationStore.authStore.userInfo[VAR_RECORD_CA_ACTIONS] || []).indexOf(actionEdit) < 0;
        }

        return this.defaultIsReadOnly;
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
        const inlineWindows = this.windowsOne.filter((window: IWindowModel) => window.bc.edittype === "inline");

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

    openQuestionWindow = action(
        "openQuestionWindow",
        (questionWindow: TText[], saveCallBack: PageModelSaveCallback) => {
            this.showQuestionWindow = true;
            this.questionWindow = questionWindow;
            this.saveCallBack = saveCallBack;
        },
    );

    handleQuestionAccept = action("handleQuestionAccept", () => {
        this.showQuestionWindow = false;
        this.questionWindow = undefined;
        if (this.saveCallBack) {
            this.saveCallBack(1);
        }
        this.saveCallBack = null;
    });

    handleQuestionDecline = action("handleQuestionDecline", () => {
        this.showQuestionWindow = false;
        this.questionWindow = undefined;
        if (this.saveCallBack) {
            this.saveCallBack(0);
        }
        this.saveCallBack = null;
    });

    addFieldValueMaster = action("addFieldValueMaster", (name: string, value: FieldValue) => {
        this.fieldValueMaster.set(name, value);
    });

    removeFieldValueMaster = action("addFieldValueMaster", (name: string) => {
        this.fieldValueMaster.delete(name);
    });

    // @ts-ignore
    addStore = action("addStore", (store: IStoreBaseModel, name: string, allowNewName = false): string => {
        let newName = name;

        if (this.stores.has(name)) {
            logger(i18next.t("static:7ef1547ac7084e178bf1447361e3ccc3"));

            if (allowNewName) {
                newName = name + uuid();
            }
        }

        this.stores.set(newName, store);

        return newName;
    });

    removeStore = action("removeStore", (name: string, store: IStoreBaseModel) => {
        if (store && store === this.stores.get(name)) {
            this.stores.delete(name);
        }
    });

    addGlobalStoresAction = (name: string, store: IStoreBaseModel) => {
        let stores = this.globalStores.get(name);

        if (!stores) {
            stores = [];

            this.globalStores.set(name, stores);
        }

        stores.push(store);
    };

    removeGlobalStoresAction = (name: string, store: IStoreBaseModel) => {
        const stores = this.globalStores.get(name);

        if (stores) {
            const storeIndex = stores.findIndex((internalStore) => internalStore === store);

            if (storeIndex >= 0) {
                stores.splice(storeIndex, 1);
            }
        }
    };

    addWindowAction = action("addWindowAction", (window: IWindowModel) => {
        this.windows.push(window);
    });

    removeWindowAction = action("removeWindowAction", (window: IWindowModel) => {
        this.windows.remove(window);
    });

    loadConfigAction = action("loadConfigAction", async (pageId: string) => {
        let response = undefined;

        this.pageId = pageId;

        this.setLoadingAction(true);

        try {
            response = await this.recordsStore.searchAction({[VAR_RECORD_ROUTE_PAGE_ID]: pageId});

            // @ts-ignore
            if (snackbarStore.checkValidResponseAction(response[0], this.route, undefined, this.applicationStore)) {
                const {children} = this.recordsStore.selectedRecordValues;
                const pageBc = Array.isArray(children) ? children : [];

                const classNames = findClassNames(pageBc);
                const globalValue = this.recordsStore.selectedRecordValues[VAR_RECORD_GLOBAL_VALUE] as Record<
                    string,
                    FieldValue
                >;

                await loadComponentsFromModules(classNames);

                this.pageBc = pageBc;

                if (globalValue) {
                    this.updateGlobalValues(globalValue);
                }
            }
        } catch (error) {
            this.pageBc = [];
            snackbarStore.checkExceptResponse(error, this.route, this.applicationStore);
        }

        this.setLoadingAction(false);

        return response;
    });

    setPageElAction = action("setPageElAction", (pageEl: HTMLDivElement | null) => {
        this.pageEl = pageEl;
    });

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

        // @ts-ignore
        if (nextComponentStore && nextComponentStore.handleNextStepAction) {
            // @ts-ignore
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
            if (store.name === "grid") {
                // @ts-ignore
                store.scrollToRecordAction(params);
            }
        });
    };

    reloadPageAction = action("reloadPageAction", () => {
        this.clearAction();
        if (this.showQuestionWindow) {
            this.handleQuestionDecline();
        }

        this.loadConfigAction(this.pageId);
    });

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

    addToMastersAction = (masterId: string, field: Field) => {
        if (!this.masters[masterId]) {
            this.masters[masterId] = [];
        }

        this.masters[masterId].push(field);
    };

    removeFromMastersAction = (masterId?: string, field?: Field) => {
        if (masterId && field && this.masters[masterId]) {
            this.masters[masterId] = this.masters[masterId].filter((masterBc) => masterBc !== field);
        }
    };

    addScrollEvent = (scrollEvent: Function) => {
        this.scrollEvents.push(scrollEvent);
    };

    removeScrollEvent = (scrollEvent: Function) => {
        this.scrollEvents = this.scrollEvents.filter((event) => event !== scrollEvent);
    };

    fireScrollEvent = () => {
        this.scrollEvents.forEach((event) => {
            event();
        });
    };

    clearAction = action("clearAction", () => {
        this.recordsStore.clearRecordsAction();
        this.globalValues.clear();
        this.stores.clear();
        this.windows.clear();
        this.fieldValueMaster.clear();
        this.pageBc = [];
    });

    createWindowAction = action("createWindowAction", (params: ICreateWindow) => {
        const window = new WindowModel({
            applicationStore: this.applicationStore,
            bc: params.windowBc,
            mode: params.mode,
            pageStore: this,
            values: params.values,
        });

        this.windows.push(window);
    });

    closeWindowAction = action("closeWindowAction", (ckPageObject) => {
        const window = this.windows.find((win) => win.bc[VAR_RECORD_PAGE_OBJECT_ID] === ckPageObject);

        if (window) {
            this.windows.remove(window);
        }
    });

    /**
     * @deprecated
     */
    addFormAction = (formType: string, form: any) => {
        if (formType === "filter") {
            this.formFilters.push(form);
        }
    };

    /**
     * @deprecated
     */
    removeFormAction = (formType: string, form: any) => {
        if (formType === "filter") {
            const index = this.formFilters.indexOf(form);

            if (index > -1) {
                this.formFilters.splice(index, 1);
            }
        }
    };
}
