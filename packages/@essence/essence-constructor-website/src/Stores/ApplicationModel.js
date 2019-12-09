/* eslint-disable jsx-a11y/href-no-hash, max-lines */
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
import {
    camelCaseKeys,
    getFromStore,
    removeFromStore,
    saveToStore,
    setModule,
    loadFiles,
} from "@essence/essence-constructor-share";
import {VAR_LANG_ID, VAR_NAMESPACE_VALUE} from "@essence/essence-constructor-share/constants";
import {i18next} from "@essence/essence-constructor-share/utils";
import {snackbarStore} from "@essence/essence-constructor-share/models";
import {history} from "../history";
import {BRANCH_NAME, colors} from "../constants";

export type SessionType = {
    session: string,
    cvLogin: string,
    caActions: Array<number>,
    mode: "reports" | "page",
};

export interface ApplicationModelType {
    +authData: Object;
    +session: string;
    +blockText: string;
    +cvLogin: string;
    +caActions: Array<number>;
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
    +redirectToAction: (ckPage: string, params: Object) => void;
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

    cvLogin: string;

    caActions: Array<number>;

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

    /* eslint max-statements: ["error", 13]*/
    constructor() {
        const authValues: SessionType = getFromStore("auth", {});
        const globalPageStore = new PageModel({applicationStore: this, ckPage: "-1"});

        // TODO: Делать запрос без ckPageObject
        this.settingsStore = new SettingsModel({
            bc: {ckPageObject: "7B516907E04A95DBE053809BA8C0143F", ckQuery: "MTGetSysSettings"},
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

                if (activePage && activePage.route.clStatic && activePage.route.cvUrl) {
                    url = `/page/${activePage.route.cvUrl}`;
                } else if (activePage && activePage.ckPage) {
                    url = `/page/${activePage.ckPage}`;
                } else if (this.session) {
                    url = "/home";
                }

                if (url && history.location.pathname !== url) {
                    history.push(url);
                }
            },
        );

        extendObservable(this, {
            authData: authValues,
            get authStore() {
                return {
                    userInfo: this.authData,
                };
            },
            blockText: "",
            caActions: authValues.caActions,
            cvLogin: authValues.cvLogin,
            globalValues: observable.map(),
            isApplicationReady: false,
            isBlock: false,
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
                    title: "d2c071c58aca4b73853c1fcc6e2f08a3",
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

        return this.updateGlobalValuesAction(camelCaseKeys(object));
    };

    setSesssionAction = action("setSesssionAction", (session: SessionType) => {
        this.authData = session;
        this.updateSessionGlobal(session);
        this.session = session.session;
        this.cvLogin = session.cvLogin;
        this.caActions = session.caActions;
        this.mode = session.mode || this.mode;

        return this.loadApplicationAction();
    });

    logoutAction = action("logoutAction", () => {
        if (history.location.pathname.indexOf("auth") === -1) {
            this.authData = {};
            this.session = "";
            this.cvLogin = "";
            this.caActions = [];
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

    redirectToAction = action("redirectToAction", async (ckPage: string, params: Object) => {
        const page = await this.pagesStore.setPageAction(ckPage, true);

        if (page) {
            await when(() => !page.isLoading);

            await redirectToPage(page, params);
        }
    });

    loadModules = (moduleUrl: string) =>
        sendRequest({
            json: {
                filter: {
                    clAvailable: 1,
                    cvVersionApi: BRANCH_NAME,
                },
            },
            list: true,
            query: "GetModuleList",
        })
            .then((modules) =>
                modules.forEach(({cvName, cvVersion, ccConfig, ccManifest}) => {
                    const files = JSON.parse(ccConfig).files.map(
                        (fileName) => `${moduleUrl}/${cvName}/${cvVersion}${fileName}`,
                    );

                    setModule(cvName, files, camelCaseKeys(JSON.parse(ccManifest)));
                }),
            )
            .catch((error) => {
                snackbarStore.snackbarOpenAction({
                    status: "error",
                    text: "b9c874da6b0e4694b93db69088a556da",
                });
                snackbarStore.snackbarOpenAction(
                    {
                        status: "debug",
                        text: error.message,
                    },
                    {cvName: "02f274362cf847cba8d806687d237698"},
                );
            });

    loadApplicationAction = action("loadApplicationAction", () => {
        if (preference.modules) {
            loadFiles(preference.modules.split(","), true);
        }

        return Promise.all([
            this.settingsStore.settings.moduleAvailable === "true"
                ? this.loadModules(this.settingsStore.settings.gSysModuleUrl)
                : undefined,
            snackbarStore.recordsStore.loadRecordsAction(),
            this.routesStore.recordsStore.loadRecordsAction(),
        ])
            .then(() => this.pagesStore.restorePagesAction(this.cvLogin))
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

    initWsClient = (session: string) => {
        let wsClient = null;

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
                            pageName: "2ff612aa52314ddea65a5d303c867eb8",
                            status: "error",
                            text: "bcdc7e54547e405c9873b3ebea4f84c4",
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
                        pageName: "2ff612aa52314ddea65a5d303c867eb8",
                        status: "error",
                        text: err.message || "4b4ef9aed688462799f24efe8413da9f",
                    },
                    {},
                );
            });
    };

    handleWsMessage = (msg: Object) => {
        const json = JSON.parse(msg.data);

        json.forEach((event) => {
            switch (event.event) {
                case "notification": {
                    snackbarStore.checkValidResponseAction(
                        camelCaseKeys(event.data),
                        {
                            cvName: "2ff612aa52314ddea65a5d303c867eb8",
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
                    this.reloadUserInfoAction(camelCaseKeys(event.data));
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
                    throw new Error(i18next.t("8fe6e023ee11462db952d62d6b8b265e", {message: msg.data}));
                }
            }
        });
    };

    reloadUserInfoAction = action("reloadUserInfo", (authValues: Object) => {
        this.updateSessionGlobal(authValues);
        this.authData = authValues;
        this.caActions = authValues.caActions;
        this.cvLogin = authValues.cvLogin;
        saveToStore("auth", authValues);
    });

    reloadPageObjectAction = action("reloadPageObject", (ckPage: string, ckPageObject: string) => {
        const findedPage = this.pagesStore.pages.find((page) => page.ckPage === ckPage);

        if (findedPage) {
            const store = findedPage.stores.get(ckPageObject);

            if (store && store.reloadStoreAction) {
                store.reloadStoreAction();
            }
        }
    });
}

export const applicationStore = new ApplicationModel();
