/* eslint-disable max-lines */
import {extendObservable, action, observable, ObservableMap} from "mobx";
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
import {getNextComponent} from "./PageModel.utils";

const logger = loggerRoot.extend("PageModel");

export class PageModel implements IPageModel {
    pageBc: IBuilderConfig[];

    pagerBc: IBuilderConfig;

    fieldValueMaster: PageModelFieldValues;

    stores: PageModelStores;

    windows: PageModelWindows;

    // @deprecated
    windowsOne: PageModelWindows;

    globalValues: ObservableMap<string, FieldValue>;

    pageId: string;

    showQuestionWindow: boolean;

    questionWindow?: string;

    saveCallBack: PageModelSaveCallback | null;

    route?: IRouteRecord;

    pageEl: HTMLDivElement | null;

    pageInnerEl: HTMLDivElement | null;

    isEdit: boolean;

    isReadOnly: boolean;

    currentStep = "";

    isLoading: boolean;

    loadingCount = 0;

    hiddenPage: boolean;

    isActiveRedirect = false;

    globalStores: Map<string, IStoreBaseModel[]> = new Map();

    masters: Record<string, Field[]> = {};

    scrollEvents: Array<Function> = [];

    visible: boolean;

    recordsStore: RecordsModel;

    // @deprecated
    applicationStore: IApplicationModel;

    // @deprecated
    styleTheme = styleTheme;

    constructor({pageId, isActiveRedirect, isReadOnly, applicationStore, defaultVisible = false}: IPageModelProps) {
        const {routesStore} = applicationStore;

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

        extendObservable(this, {
            fieldValueMaster: observable.map(),
            globalValues: observable.map(applicationStore.globalValues),
            get hiddenPage() {
                return applicationStore.pagesStore.activePage !== this && !defaultVisible;
            },
            get isInlineEdit(): boolean {
                return (
                    this.windowsOne.filter((window: IWindowModel) => window.bc.edittype === "inline").length > 0 ||
                    [...this.stores.entries()].filter((entry) => entry[1].editing === true).length > 0
                );
            },
            isLoading: false,
            get pagerBc(): IBuilderConfig {
                return {
                    [VAR_RECORD_PAGE_OBJECT_ID]: pageId,
                    [VAR_RECORD_PARENT_ID]: applicationStore.bc[VAR_RECORD_PAGE_OBJECT_ID],
                    defaultvalue: applicationStore.bc.defaultvalue,
                };
            },
            questionWindow: null,
            get route() {
                return (
                    (routesStore &&
                        routesStore.recordsStore.recordsState.records.find(
                            (record: Record<string, FieldValue>) => record[VAR_RECORD_ID] === this.pageId,
                        )) || {
                        [VAR_RECORD_ID]: this.pageId,
                    }
                );
            },
            showQuestionWindow: false,
            stores: observable.map(),
            get visible() {
                return applicationStore.pagesStore.activePage === this || defaultVisible;
            },
            windows: observable.array(),
            // @deprecated
            get windowsOne(this: IPageModel) {
                return this.windows;
            },
        });

        extendObservable(
            this,
            {
                get isReadOnly() {
                    return typeof isReadOnly === "undefined"
                        ? (applicationStore.authStore.userInfo[VAR_RECORD_CA_ACTIONS] || []).indexOf(
                              this.route[VAR_RECORD_CN_ACTION_EDIT],
                          ) < 0
                        : isReadOnly;
                },
                pageBc: [],
            },
            undefined,
            {deep: false},
        );
    }

    updateGlobalValues = (values: Record<string, FieldValue>) => {
        Object.entries(values).forEach(([key, value]) => {
            const oldValue = this.globalValues.get(key);

            if (oldValue !== value && (!isEmpty(oldValue) || !isEmpty(value))) {
                this.globalValues.set(key, value);
            }
        });
    };

    openQuestionWindow = action("openQuestionWindow", (questionWindow: string, saveCallBack: PageModelSaveCallback) => {
        this.showQuestionWindow = true;
        this.questionWindow = questionWindow;
        this.saveCallBack = saveCallBack;
    });

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
            logger(i18next.t("7ef1547ac7084e178bf1447361e3ccc3"));

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
                const {children} = this.recordsStore.selectedRecrodValues;
                const pageBc = Array.isArray(children) ? children : [];

                const classNames = findClassNames(pageBc);
                const globalValue = this.recordsStore.selectedRecrodValues[VAR_RECORD_GLOBAL_VALUE] as Record<
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
    removeFormAction = () => {
        // Lagacy
    };

    /**
     * @deprecated
     */
    addFormAction = () => {
        // Lagacy
    };
}
