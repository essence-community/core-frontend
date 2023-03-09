/* eslint-disable max-lines */
import {computed, action, observable, when, ObservableMap} from "mobx";
import {
    removeFromLocalStore,
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
    IRoutesModel,
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
    VAR_RECORD_CK_VIEW,
    VAR_SETTING_VIEW_URL,
    VAR_SETTING_URL_APP_NAME,
    VAR_SETTING_AUTH_URL,
    loggerRoot,
} from "@essence-community/constructor-share/constants";
import {i18next, redirectAuth, TFunction} from "@essence-community/constructor-share/utils";
import {parseMemoize} from "@essence-community/constructor-share/utils/parser";
import {
    snackbarStore,
    RecordsModel,
    settingsStore,
    PageModel,
    modulesStore,
    redirectToPage,
    viewStore,
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

const RELOAD_FIRST = 500;

const LOGOUT_CODE = 4001;

export const CLOSE_CODE = 4002;

const prepareUserGlobals = (userInfo: Partial<IAuthSession>) => {
    return Object.entries(userInfo).reduce((acc: IRecord, [key, value]) => {
        acc[`g_sess_${key}`] = value;

        return acc;
    }, {});
};
const NONE_BC: IBuilderConfig = {
    [VAR_RECORD_CK_VIEW]: "system",
    [VAR_RECORD_PAGE_OBJECT_ID]: "none",
    [VAR_RECORD_PARENT_ID]: "none",
    type: "NONE",
};
const logger = loggerRoot.extend("ApplicationModel");

/**
 * @exports ApplicationModel
 */
export class ApplicationModel implements IApplicationModel {
    routesStore: IRoutesModel | null;

    applicationStore = null;

    authStore: AuthModel;

    wsClient: WebSocket | null = null;

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
        const children = this.recordsStore.recordsState.records as any;

        if (!Array.isArray(children)) {
            return NONE_BC;
        }

        const bc =
            children.find((rec: IBuilderConfig) => {
                return (
                    rec[VAR_RECORD_URL] === this.url &&
                    ((isEmpty(rec.activerules) && parseMemoize(rec.activerules).runer({get: this.handleGetValue})) ||
                        true)
                );
            }) || NONE_BC;

        if (bc) {
            return bc;
        }

        return NONE_BC;
    }

    @computed get defaultValue(): string | undefined {
        let defaultValue = this.bc.defaultvalue;

        if (this.bc.defaultvaluerule) {
            defaultValue = parseMemoize(this.bc.defaultvaluerule).runer({
                get: this.handleGetValue,
            });
        }

        return defaultValue;
    }

    @observable blockText: string | ((trans: TFunction) => string) = "";

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

        this.globalValues.merge(settingsStore.globals);
        this.globalValues.merge(prepareUserGlobals(this.authStore.userInfo));

        this.pageStore = new PageModel({
            applicationStore: this,
            defaultVisible: true,
            isActiveRedirect: false,
            isReadOnly: false,
            pageId: "-1",
        });
        this.pageStore.globalValues.merge(settingsStore.globals);
        this.pageStore.globalValues.merge(prepareUserGlobals(this.authStore.userInfo));
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

    @action
    updateGlobalValuesAction = (values: Record<string, string>): void => {
        Object.keys(values).forEach((key: string) => {
            const value = values[key];
            const oldValue = this.globalValues.get(key);

            if (oldValue !== value && (!isEmpty(oldValue) || !isEmpty(value))) {
                this.globalValues.set(key, value);
                this.pageStore.globalValues.set(key, value);
            }
        });
    };

    @action
    setSessionAction = (userInfo: IAuthSession) => {
        const newGlobals = prepareUserGlobals(userInfo);

        this.globalValues.merge(newGlobals);
        this.pageStore.globalValues.merge(newGlobals);

        return Promise.resolve();
    };

    @action
    logoutAction = async () => {
        if (this.isLogoutProcess) {
            return true;
        }
        this.isLogoutProcess = true;

        await this.authStore.logoutAction();

        removeFromLocalStore("auth");

        const authUrl = settingsStore.settings[VAR_SETTING_AUTH_URL] || "/auth";

        if (this.history.location.pathname.indexOf(authUrl) === -1) {
            const state = (this.history.location.state || {}) as {backUrl?: string};
            const {backUrl = this.history.location.pathname} = state;

            redirectAuth({
                backUrl,
                history: this.history,
                pageStore: this.pageStore,
            });
        }

        if (this.wsClient && this.wsClient.readyState === this.wsClient.OPEN) {
            this.wsClient.onclose = noop;
            this.wsClient.close(LOGOUT_CODE, "logoutAction");
            this.wsClient = null;
        }
        this.isLogoutProcess = false;

        return true;
    };

    @action
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    redirectToAction = async (redirectPageId: string, params: Record<string, any>) => {
        const pageConfig = this.routesStore?.recordsStore.records.find(
            (route: IRecord) => route[VAR_RECORD_ID] === redirectPageId || route[VAR_RECORD_URL] === redirectPageId,
        );
        const pageId = pageConfig && pageConfig[VAR_RECORD_ID];

        if (pageId) {
            const page = await this.pagesStore.setPageAction(pageId as string, true);

            // Log
            if (page) {
                await when(() => !page.isLoading);

                await redirectToPage(page, params);
            }
        }
    };

    @action
    // eslint-disable-next-line max-statements
    redirectToFirstValidApplication = async (url?: string, countReload = 0): Promise<boolean | void> => {
        const children = this.recordsStore.records as any;

        if (Array.isArray(children)) {
            let firstValidApplication = url
                ? children.find((rec: IBuilderConfig) => {
                      if (rec[VAR_RECORD_URL] !== url) {
                          return false;
                      }
                      if (isEmpty(rec.activerules)) {
                          return true;
                      }

                      return parseMemoize(rec.activerules).runer({
                          get: this.handleGetValue,
                      });
                  })
                : null;

            if (!firstValidApplication) {
                firstValidApplication = children.find((rec: IBuilderConfig) => {
                    if (isEmpty(rec.activerules)) {
                        return true;
                    }

                    return parseMemoize(rec.activerules).runer({
                        get: this.handleGetValue,
                    });
                });
            }

            if (firstValidApplication && firstValidApplication[VAR_RECORD_URL]) {
                if (firstValidApplication[VAR_RECORD_URL] !== url) {
                    const state = (this.history.location.state || {}) as {backUrl?: string};
                    const {backUrl = this.history.location.pathname} = state;
                    let defaultValue = firstValidApplication.defaultvalue;

                    if (firstValidApplication.defaultvaluerule) {
                        defaultValue = parseMemoize(firstValidApplication.defaultvaluerule).runer({
                            get: this.handleGetValue,
                        });
                    }

                    return this.history.push(
                        `/${firstValidApplication[VAR_RECORD_URL]}${defaultValue ? "/" + defaultValue : ""}`,
                        isEmpty(backUrl) || backUrl === "/" ? {backUrl: undefined} : {backUrl: backUrl},
                    );
                } else {
                    await viewStore.loadView(
                        firstValidApplication[VAR_RECORD_CK_VIEW],
                        settingsStore.settings[VAR_SETTING_VIEW_URL],
                    );
                    const queryId = firstValidApplication[VAR_RECORD_QUERY_ID] || "MTRoute";

                    if (!this.routesStore || this.routesStore.recordsStore.bc[VAR_RECORD_QUERY_ID] !== queryId) {
                        this.routesStore = new RoutesModel(
                            {
                                [VAR_RECORD_PAGE_OBJECT_ID]: "routes",
                                [VAR_RECORD_PARENT_ID]: firstValidApplication[VAR_RECORD_PAGE_OBJECT_ID],
                                [VAR_RECORD_QUERY_ID]: queryId,
                                getglobaltostore: [{in: VAR_SETTING_URL_APP_NAME}],
                                type: "NONE",
                            },
                            this,
                            {
                                searchValues: {appUrl: url || this.url},
                            },
                        );
                    }
                    this.routesStore?.recordsStore.setSearchValuesAction({appUrl: url || this.url});
                    await this.routesStore?.recordsStore.searchAction({appUrl: url || this.url});

                    this.pagesStore.pages.clear();
                    this.pagesStore.restorePagesAction(this.authStore.userInfo[VAR_RECORD_CV_LOGIN] || "");

                    return;
                }
            }
        }

        if (this.authStore.userInfo.session) {
            if (MAX_RECONNECT > countReload) {
                setTimeout(() => this.redirectToFirstValidApplication(url, countReload + 1), RELOAD_FIRST);

                return;
            } else {
                await this.logoutAction();
            }
        }

        const authUrl = settingsStore.settings[VAR_SETTING_AUTH_URL] || "/auth";

        if (this.history.location.pathname.indexOf(authUrl) === -1) {
            const state = (this.history.location.state || {}) as {backUrl?: string};
            const {backUrl = this.history.location.pathname} = state;

            redirectAuth({
                backUrl,
                history: this.history,
                pageStore: this.pageStore,
            });
        }
    };

    @action
    loadApplictionConfigs = (): Promise<void> =>
        this.recordsStore.loadRecordsAction({}).then(() => {
            const records = this.recordsStore.records;

            this.recordsStore.setRecordsAction([...records, ...pages]);
        });

    @action
    loadApplicationAction = async () => {
        await Promise.all<Promise<any> | false>([
            this.recordsStore.recordsState.status === "init" && this.loadApplictionConfigs(),
            settingsStore.settings.module_available === "true" &&
                !modulesStore.isLoaded &&
                modulesStore.loadModules(
                    settingsStore.settings[VAR_SETTING_MODULE_URL],
                    this.bc[VAR_RECORD_CK_VIEW] || "system",
                ),
            snackbarStore.recordsStore.recordsState.status === "init" &&
                snackbarStore.recordsStore.loadRecordsAction({}),
        ]);

        if (this.bc && this.bc[VAR_RECORD_PAGE_OBJECT_ID] !== "none") {
            await viewStore.loadView(this.bc[VAR_RECORD_CK_VIEW], settingsStore.settings[VAR_SETTING_VIEW_URL]);
            this.routesStore = new RoutesModel(
                {
                    [VAR_RECORD_PAGE_OBJECT_ID]: "routes",
                    [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                    [VAR_RECORD_QUERY_ID]: this.bc[VAR_RECORD_QUERY_ID] || "MTRoute",
                    getglobaltostore: [{in: VAR_SETTING_URL_APP_NAME}],
                    type: "NONE",
                },
                this,
                {
                    searchValues: {appUrl: this.url},
                },
            );
            this.routesStore?.recordsStore.setSearchValuesAction({appUrl: this.url});
            await this.routesStore?.recordsStore.searchAction({appUrl: this.url});
            this.pagesStore.restorePagesAction(this.authStore.userInfo[VAR_RECORD_CV_LOGIN] || "");
        } else {
            await this.redirectToFirstValidApplication(this.url);
            this.isApplicationReady = true;

            return false;
        }

        this.isApplicationReady = true;

        return true;
    };

    @action
    blockApplicationAction = (type: string, text: string | ((trans: TFunction) => string) = "") => {
        if (this.isBlock && type === "unblock") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.location.reload(true);
        }
        this.isBlock = type === "block";
        this.blockText = text;
    };

    initWsClient = (session: string) => {
        let wsClient: WebSocket | null = null;

        new Promise<void>((resolve, reject) => {
            const wsUrl = settingsStore.settings[VAR_SETTING_WS_GATE_URL];
            const currentSession = this.authStore.userInfo.session;
            let url = wsUrl;

            if (!currentSession) {
                resolve();
            }

            if (this.wsClient && this.wsClient.readyState === this.wsClient.OPEN) {
                resolve();
            }
            if (wsUrl.indexOf("ws") === -1) {
                const baseUrl = new URL(window.location.href);

                url = `${baseUrl.protocol.indexOf("https") > -1 ? "wss" : "ws"}://${baseUrl.host}${wsUrl}`;
            }
            url = `${url}${url.indexOf("?") > -1 ? "&" : "?"}session=${encodeURIComponent(session)}`;
            wsClient = new WebSocket(url, "notification");
            wsClient.onopen = () => {
                this.countConnect = 0;
                resolve();
            };
            wsClient.onerror = reject;
            wsClient.onmessage = this.handleWsMessage;
            wsClient.onclose = (event: Record<string, any>) => {
                if (event.code === CLOSE_CODE) {
                    this.wsClient = null;

                    return;
                } else if (event.code === LOGOUT_CODE && session === currentSession) {
                    this.logoutAction();
                    this.wsClient = null;

                    return;
                } else if (event.code === LOGOUT_CODE && session !== currentSession) {
                    this.wsClient = null;

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

    @action
    reloadUserInfoAction = (authValues: IAuthSession) => {
        this.authStore.userInfo = authValues;
        this.globalValues.merge(authValues);
        saveToStore("auth", authValues);
    };

    @action
    reloadPageObjectAction = (pageId: string, ckPageObject: string) => {
        const findedPage = this.pagesStore.pages.find((page) => page.pageId === pageId);

        if (findedPage) {
            const store = findedPage.stores.get(ckPageObject);

            if (store && store.reloadStoreAction) {
                store.reloadStoreAction();
            }
        }
    };

    reloadStoreAction = () => Promise.resolve({});

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    clearStoreAction = () => {};

    @action
    reloadApplication = async (appName: string, routerPageId?: string, filter?: string) => {
        await this.handleChangeUrl(appName);
        const routes = this.routesStore ? this.routesStore.recordsStore.records : [];
        const routePageIdFind = routerPageId || this.defaultValue;
        const pageConfig = routes.find(
            (route: IRecord) => route[VAR_RECORD_ID] === routePageIdFind || route[VAR_RECORD_URL] === routePageIdFind,
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

    @action
    handleChangeUrl = async (url: string) => {
        this.isApplicationReady = false;
        if (this.bc[VAR_RECORD_PAGE_OBJECT_ID] !== "none") {
            await viewStore.loadView(this.bc[VAR_RECORD_CK_VIEW], settingsStore.settings[VAR_SETTING_VIEW_URL]);
            const queryId = this.bc[VAR_RECORD_QUERY_ID] || "MTRoute";

            if (!this.routesStore || this.routesStore.recordsStore.bc[VAR_RECORD_QUERY_ID] !== queryId) {
                this.routesStore = new RoutesModel(
                    {
                        [VAR_RECORD_PAGE_OBJECT_ID]: "routes",
                        [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                        [VAR_RECORD_QUERY_ID]: queryId,
                        getglobaltostore: [{in: VAR_SETTING_URL_APP_NAME}],
                        type: "NONE",
                    },
                    this,
                    {
                        searchValues: {appUrl: this.url},
                    },
                );
            }

            this.routesStore?.recordsStore.setSearchValuesAction({appUrl: url});
            await this.routesStore?.recordsStore.searchAction({appUrl: url});

            this.pagesStore.pages.clear();
            this.pagesStore.restorePagesAction(this.authStore.userInfo[VAR_RECORD_CV_LOGIN] || "");
            this.isApplicationReady = true;
        } else {
            await this.redirectToFirstValidApplication(url);
        }
        this.isApplicationReady = true;
        this.url = url;
        this.mode = url;
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
