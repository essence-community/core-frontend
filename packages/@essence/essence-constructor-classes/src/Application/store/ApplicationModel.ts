/* eslint-disable max-lines */
import {computed, action, observable, when, ObservableMap} from "mobx";
import {
    removeFromStore,
    saveToStore,
    FieldValue,
    noop,
    IApplicationModel,
    isEmpty,
    IBuilderConfig,
    IPagesModel,
    IRecordsModel,
    IPageModel,
    IBuilderMode,
    IHandlers,
    IRecord,
} from "@essence-community/constructor-share";
import {
    VAR_RECORD_ID,
    VAR_RECORD_URL,
    VAR_LANG_ID,
    VAR_NAMESPACE_VALUE,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CV_LOGIN,
    VAR_SETTING_MODULE_URL,
    VAR_SETTING_ANONYMOUS_ACTION,
    VAR_SETTING_WS_GATE_URL,
    loggerRoot,
} from "@essence-community/constructor-share/constants";
import {i18next} from "@essence-community/constructor-share/utils";
import {parseMemoize} from "@essence-community/constructor-share/utils/parser";
import {
    snackbarStore,
    RecordsModel,
    settingsStore,
    PageModel,
    modulesStore,
    redirectToPage,
} from "@essence-community/constructor-share/models";
import {History} from "history";
import {pages} from "../mocks";
import {RoutesModel} from "./RoutesModel";
import {IAuthSession} from "./AuthModel.types";
import {PagesModel} from "./PagesModel";
import {AuthModel} from "./AuthModel";

const TIMEOUT_RECONNECT = 15000;
const TIMEOUT_LONG_RECONNECT = 300000;

const MAX_RECONNECT = 5;

const LOGOUT_CODE = 4001;

export const CLOSE_CODE = 4002;

const prepareUserGlobals = (userInfo: Partial<IAuthSession>) => {
    return Object.entries(userInfo).reduce((acc: IRecord, [key, value]) => {
        acc[`g_sess_${key}`] = value;

        return acc;
    }, {});
};
const NONE_BC: IBuilderConfig = {
    [VAR_RECORD_PAGE_OBJECT_ID]: "none",
    [VAR_RECORD_PARENT_ID]: "none",
    type: "NONE",
};
const logger = loggerRoot.extend("ApplicationModel");

/**
 * @exports ApplicationModel
 */
export class ApplicationModel implements IApplicationModel {
    routesStore: RoutesModel | null;

    applicationStore = null;

    authStore: AuthModel;

    wsClient: WebSocket | null;

    countConnect: number;

    pagesStore: IPagesModel;

    recordsStore: IRecordsModel;

    recordsApplicationStore: IRecordsModel;

    pageStore: IPageModel;

    mode: string;

    recordId: string = VAR_RECORD_ID;

    isLogoutProcess = false;

    history: History;

    @computed get bc(): IBuilderConfig {
        const {children} = this.recordsStore.selectedRecordValues;
        const {selectedRecordValues} = this.recordsApplicationStore;

        if (!Array.isArray(children)) {
            return NONE_BC;
        }

        const bc =
            children.find((rec: IBuilderConfig) => {
                return parseMemoize(rec.activerules).runer({get: this.handleGetValue});
            }) || NONE_BC;

        if (bc) {
            if (bc[VAR_RECORD_PAGE_OBJECT_ID] === selectedRecordValues[VAR_RECORD_PAGE_OBJECT_ID]) {
                return (selectedRecordValues as unknown) as IBuilderConfig;
            }

            return bc;
        }

        return NONE_BC;
    }

    @observable blockText = "";

    @observable globalValues: ObservableMap<string, FieldValue> = observable.map();

    @observable isApplicationReady = false;

    @observable isBlock = false;

    @observable public url = "";

    // @deprecated
    @computed get session(): string | undefined {
        return this.authStore.userInfo.session;
    }

    // @deprecated
    @computed get authData(): Record<string, FieldValue> {
        return this.authStore.userInfo as any;
    }

    constructor(history: History, url: string) {
        this.routesStore = null;
        this.url = url;
        this.mode = url;
        this.history = history;
        this.pagesStore = new PagesModel(this);
        this.authStore = new AuthModel(this);
        this.countConnect = 0;
        this.recordsStore = new RecordsModel(
            {
                [VAR_RECORD_PAGE_OBJECT_ID]: "application",
                [VAR_RECORD_PARENT_ID]: "application",
                [VAR_RECORD_QUERY_ID]: "MTApplicationRoute",
                defaultvalue: "##alwaysfirst##",
                type: "NONE",
            },
            {applicationStore: this, pageStore: null},
        );
        this.recordsApplicationStore = new RecordsModel(
            {
                [VAR_RECORD_PAGE_OBJECT_ID]: "application",
                [VAR_RECORD_PARENT_ID]: "application",
                [VAR_RECORD_QUERY_ID]: "GetPageObject",
                defaultvalue: "##alwaysfirst##",
                type: "NONE",
            },
            {applicationStore: this, pageStore: null},
        );

        this.globalValues.merge(settingsStore.globals);
        this.globalValues.merge(prepareUserGlobals(this.authStore.userInfo));

        this.pageStore = new PageModel({
            applicationStore: this,
            defaultVisible: true,
            isActiveRedirect: false,
            pageId: "-1",
        });
    }

    handleGetValue = (name: string) => {
        if (name === VAR_RECORD_URL) {
            return this.url;
        }

        if (name === VAR_SETTING_ANONYMOUS_ACTION) {
            const value = this.globalValues.get(name);

            return typeof value === "string" ? parseInt(value, 10) : value;
        }

        return this.globalValues.get(name);
    };

    updateGlobalValuesAction = action("updateGlobalValues", (values: Record<string, string>): void => {
        Object.keys(values).forEach((key: string) => {
            const value = values[key];
            const oldValue = this.globalValues.get(key);

            if (oldValue !== value && (!isEmpty(oldValue) || !isEmpty(value))) {
                this.globalValues.set(key, value);
                this.pageStore.globalValues.set(key, value);
            }
        });
    });

    setSesssionAction = action("setSesssionAction", (userInfo: IAuthSession) => {
        const newGlobals = prepareUserGlobals(userInfo);

        this.globalValues.merge(newGlobals);
        this.pageStore.globalValues.merge(newGlobals);

        return Promise.resolve();
    });

    logoutAction = action("logoutAction", async () => {
        if (this.isLogoutProcess) {
            return true;
        }
        this.isLogoutProcess = true;

        await this.authStore.logoutAction();

        removeFromStore("auth");

        if (this.history.location.pathname.indexOf("auth") === -1) {
            const {state: {backUrl = this.history.location.pathname} = {}} = this.history.location;

            this.history.push("/auth", {backUrl});
        }

        if (this.wsClient && this.wsClient.readyState === this.wsClient.OPEN) {
            this.wsClient.onclose = noop;
            this.wsClient.close(LOGOUT_CODE, "logoutAction");
            this.wsClient = null;
        }
        this.isLogoutProcess = false;

        return true;
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    redirectToAction = action("redirectToAction", async (pageId: string, params: Record<string, any>) => {
        const page = await this.pagesStore.setPageAction(pageId, true);

        // Log
        if (page) {
            await when(() => !page.isLoading);

            await redirectToPage(page, params);
        }
    });

    redirectToFirstValidApplication = async () => {
        const {children} = this.recordsStore.selectedRecordValues;

        if (Array.isArray(children)) {
            const firstValisApplication = children.find((rec: IBuilderConfig) => {
                if (!rec.activerules) {
                    return false;
                }

                return parseMemoize(rec.activerules.replace(/cv_url\s?={2,3}\s?["']\w+["']/u, "true")).runer({
                    get: this.handleGetValue,
                });
            });

            if (firstValisApplication) {
                const match = /cv_url\s?={2,3}\s?["'](?<app>\w+)["']/u.exec(firstValisApplication.activerules);

                if (match && match.groups && match.groups.app) {
                    return this.history.push(`/${match.groups.app}`, {backUrl: this.history.location.pathname});
                }
            }
        }

        if (this.authStore.userInfo.session) {
            await this.logoutAction();
        }

        return this.history.push("/auth", {backUrl: this.history.location.pathname});
    };

    loadApplictionConfigs = () =>
        this.recordsStore.loadRecordsAction({}).then(() => {
            const {children} = this.recordsStore.selectedRecordValues;

            this.recordsStore.setRecordsAction([
                {
                    ...this.recordsStore.selectedRecordValues,
                    children: [...(Array.isArray(children) ? children : []), ...pages],
                },
            ]);
            this.recordsStore.setSelectionAction(this.recordsStore.selectedRecordId);
        });

    loadApplicationAction = action("loadApplicationAction", async () => {
        await Promise.all<Promise<any> | false>([
            this.recordsStore.recordsState.status === "init" && this.loadApplictionConfigs(),
            settingsStore.settings.module_available === "true" &&
                !modulesStore.isLoaded &&
                modulesStore.loadModules(settingsStore.settings[VAR_SETTING_MODULE_URL]),
            snackbarStore.recordsStore.recordsState.status === "init" &&
                snackbarStore.recordsStore.loadRecordsAction({}),
        ]);

        if (this.bc && this.bc[VAR_RECORD_PAGE_OBJECT_ID] !== "none") {
            this.routesStore = new RoutesModel(
                {
                    [VAR_RECORD_PAGE_OBJECT_ID]: "routes",
                    [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                    [VAR_RECORD_QUERY_ID]: this.bc[VAR_RECORD_QUERY_ID] || "MTRoute",
                    type: "NONE",
                },
                this,
            );

            await this.routesStore?.recordsStore.loadRecordsAction();
            this.pagesStore.restorePagesAction(this.authStore.userInfo[VAR_RECORD_CV_LOGIN] || "");
        } else {
            this.redirectToFirstValidApplication();

            return false;
        }

        this.isApplicationReady = true;

        return true;
    });

    blockApplicationAction = action("blockApplicationAction", (type: string, text = "") => {
        if (this.isBlock && type === "unblock") {
            window.location.reload(true);
        }
        this.isBlock = type === "block";
        this.blockText = text;
    });

    initWsClient = (session: string) => {
        let wsClient: WebSocket | null = null;

        new Promise((resolve, reject) => {
            const wsUrl = settingsStore.settings[VAR_SETTING_WS_GATE_URL];
            const currentSession = this.authStore.userInfo.session;
            let url = wsUrl;

            if (this.wsClient && this.wsClient.readyState === this.wsClient.OPEN) {
                resolve();
            }
            if (wsUrl.indexOf("ws") === -1) {
                const baseUrl = new URL(window.location.href);

                url = `${baseUrl.protocol.indexOf("https") > -1 ? "wss" : "ws"}://${baseUrl.host}${wsUrl}`;
            }
            url = `${url}${url.indexOf("?") > -1 ? "&" : "?"}session=${session}`;
            wsClient = new WebSocket(url, "notification");
            wsClient.onopen = () => {
                this.countConnect = 0;
                resolve();
            };
            wsClient.onerror = reject;
            wsClient.onmessage = this.handleWsMessage;
            wsClient.onclose = (event: Record<string, any>) => {
                if (event.code === CLOSE_CODE) {
                    return;
                } else if (event.code === LOGOUT_CODE && session === currentSession) {
                    this.logoutAction();

                    return;
                } else if (event.code === LOGOUT_CODE && session !== currentSession) {
                    return;
                }
                if (currentSession && this.countConnect < MAX_RECONNECT) {
                    this.countConnect += 1;
                    setTimeout(() => this.initWsClient(currentSession), TIMEOUT_RECONNECT);
                } else if (currentSession) {
                    this.countConnect = 0;
                    setTimeout(() => this.initWsClient(currentSession), TIMEOUT_LONG_RECONNECT);
                    snackbarStore.snackbarOpenAction(
                        {
                            pageName: "static:2ff612aa52314ddea65a5d303c867eb8",
                            status: "error",
                            text: "static:bcdc7e54547e405c9873b3ebea4f84c4",
                        },
                        {},
                    );
                }
            };
        })
            .then(() => {
                this.wsClient = wsClient || this.wsClient;
            })
            .catch((err) => {
                snackbarStore.snackbarOpenAction(
                    {
                        pageName: "static:2ff612aa52314ddea65a5d303c867eb8",
                        status: "error",
                        text: err.message || "static:4b4ef9aed688462799f24efe8413da9f",
                    },
                    {},
                );
            });
    };

    handleWsMessage = (msg: MessageEvent) => {
        const json = JSON.parse(msg.data);

        json.forEach((event: any) => {
            switch (event.event) {
                case "notification": {
                    snackbarStore.checkValidResponseAction(event.data, {
                        applicationStore: this,
                        route: {
                            [VAR_RECORD_ROUTE_NAME]: "static:2ff612aa52314ddea65a5d303c867eb8",
                        },
                    });
                    break;
                }
                case "mask": {
                    this.blockApplicationAction(event.data.action, event.data.msg);
                    break;
                }
                case "reloaduser": {
                    this.reloadUserInfoAction(event.data);
                    break;
                }
                case "reloadpageobject": {
                    this.reloadPageObjectAction(event.data.ck_page, event.data.ck_page_object);
                    break;
                }
                case "localization": {
                    i18next.reloadResources(event.data[VAR_LANG_ID], event.data[VAR_NAMESPACE_VALUE]);
                    break;
                }
                default: {
                    logger(new Error(i18next.t("static:8fe6e023ee11462db952d62d6b8b265e", {message: msg.data})));
                }
            }
        });
    };

    reloadUserInfoAction = action("reloadUserInfo", (authValues: IAuthSession) => {
        this.authStore.userInfo = authValues;
        this.globalValues.merge(authValues);
        saveToStore("auth", authValues);
    });

    reloadPageObjectAction = action("reloadPageObject", (pageId: string, ckPageObject: string) => {
        const findedPage = this.pagesStore.pages.find((page) => page.pageId === pageId);

        if (findedPage) {
            const store = findedPage.stores.get(ckPageObject);

            if (store && store.reloadStoreAction) {
                store.reloadStoreAction();
            }
        }
    });

    reloadStoreAction = () => Promise.resolve({});

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    clearStoreAction = () => {};

    reloadApplication = async (appName: string, routerPageId?: string, filter?: string) => {
        await this.handleChangeUrl(appName);
        const routes = this.routesStore ? this.routesStore.recordsStore.records : [];
        const pageConfig = routes.find(
            (route: IRecord) => route[VAR_RECORD_ID] === routerPageId || route[VAR_RECORD_URL] === routerPageId,
        );
        const pageId = pageConfig && pageConfig[VAR_RECORD_ID];

        if (typeof pageId === "string") {
            await this.handleSetPage(pageId, filter);
        } else {
            // Can remove active page
        }
    };

    handleWindowOpen = (_mode: IBuilderMode, btnBc: IBuilderConfig) => {
        const window =
            this.bc.childwindow && this.bc.childwindow.find((win: IBuilderConfig) => win.ckwindow === btnBc.ckwindow);

        if (window) {
            this.pageStore.createWindowAction({
                ...window,
                mode: "1",
            });

            return Promise.resolve(true);
        }

        return Promise.resolve(false);
    };

    handleChangeUrl = async (url: string) => {
        this.isApplicationReady = false;
        this.url = url;

        if (this.bc[VAR_RECORD_PAGE_OBJECT_ID] !== "none") {
            const queryId = this.bc[VAR_RECORD_QUERY_ID] || "MTRoute";

            if (!this.routesStore || this.routesStore.recordsStore.bc[VAR_RECORD_QUERY_ID] !== queryId) {
                this.routesStore = new RoutesModel(
                    {
                        [VAR_RECORD_PAGE_OBJECT_ID]: "routes",
                        [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                        [VAR_RECORD_QUERY_ID]: queryId,
                        type: "NONE",
                    },
                    this,
                );
            }

            await this.routesStore?.recordsStore.loadRecordsAction();

            this.pagesStore.pages.clear();
            this.pagesStore.restorePagesAction(this.authStore.userInfo[VAR_RECORD_CV_LOGIN] || "");
            this.pagesStore.activePage = null;
            this.isApplicationReady = true;
        } else {
            this.redirectToFirstValidApplication();
        }
    };

    handleSetPage = async (pageId: string, filter?: string) => {
        if (filter) {
            try {
                // Convert to string: encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify({})))))
                const data = decodeURIComponent(escape(window.atob(decodeURIComponent(filter))));

                await this.redirectToAction(pageId, JSON.parse(data));
            } catch (err) {
                logger(err);
                await this.pagesStore.setPageAction(pageId, false);
            }
        } else {
            await this.pagesStore.setPageAction(pageId, false);
        }
    };

    invokeHandler = () => Promise.resolve(false);

    /**
     * @memberof ApplicationModel
     * @member
     */
    handlers: IHandlers = {
        /**
         * Выход из приложения
         * @memberof ApplicationModel.handlers
         * @instance
         */
        onLogout: this.logoutAction,
        /**
         * Открытие окна по ckwindow
         * @memberof ApplicationModel.handlers
         * @instance
         */
        onWindowOpen: this.handleWindowOpen,
    };
}
