/* eslint-disable max-lines */
// @flow
import {extendObservable, action, observable, reaction, type ObservableMap} from "mobx";
import {type IObservableArray} from "mobx/lib/mobx.js.flow";
import {Field} from "mobx-react-form";
import forEach from "lodash/forEach";
import noop from "lodash/noop";
import {parseMemoize, loadComponentsFromModules} from "@essence/essence-constructor-share";
import {snackbarStore} from "@essence/essence-constructor-share/models";
import {findClassNames, i18next} from "@essence/essence-constructor-share/utils";
import {loggerRoot, styleTheme as styleThemeConst} from "../../constants";
import {sendRequestList} from "../../request/baseRequest";
import {isEmpty} from "../../utils/base";
import {type BuilderModeType, type BuilderBaseType} from "../../BuilderType";
import {type WindowModelType} from "../WindowModel/WindowModelTypes";
import {WindowModel} from "../WindowModel";
import {type ApplicationModelType} from "../StoreTypes";
import {
    type PageModelInterface,
    type PageModelStoresType,
    type PageModelWindowsType,
    type PageModelParamsType,
    type StoreModelTypes,
    type FormType,
    type CreateWindowType,
} from "./PageModelType";
import {renderGlobalValuelsInfo, getNextComponent} from "./PageModelUtil";

const logger = loggerRoot.extend("PageModel");

export class PageModel implements PageModelInterface {
    pageBc: BuilderBaseType[];

    fieldValueMaster: Map<string, string>;

    stores: PageModelStoresType;

    windows: PageModelWindowsType;

    globalValues: ObservableMap<string, mixed>;

    applicationStore: ApplicationModelType;

    ckPage: string;

    showQuestionWindow: boolean;

    questionWindow: ?string;

    saveCallBack: any;

    route: Object;

    pageEl: ?HTMLDivElement;

    pageInnerEl: ?HTMLDivElement;

    formFilters: Array<any> = [];

    isEdit: boolean;

    isReadOnly: boolean;

    currentStep: string = "";

    isLoading: boolean;

    loadingCount: number = 0;

    hiddenPage: boolean;

    isActiveRedirect: boolean = false;

    globalStores: Map<string, Array<any>> = new Map();

    masters = {};

    scrollEvents: Array<Function> = [];

    visible: boolean;

    disposes: Array<Function> = [];

    styleTheme: "dark" | "light";

    windowsOne: IObservableArray<WindowModelType>;

    constructor({
        initialBc,
        applicationStore,
        routesStore,
        ckPage,
        isActiveRedirect,
        isReadOnly,
        styleTheme = styleThemeConst,
    }: PageModelParamsType) {
        this.applicationStore = applicationStore;
        this.ckPage = ckPage;
        this.isActiveRedirect = isActiveRedirect;

        extendObservable(this, {
            fieldValueMaster: observable.map(),
            globalValues: observable.map(applicationStore.globalValues),
            get hiddenPage() {
                return applicationStore.pagesStore.activePage !== this;
            },
            // TODO: rename to isInlineEdit
            get isEdit() {
                return (
                    this.windowsOne.filter((window) => window.windowBc.edittype === "inline").length > 0 ||
                    [...this.stores.entries()].filter((entry) => entry[1].editing === true).length > 0
                );
            },
            isLoading: false,
            questionWindow: null,
            get route() {
                return (
                    (routesStore && routesStore.recordsStore.records.find((record) => record.ckId === this.ckPage)) || {
                        ckId: this.ckPage,
                    }
                );
            },
            showQuestionWindow: false,
            stores: observable.map(),
            styleTheme,
            get visible() {
                return applicationStore.pagesStore.activePage === this;
            },
            // TODO: Удалить windows и перевести windowsOne на windows
            windows: observable.map(),
            windowsOne: observable.array(),
        });

        this.disposes.push(
            reaction(
                // $FlowFixMe
                () => this.globalValues.toJS(),
                (globalValues) =>
                    snackbarStore.snackbarOpenAction(
                        {
                            autoHidden: true,
                            hiddenTimeout: 0,
                            status: "debug",
                            text: renderGlobalValuelsInfo(globalValues),
                            title: `${i18next.t("dcfb61366b054c6e95ae83593cfb9cd9")}: ${i18next.t(ckPage || "")}`,
                        },
                        this.route,
                    ),
            ),
        );

        extendObservable(
            this,
            {
                get isReadOnly() {
                    return isEmpty(isReadOnly)
                        ? (applicationStore.caActions || []).indexOf(this.route.cnActionEdit) < 0
                        : isReadOnly;
                },
                pageBc: initialBc || [],
            },
            undefined,
            {deep: false},
        );
    }

    updateGlobalValues = (values: Object) => {
        forEach(values, (value, key) => {
            const oldValue = this.globalValues.get(key);

            if (oldValue !== value && (!isEmpty(oldValue) || !isEmpty(value))) {
                this.globalValues.set(key, value);
            }
        });
    };

    openQuestionWindow = action("openQuestionWindow", (questionWindow: string, saveCallBack: Function) => {
        this.showQuestionWindow = true;
        this.questionWindow = questionWindow;
        this.saveCallBack = saveCallBack;
    });

    handleQuestionAccept = action("handleQuestionAccept", () => {
        this.showQuestionWindow = false;
        this.questionWindow = null;
        if (this.saveCallBack) {
            this.saveCallBack(1);
        }
        this.saveCallBack = null;
    });

    handleQuestionDecline = action("handleQuestionDecline", () => {
        this.showQuestionWindow = false;
        this.questionWindow = null;
        if (this.saveCallBack) {
            this.saveCallBack(0);
        }
        this.saveCallBack = null;
    });

    addFieldValueMaster = action("addFieldValueMaster", (name: string, value: any) => {
        this.fieldValueMaster.set(name, value);
    });

    removeFieldValueMaster = action("addFieldValueMaster", (name: string) => {
        this.fieldValueMaster.delete(name);
    });

    addStore = action("addStore", (store: StoreModelTypes, name: string) => {
        if (this.stores.has(name)) {
            logger(i18next.t("7ef1547ac7084e178bf1447361e3ccc3"));
        }

        this.stores.set(name, store);
    });

    removeStore = action("removeStore", (name: string, store: StoreModelTypes) => {
        if (store && store === this.stores.get(name)) {
            this.stores.delete(name);
        }
    });

    addGlobalStoresAction = (name: string, store: any) => {
        let stores = this.globalStores.get(name);

        if (!stores) {
            stores = [];

            this.globalStores.set(name, stores);
        }

        stores.push(store);
    };

    removeGlobalStoresAction = (name: string, store: any) => {
        const stores = this.globalStores.get(name);

        if (stores) {
            const storeIndex = stores.findIndex((internalStore) => internalStore === store);

            if (storeIndex >= 0) {
                stores.splice(storeIndex, 1);
            }
        }
    };

    addWindowAction = action("addWindowAction", (window: WindowModelType, name: string) => {
        this.windows.set(name, window);
    });

    removeWindowAction = action("removeWindowAction", (name: string) => {
        this.windows.delete(name);
    });

    loadConfigAction = action("loadConfigAction", (ckPage: string, session: string) => {
        const fetchResult = sendRequestList({
            action: "sql",
            json: {
                filter: {
                    ckPage,
                },
            },
            query: "GetMetamodelPage2.0",
            session,
        });

        this.ckPage = ckPage;

        this.setLoadingAction(true);

        return fetchResult
            .then((response) => {
                if (snackbarStore.checkValidResponseAction(response[0], this.route, undefined, this.applicationStore)) {
                    const classNames = findClassNames(response);

                    loadComponentsFromModules(classNames).then(() => {
                        this.pageBc = (response.length && response[0].children) || [];
                    });
                }
            })

            .catch((error) => {
                snackbarStore.checkExceptResponse(error, this.route, this.applicationStore);
                this.pageBc = [];
            })
            .then((res) => {
                this.setLoadingAction(false);

                return res;
            });
    });

    setPageElAction = action("setPageElAction", (pageEl: ?HTMLDivElement) => {
        this.pageEl = pageEl;
    });

    setPageInnerElAction = (pageInnerEl: ?HTMLDivElement) => {
        this.pageInnerEl = pageInnerEl;
    };

    addFormAction = action("addFormAction", (formType: FormType, form: any) => {
        if (formType === "filter") {
            this.formFilters.push(form);
        }
    });

    removeFormAction = action("removeFormAction", (formType: FormType, form: any) => {
        if (formType === "filter") {
            const index = this.formFilters.indexOf(form);

            if (index > -1) {
                this.formFilters.splice(index, 1);
            }
        }
    });

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

        if (nextComponentStore && nextComponentStore.handleNextStepAction) {
            nextComponentStore.handleNextStepAction();

            return true;
        }

        return false;
    };

    nextStepAction = action("nextStepAction", (mode: BuilderModeType, bc: Object) => {
        const canNextStep = mode === "1" && (!bc.stepname || bc.stepname === this.currentStep);
        const stepnamenext = this.getNextStepName(bc.stepnamenext);

        if (stepnamenext && canNextStep && this.handleNextStep(stepnamenext)) {
            this.currentStep = stepnamenext;
            getNextComponent(stepnamenext, this.pageBc, (childBc, parentBc) => {
                if (parentBc.type === "TABPANEL") {
                    const tabStore = this.stores.get(parentBc.ckPageObject);

                    if (tabStore) {
                        tabStore.setActiveTab(childBc.ckPageObject);
                    }
                }
            });
        } else {
            this.resetStepAction();
        }
    });

    getNextStepName = (stepnamenext: string): string => {
        if (isEmpty(stepnamenext)) {
            return stepnamenext;
        }

        const stepNameQuery = stepnamenext.split("?");

        if (stepNameQuery.length <= 1) {
            return stepnamenext;
        }

        const [stepNameExp, stepNames] = stepNameQuery;
        const isStepNameTurnFirst = parseMemoize(stepNameExp).runer(this.globalValues);

        return stepNames.split(":")[isStepNameTurnFirst ? 0 : 1];
    };

    setLoadingAction = action("setLoadingAction", (isLoading: boolean) => {
        this.loadingCount = Math.max(0, this.loadingCount + (isLoading ? 1 : -1));

        this.isLoading = this.loadingCount !== 0;
    });

    scrollToRecordAction = (params: Object) => {
        this.stores.forEach((store) => {
            if (store.name === "grid") {
                store.scrollToRecordAction(params);
            }
        });
    };

    reloadPageAction = action("reloadPageAction", () => {
        this.clearAction();
        if (this.showQuestionWindow) {
            this.handleQuestionDecline();
        }
        this.globalValues.merge(this.applicationStore.globalValues);
        this.loadConfigAction(this.ckPage, this.applicationStore.session);
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

    removeFromMastersAction = (ckMaster?: string, field: ?Field) => {
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
        this.pageBc = [];
        this.globalValues.clear();
        this.stores.clear();
        this.windows.clear();
        this.windowsOne.clear();
        this.fieldValueMaster.clear();
    });

    removePageAction = () => {
        this.disposes.forEach((dispose) => dispose());
        this.disposes = [];
    };

    createWindowAction = action("createWindowAction", (params: CreateWindowType) => {
        const window = new WindowModel({
            bc: params.windowBc,
            mode: params.mode,
            pageStore: this,
            values: params.values,
        });

        this.windowsOne.push(window);
    });

    closeWindowAction = action("closeWindowAction", (ckPageObject) => {
        const window = this.windowsOne.find((win) => win.bc.ckPageObject === ckPageObject);

        if (window) {
            this.windowsOne.remove(window);
        }
    });
}

export default PageModel;
