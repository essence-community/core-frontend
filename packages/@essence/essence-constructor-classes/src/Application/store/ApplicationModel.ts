/* eslint-disable max-lines */
import {computed, action, observable, when, ObservableMap} from "mobx";
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
    IPageModel,
    IBuilderMode,
    IHandlers,
    IRecord,
} from "@essence/essence-constructor-share";
import {
    VAR_SELF_CV_URL,
    VAR_SETTING_PROJECT_APPLICATION_PAGE,
    VAR_LANG_ID,
    VAR_NAMESPACE_VALUE,
} from "@essence/essence-constructor-share/constants";
import {i18next} from "@essence/essence-constructor-share/utils";
import {parseMemoize} from "@essence/essence-constructor-share/utils/parser";
import {snackbarStore, RecordsModel, settingsStore, PageModel} from "@essence/essence-constructor-share/models";
import {History} from "history";
import pageSafeJson from "../mocks/page-safe.json";
import {RoutesModel} from "./RoutesModel";
import {IAuthSession} from "./AuthModel.types";
import {PagesModel} from "./PagesModel";
import {AuthModel} from "./AuthModel";

const wsUrl = process.env.REACT_APP_WS_BASE_URL || "";

const TIMEOUT_RECONNECT = 15000;
const TIMEOUT_LONG_RECONNECT = 300000;

const MAX_RECONNECT = 5;

const LOGOUT_CODE = 4001;

export const CLOSE_CODE = 4002;

const prepareUserGlobals = (userInfo: Partial<IAuthSession>) => {
    return camelCaseKeys(
        Object.entries(userInfo).reduce((acc: IRecord, [key, value]) => {
            acc[`g_sess_${key}`] = value;

            return acc;
        }, {}),
    );
};
const NONE_BC = {
    ckPageObject: "none",
    ckParent: "none",
};

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

    history: History;

    recordsStore: IRecordsModel;

    cvUrl: string;

    pageStore: IPageModel;

    mode: string;

    @computed get bc(): IBuilderConfig {
        const {children} = this.recordsStore.selectedRecrodValues;

        if (!Array.isArray(children)) {
            return NONE_BC;
        }

        return children.find((rec: IBuilderConfig) => {
            return parseMemoize(rec.activerules).runer({get: this.handleGetValue});
        });
    }

    @observable blockText = "";

    @observable globalValues: ObservableMap<string, FieldValue> = observable.map();

    @observable isApplicationReady = false;

    @observable isBlock = false;

    // @deprecated
    @computed get session(): string | undefined {
        return this.authStore.userInfo.session;
    }

    constructor(history: History, cvUrl: string) {
        this.routesStore = null;
        this.cvUrl = cvUrl;
        this.mode = cvUrl;
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
            {
                ckPageObject: "application",
                ckParent: "application",
                ckQuery: "GetMetamodelPage2.0",
                defaultvalue: "##alwaysfirst##",
            },
            {applicationStore: this, pageStore: null},
        );

        this.globalValues.merge(prepareUserGlobals(this.authStore.userInfo));
    }

    handleGetValue = (name: string) => {
        if (name === VAR_SELF_CV_URL) {
            return this.cvUrl;
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
        this.globalValues.merge(prepareUserGlobals(userInfo));

        return this.loadApplicationAction();
    });

    logoutAction = action("logoutAction", async () => {
        this.isApplicationReady = false;

        await this.authStore.logoutAction();
        removeFromStore("auth");
        if (this.history.location.pathname.indexOf("auth") === -1) {
            this.history.push("/auth", {backUrl: this.history.location.pathname});
        }

        if (this.wsClient && this.wsClient.readyState === this.wsClient.OPEN) {
            this.wsClient.onclose = noop;
            this.wsClient.close(LOGOUT_CODE, "logoutAction");
            this.wsClient = null;
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    redirectToAction = action("redirectToAction", async (ckPage: string, _params: Record<string, any>) => {
        const page = await this.pagesStore.setPageAction(ckPage, true);

        // Log
        if (page) {
            await when(() => !page.isLoading);

            // TODO: should be redirect to page await redirectToPage(page, params);
        }
    });

    loadApplicationAction = action("loadApplicationAction", async () => {
        await Promise.all([
            this.recordsStore.recordsState.status === "init" &&
                this.recordsStore
                    .searchAction({ckPage: settingsStore.settings[VAR_SETTING_PROJECT_APPLICATION_PAGE]})
                    .then(() => {
                        const {children} = this.recordsStore.selectedRecrodValues;

                        this.recordsStore.setRecordsAction([
                            {
                                ...this.recordsStore.selectedRecrodValues,
                                children: [camelCaseKeys(pageSafeJson), ...(Array.isArray(children) ? children : [])],
                            },
                        ]);
                        this.recordsStore.setSelectionAction(this.recordsStore.selectedRecordId);
                    }),
            snackbarStore.recordsStore.recordsState.status === "init" && snackbarStore.recordsStore.loadRecordsAction(),
        ]);

        if (this.bc.ckPageObject !== "none") {
            this.routesStore = new RoutesModel(
                {
                    ckPageObject: "routes",
                    ckParent: this.bc.ckPageObject,
                    ckQuery: this.bc.ckQuery || "MTRoute",
                },
                this,
            );

            await this.routesStore?.recordsStore.loadRecordsAction();
            this.pagesStore.restorePagesAction(this.authStore.userInfo.cvLogin || "");
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
        let wsClient: WebSocket | null = null;

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

    handleWsMessage = (msg: MessageEvent) => {
        const json = JSON.parse(msg.data);

        json.forEach((event: any) => {
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

    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
         * Выход из приложения
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
