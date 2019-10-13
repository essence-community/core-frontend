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
    ISnackbarModel,
} from "@essence/essence-constructor-share";
import {snackbarStore} from "@essence/essence-constructor-share/models";
import {History} from "history";
import {EXPEREMENTAL_BC} from "./bc";
import {RoutesModel} from "./RoutesModel";
import {IAuthSession} from "./AuthModel.types";
import {PagesModel} from "./PagesModel";
import {AuthModel} from "./AuthModel";

const wsUrl = process.env.REACT_APP_WS_BASE_URL || "";

const TIMEOUT_RECONNECT = 15000;
const TIMEOUT_LONG_RECONNECT = 300000;

const MAX_RECONNECT = 5;

const LOGOUT_CODE = 4001;

export class ApplicationModel implements IApplicationModel {
    routesStore: RoutesModel;

    bc: IBuilderConfig = EXPEREMENTAL_BC;

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
    snackbarStore: ISnackbarModel = snackbarStore;

    constructor(history: History) {
        this.routesStore = new RoutesModel(
            {
                ckPageObject: "MTRoute",
                ckParent: "root",
                ckQuery: "MTRoute",
            },
            this,
        );
        this.history = history;
        this.pagesStore = new PagesModel(this);
        this.authStore = new AuthModel(this);
        this.countConnect = 0;

        extendObservable(this, {
            blockText: "",
            globalValues: observable.map(this.authStore.userInfo),
            isApplicationReady: false,
            isBlock: false,
        });
    }

    updateGlobalValuesAction = action("updateGlobalValues", (values: Record<string, string>) => {
        Object.keys(values).forEach((key: string) => {
            const value = values[key];
            const oldValue = this.globalValues.get(key);

            if (oldValue !== value && (!isEmpty(oldValue) || !isEmpty(value))) {
                this.globalValues.set(key, value);
            }
        });
    });

    setSesssionAction = action("setSesssionAction", (userInfo: IAuthSession) => {
        this.globalValues.merge(userInfo);

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

    redirectToAction = action("redirectToAction", async (ckPage: string, params: Record<string, any>) => {
        const page = await this.pagesStore.setPageAction(ckPage, true);

        if (page) {
            await when(() => !page.isLoading);

            // TODO: should be redirect to page await redirectToPage(page, params);
        }
    });

    loadApplicationAction = action("loadApplicationAction", () => {
        return Promise.all([
            snackbarStore.recordsStore.loadRecordsAction(),
            this.routesStore.recordsStore.loadRecordsAction(),
        ])
            .then(() => this.pagesStore.restorePagesAction(this.authStore.userInfo.cvLogin))
            .then(() => {
                this.isApplicationReady = true;
            });
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
}
