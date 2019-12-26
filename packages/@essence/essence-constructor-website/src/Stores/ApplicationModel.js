/* eslint-disable max-lines */
// @flow
import {extendObservable, action, reaction, observable, type ObservableMap, when} from "mobx";
import delay from "lodash/delay";
import forEach from "lodash/forEach";
import forOwn from "lodash/forOwn";
import noop from "lodash/noop";
import {
    RoutesModel,
    PagesModel,
    PageModel,
    isEmpty,
    SettingsModel,
    redirectToPage,
    renderGlobalValuelsInfo,
    preference,
    BASE_URL,
    sendRequest,
} from "@essence/essence-constructor-components";
import {getFromStore, removeFromStore, saveToStore, setModule, loadFiles} from "@essence/essence-constructor-share";
import {
    VAR_LANG_ID,
    VAR_NAMESPACE_VALUE,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_NAME,
    VAR_RECORD_URL,
    VAR_RECORD_CL_AVAILABLE,
    VAR_RECORD_CV_VERSION_API,
    VAR_RECORD_CV_VERSION,
    VAR_RECORD_CC_CONFIG,
    VAR_RECORD_CC_MANIFEST,
    VAR_RECORD_CV_LOGIN,
    VAR_RECORD_CA_ACTIONS,
    VAR_SETTING_MODULE_AVAILABLE,
    VAR_SETTING_MODULE_URL,
} from "@essence/essence-constructor-share/constants";
import {i18next} from "@essence/essence-constructor-share/utils";
import {snackbarStore} from "@essence/essence-constructor-share/models";

import {history} from "../history";
import {BRANCH_NAME, colors} from "../constants";

export type SessionType = {
    session: string,
    [VAR_RECORD_CV_LOGIN]: string,
    [VAR_RECORD_CA_ACTIONS]: Array<number>,
    mode: "reports" | "page",
};

export interface ApplicationModelType {
    +authData: Object;
    +session: string;
    +blockText: string;
    +login: string;
    +actions: Array<number>;
    +pagesStore: any;
    +isApplicationReady: boolean;
    +isBlock: boolean;
    +globalValues: ObservableMap<string, mixed>;
    +routesStore: any;
    +mode: "reports" | "page";
    +settingsStore: any;
    +configs: Object;
    +setSesssionAction: (session: SessionType) => void;
    +logoutAction: () => void;
    +redirectToAction: (pageId: string, params: Object) => void;
    +updateGlobalValuesAction: (values: Object) => void;
    +blockApplicationAction: (type: string, text: string) => void;
    +loadApplicationAction: () => void;
    +initWsClient: (session: string) => void;
}

const wsUrl = process.env.REACT_APP_WS_BASE_URL || "";

const TIMEOUT_RECONNECT = 15000;
const TIMEOUT_LONG_RECONNECT = 300000;

const MAX_RECONNECT = 5;

const LOGOUT_CODE = 4001;

const getConfig = () => ({
    baseUrl: BASE_URL,
    colors,
});

export class ApplicationModel implements ApplicationModelType {
    authData: Object;

    session: string;

    login: string;

    actions: Array<number>;

    routesStore: any;

    pagesStore: any;

    settingsStore: any;

    globalValues: ObservableMap<string, mixed>;

    isApplicationReady: boolean;

    wsClient: WebSocket | null;

    countConnect: number;

    isBlock: boolean;

    blockText: string;

    mode: "reports" | "page";

    configs: Object;

    // eslint-disable-next-line max-statements, max-lines-per-function
    constructor() {
        const authValues: SessionType = getFromStore("auth", {});
        const globalPageStore = new PageModel({applicationStore: this, pageId: "-1"});

        // TODO: Делать запрос без ckPageObject
        this.settingsStore = new SettingsModel({
            bc: {
                [VAR_RECORD_PAGE_OBJECT_ID]: "7B516907E04A95DBE053809BA8C0143F",
                [VAR_RECORD_QUERY_ID]: "MTGetSysSettings",
            },
            pageStore: globalPageStore,
        });

        this.routesStore = new RoutesModel({pageStore: globalPageStore});
        this.pagesStore = new PagesModel({applicationStore: this, routesStore: this.routesStore});
        this.countConnect = 0;
        this.configs = getConfig();

        reaction(
            () => this.pagesStore.activePage,
            (activePage) => {
                let url = "auth";

                if (activePage && activePage.route.clStatic && activePage.route[VAR_RECORD_URL]) {
                    url = `/page/${activePage.route[VAR_RECORD_URL]}`;
                } else if (activePage && activePage.pageId) {
                    url = `/page/${activePage.pageId}`;
                } else if (this.session) {
                    url = "/home";
                }

                if (url && history.location.pathname !== url) {
                    history.push(url);
                }
            },
        );

        extendObservable(this, {
            actions: authValues[VAR_RECORD_CA_ACTIONS],
            authData: authValues,
            get authStore() {
                return {
                    userInfo: this.authData,
                };
            },
            blockText: "",
            globalValues: observable.map(),
            isApplicationReady: false,
            isBlock: false,
            login: authValues[VAR_RECORD_CV_LOGIN],
            mode: "page",
            session: authValues.session,
        });

        this.initPagesGlobalValues();
        this.updateSessionGlobal(authValues);
    }

    initPagesGlobalValues = () => {
        reaction(
            () => this.globalValues.toJSON(),
            (globalValues) => {
                forEach(this.pagesStore.pages, (page) => {
                    page.updateGlobalValues(globalValues);
                });
            },
        );

        reaction(
            () => this.globalValues.toJS(),
            (globalValues) =>
                snackbarStore.snackbarOpenAction({
                    autoHidden: true,
                    hiddenTimeout: 0,
                    status: "debug",
                    text: renderGlobalValuelsInfo(globalValues),
                    title: "static:d2c071c58aca4b73853c1fcc6e2f08a3",
                }),
        );
    };

    updateGlobalValuesAction = action("updateGlobalValues", (values: Object) => {
        forOwn(values, (value, key) => {
            const oldValue = this.globalValues.get(key);

            if (oldValue !== value && (!isEmpty(oldValue) || !isEmpty(value))) {
                this.globalValues.set(key, value);
            }
        });
    });

    updateSessionGlobal = (session: SessionType) => {
        const object = {};

        forOwn(session, (value, key) => {
            object[`g_sess_${key}`] = value;
        });

        return this.updateGlobalValuesAction(object);
    };

    setSesssionAction = action("setSesssionAction", (session: SessionType) => {
        this.authData = session;
        this.updateSessionGlobal(session);
        this.session = session.session;
        this.login = session[VAR_RECORD_CV_LOGIN];
        this.actions = session[VAR_RECORD_CA_ACTIONS];
        this.mode = session.mode || this.mode;

        return this.loadApplicationAction();
    });

    // eslint-disable-next-line max-statements
    logoutAction = action("logoutAction", () => {
        if (history.location.pathname.indexOf("auth") === -1) {
            this.authData = {};
            this.session = "";
            this.login = "";
            this.actions = [];
            this.isApplicationReady = false;

            removeFromStore("auth");
            history.push("/auth", {backUrl: history.location.pathname});
        }
        if (this.wsClient && this.wsClient.readyState === this.wsClient.OPEN) {
            this.wsClient.onclose = noop;
            this.wsClient.close(LOGOUT_CODE, "logoutAction");
            this.wsClient = null;
        }
    });

    redirectToAction = action("redirectToAction", async (pageId: string, params: Object) => {
        const page = await this.pagesStore.setPageAction(pageId, true);

        if (page) {
            await when(() => !page.isLoading);

            await redirectToPage(page, params);
        }
    });

    loadModules = (moduleUrl: string) =>
        sendRequest({
            json: {
                filter: {
                    [VAR_RECORD_CL_AVAILABLE]: 1,
                    [VAR_RECORD_CV_VERSION_API]: BRANCH_NAME,
                },
            },
            list: true,
            query: "GetModuleList",
        })
            .then((modules) =>
                modules.forEach(
                    ({
                        [VAR_RECORD_NAME]: moduleName,
                        [VAR_RECORD_CV_VERSION]: moduleVersion,
                        [VAR_RECORD_CC_CONFIG]: moduleConfig,
                        [VAR_RECORD_CC_MANIFEST]: moduleManifest,
                    }) => {
                        const files = JSON.parse(moduleConfig).files.map(
                            (fileName) => `${moduleUrl}/${moduleName}/${moduleVersion}${fileName}`,
                        );

                        setModule(moduleName, files, JSON.parse(moduleManifest));
                    },
                ),
            )
            .catch((error) => {
                snackbarStore.snackbarOpenAction({
                    status: "error",
                    text: "static:b9c874da6b0e4694b93db69088a556da",
                });
                snackbarStore.snackbarOpenAction(
                    {
                        status: "debug",
                        text: error.message,
                    },
                    {[VAR_RECORD_NAME]: "static:02f274362cf847cba8d806687d237698"},
                );
            });

    loadApplicationAction = action("loadApplicationAction", () => {
        if (preference.modules) {
            loadFiles(preference.modules.split(","), true);
        }

        return Promise.all([
            this.settingsStore.settings[VAR_SETTING_MODULE_AVAILABLE] === "true"
                ? this.loadModules(this.settingsStore.settings[VAR_SETTING_MODULE_URL])
                : undefined,
            snackbarStore.recordsStore.loadRecordsAction(),
            this.routesStore.recordsStore.loadRecordsAction(),
        ])
            .then(() => this.pagesStore.restorePagesAction(this.login))
            .then(() => {
                this.isApplicationReady = true;
            });
    });

    blockApplicationAction = action("blockApplicationAction", (type: string, text: string = "") => {
        if (this.isBlock && type === "unblock") {
            window.location.reload(true);
        }
        this.isBlock = type === "block";
        this.blockText = text;
    });

    // eslint-disable-next-line max-lines-per-function
    initWsClient = (session: string) => {
        let wsClient = null;

        // eslint-disable-next-line max-statements
        new Promise((resolve, reject) => {
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
            wsClient.onclose = (event: Object) => {
                if (event.code === LOGOUT_CODE && session === this.session) {
                    this.logoutAction();

                    return;
                } else if (event.code === LOGOUT_CODE && session !== this.session) {
                    return;
                }
                if (this.session && this.countConnect < MAX_RECONNECT) {
                    this.countConnect += 1;
                    delay(this.initWsClient, TIMEOUT_RECONNECT, this.session);
                } else if (this.session) {
                    this.countConnect = 0;
                    delay(this.initWsClient, TIMEOUT_LONG_RECONNECT, this.session);
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

    handleWsMessage = (msg: Object) => {
        const json = JSON.parse(msg.data);

        // eslint-disable-next-line max-statements
        json.forEach((event) => {
            switch (event.event) {
                case "notification": {
                    snackbarStore.checkValidResponseAction(
                        event.data,
                        {
                            [VAR_RECORD_NAME]: "static:2ff612aa52314ddea65a5d303c867eb8",
                        },
                        undefined,
                        this,
                    );
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
                    throw new Error(i18next.t("static:8fe6e023ee11462db952d62d6b8b265e", {message: msg.data}));
                }
            }
        });
    };

    reloadUserInfoAction = action("reloadUserInfo", (authValues: Object) => {
        this.updateSessionGlobal(authValues);
        this.authData = authValues;
        this.actions = authValues[VAR_RECORD_CA_ACTIONS];
        this.login = authValues[VAR_RECORD_CV_LOGIN];
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
}

export const applicationStore = new ApplicationModel();
