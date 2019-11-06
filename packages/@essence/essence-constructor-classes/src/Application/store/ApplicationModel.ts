/* eslint-disable max-lines */
import {extendObservable, action, observable, when, ObservableMap} from "mobx";
import {
    camelCaseKeys,
    removeFromStore,
    saveToStore,
    FieldValue,
    noop,
    IApplicationModel,
    isEmpty,
    IBuilderConfig,
    IPagesModel,
    IRecordsModel,
    VAR_SELF_CV_URL,
    VAR_SETTING_PROJECT_APPLICATION_PAGE,
    IPageModel,
    IBuilderMode,
    IStoreBaseModel,
    IHandlers,
    IRecord,
} from "@essence/essence-constructor-share";
import {parseMemoize} from "@essence/essence-constructor-share/utils/parser";
import {snackbarStore, RecordsModel, settingsStore, PageModel} from "@essence/essence-constructor-share/models";
import {History} from "history";
import {RoutesModel} from "./RoutesModel";
import {IAuthSession} from "./AuthModel.types";
import {PagesModel} from "./PagesModel";
import {AuthModel} from "./AuthModel";

const wsUrl = process.env.REACT_APP_WS_BASE_URL || "";

const TIMEOUT_RECONNECT = 15000;
const TIMEOUT_LONG_RECONNECT = 300000;

const MAX_RECONNECT = 5;

const LOGOUT_CODE = 4001;

const prepareUserGlobals = (userInfo: Partial<IAuthSession>) => {
    return camelCaseKeys(
        Object.entries(userInfo).reduce((acc: IRecord, [key, value]) => {
            acc[`g_sess_${key}`] = value;

            return acc;
        }, {}),
    );
};

/**
 * @exports ApplicationModel
 */
export class ApplicationModel implements IApplicationModel, IStoreBaseModel {
    routesStore: RoutesModel | null;

    bc: IBuilderConfig;

    authStore: AuthModel;

    globalValues: ObservableMap<string, FieldValue>;

    isApplicationReady: boolean;

    wsClient: WebSocket | null;

    countConnect: number;

    isBlock: boolean;

    blockText: string;

    pagesStore: IPagesModel;

    history: History;

    // @deprecated
    session: string;

    recordsStore: IRecordsModel;

    cvUrl: string;

    pageStore: IPageModel;

    constructor(history: History, cvUrl: string) {
        this.routesStore = null;
        this.cvUrl = cvUrl;
        this.history = history;
        this.pagesStore = new PagesModel(this);
        this.pageStore = new PageModel({
            applicationStore: this,
            ckPage: "-1",
            defaultVisible: true,
            isActiveRedirect: false,
        });
        this.authStore = new AuthModel(this);
        this.countConnect = 0;
        this.recordsStore = new RecordsModel(
            {ckPageObject: "application", ckParent: "application", ckQuery: "GetMetamodelPage"},
            {applicationStore: this},
        );

        extendObservable(this, {
            get bc() {
                const bc = this.recordsStore.recordsState.records.find((rec: IBuilderConfig) => {
                    return parseMemoize(rec.activerules).runer({get: this.handleGetValue});
                });

                return bc || {};
            },
            blockText: "",
            globalValues: observable.map(prepareUserGlobals(this.authStore.userInfo)),
            isApplicationReady: false,
            isBlock: false,
            // @deprecated
            get session() {
                return this.authStore.userInfo.session;
            },
        });
    }

    handleGetValue = (name: string) => {
        if (name === VAR_SELF_CV_URL) {
            return this.cvUrl;
        }

        return undefined;
    };

    updateGlobalValuesAction = action("updateGlobalValues", (values: Record<string, string>) => {
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
        this.globalValues.merge(prepareUserGlobals(userInfo));

        return this.loadApplicationAction();
    });

    logoutAction = action("logoutAction", () => {
        this.isApplicationReady = false;

        removeFromStore("auth");
        this.history.push("/auth", {backUrl: this.history.location.pathname});

        if (this.wsClient && this.wsClient.readyState === this.wsClient.OPEN) {
            this.wsClient.onclose = noop;
            this.wsClient.close(LOGOUT_CODE, "logoutAction");
            this.wsClient = null;
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    redirectToAction = action("redirectToAction", async (ckPage: string, _params: Record<string, any>) => {
        const page = await this.pagesStore.setPageAction(ckPage, true);

        if (page) {
            await when(() => !page.isLoading);

            // TODO: should be redirect to page await redirectToPage(page, params);
        }
    });

    loadApplicationAction = action("loadApplicationAction", async () => {
        await Promise.all([
            this.recordsStore.recordsState.status === "init" &&
                this.recordsStore.searchAction({ckPage: settingsStore.settings[VAR_SETTING_PROJECT_APPLICATION_PAGE]}),
            snackbarStore.recordsStore.recordsState.status === "init" && snackbarStore.recordsStore.loadRecordsAction(),
        ]);

        if (this.bc) {
            this.routesStore = new RoutesModel(
                {
                    ckPageObject: "routes",
                    ckParent: this.bc.ckPageObject,
                    ckQuery: this.bc.ckQuery || "MTRoute",
                },
                this,
            );

            await this.routesStore.recordsStore.loadRecordsAction();
            this.pagesStore.restorePagesAction(this.authStore.userInfo.cvLogin);
        }

        this.isApplicationReady = true;
    });

    blockApplicationAction = action("blockApplicationAction", (type: string, text = "") => {
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
            const currentSession = this.authStore.userInfo.session;

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
                if (event.code === LOGOUT_CODE && session === currentSession) {
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
                            pageName: "Оповещение",
                            status: "error",
                            text: "Ошибка подключения к серверу оповещения, превышен лимит попыток переподключения",
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
                        pageName: "Оповещение",
                        status: "error",
                        text: err.message || "Ошибка подключения к серверу оповещения",
                    },
                    {},
                );
            });
    };

    handleWsMessage = (msg: Record<string, string>) => {
        const json = JSON.parse(msg.data);

        json.forEach((event) => {
            switch (event.event) {
                case "notification": {
                    snackbarStore.checkValidResponseAction(camelCaseKeys(event.data), {
                        cvName: "Оповещение",
                    });
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
                default: {
                    throw new Error(`Ошибка получения оповещения ${msg.data}`);
                }
            }
        });
    };

    reloadUserInfoAction = action("reloadUserInfo", (authValues: IAuthSession) => {
        this.authStore.userInfo = authValues;
        this.globalValues.merge(authValues);
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

    reloadStoreAction = () => Promise.resolve({});

    clearStoreAction = () => {};

    handleWindowOpen = (_mode: IBuilderMode, btnBc: IBuilderConfig) => {
        const window =
            this.bc.childwindow && this.bc.childwindow.find((win: IBuilderConfig) => win.ckwindow === btnBc.ckwindow);

        if (window) {
            this.pageStore.createWindowAction({mode: "1", windowBc: window});

            return Promise.resolve(true);
        }

        return Promise.resolve(false);
    };

    /**
     * @memberof ApplicationModel
     * @member
     */
    handlers: IHandlers = {
        /**
         * Отктиые окна по ckwindow
         * @memberof ApplicationModel.handlers
         * @instance
         */
        onWindowOpen: this.handleWindowOpen,
    };
}
