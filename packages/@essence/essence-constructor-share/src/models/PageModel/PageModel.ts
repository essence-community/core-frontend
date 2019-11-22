/* eslint-disable max-lines */
import {extendObservable, action, observable, ObservableMap} from "mobx";
import {Field} from "mobx-react-form";
import {loggerRoot, VAR_RECORD_ID} from "../../constants";
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
import {noop, isEmpty, parseMemoize, i18next} from "../../utils";
import {RecordsModel} from "../RecordsModel";
import {WindowModel} from "../WindowModel";
import {getNextComponent} from "./PageModel.utils";

const logger = loggerRoot.extend("PageModel");

export class PageModel implements IPageModel {
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

    pageEl?: HTMLDivElement;

    pageInnerEl?: HTMLDivElement;

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

    constructor({ckPage, isActiveRedirect, isReadOnly, applicationStore, defaultVisible = false}: IPageModelProps) {
        const {routesStore} = applicationStore;

        this.ckPage = ckPage;
        this.isActiveRedirect = isActiveRedirect;
        this.applicationStore = applicationStore;

        this.recordsStore = new RecordsModel(
            {ckPageObject: "root", ckParent: "root", ckQuery: "GetMetamodelPage2.0", defaultvalue: "##alwaysfirst##"},
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
            questionWindow: null,
            get route() {
                return (
                    (routesStore &&
                        routesStore.recordsStore.recordsState.records.find(
                            (record: Record<string, FieldValue>) => record[VAR_RECORD_ID] === this.ckPage,
                        )) || {
                        ckId: this.ckPage,
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
                        ? (applicationStore.authStore.userInfo.caActions || []).indexOf(this.route.cnActionEdit) < 0
                        : isReadOnly;
                },
                get pageBc(this: IPageModel) {
                    return this.recordsStore.selectedRecrodValues.children;
                },
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

    addStore = action("addStore", (store: IStoreBaseModel, name: string) => {
        if (this.stores.has(name)) {
            logger(i18next.t("7ef1547ac7084e178bf1447361e3ccc3"));
        }

        this.stores.set(name, store);
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

    loadConfigAction = action("loadConfigAction", (ckPage: string) => {
        this.ckPage = ckPage;

        return this.recordsStore.searchAction({ckPage});
    });

    setPageElAction = action("setPageElAction", (pageEl?: HTMLDivElement) => {
        this.pageEl = pageEl;
    });

    setPageInnerElAction = (pageInnerEl?: HTMLDivElement) => {
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

        const nextComponentStore = this.stores.get(nextStepComponent.ckPageObject);

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
                    const tabStore = this.stores.get(parentBc.ckPageObject);

                    if (tabStore) {
                        // @ts-ignore
                        tabStore.setActiveTab(childBc.ckPageObject);
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
        /*
         * TODO: check this
         * this.globalValues.merge(this.applicationStore.globalValues);
         */
        this.loadConfigAction(this.ckPage);
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

    addToMastersAction = (ckMaster: string, field: Field) => {
        if (!this.masters[ckMaster]) {
            this.masters[ckMaster] = [];
        }

        this.masters[ckMaster].push(field);
    };

    removeFromMastersAction = (ckMaster?: string, field?: Field) => {
        if (ckMaster && field && this.masters[ckMaster]) {
            this.masters[ckMaster] = this.masters[ckMaster].filter((masterBc) => masterBc !== field);
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
        const window = this.windows.find((win) => win.bc.ckPageObject === ckPageObject);

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
