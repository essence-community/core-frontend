import * as React from "react";
import {IClassProps, FieldValue, IPageModel, IRecord} from "@essence-community/constructor-share/types";
import {settingsStore, snackbarStore} from "@essence-community/constructor-share/models";
import {ApplicationContext, FormContext} from "@essence-community/constructor-share/context";
import {mapComponents} from "@essence-community/constructor-share/components";
import {PageLoader} from "@essence-community/constructor-share/uicomponents";
import {useTranslation, TFunction} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_SETTING_PROJECT_LOADER,
    VAR_RECORD_CL_STATIC,
    VAR_RECORD_URL,
    VAR_RECORD_ID,
    VAR_SETTING_URL_APP_NAME,
    VAR_SETTING_TYPE_NOTIFICATION,
    loggerRoot,
} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react";
import {reaction, observe} from "mobx";
import {useParams, useHistory, useRouteMatch} from "react-router-dom";
import {IForm, Form} from "@essence-community/constructor-share/Form";
import {CssBaseline} from "@material-ui/core";
import {ApplicationModel, CLOSE_CODE} from "../store/ApplicationModel";
import {renderGlobalValuelsInfo} from "../utils/renderGlobalValuelsInfo";
import {ApplicationWindows} from "../components/ApplicationWindows";
import {Block} from "../components/Block";
import {useHistoryListen} from "../hooks";
import {Snackbar} from "../components/Snackbar";
import {Theme} from "../components/Theme";
import {IBuilderClassConfig} from "../types";

const logger = loggerRoot.extend("PagerContainer");

function globalTitle(trans: TFunction) {
    return trans("static:d2c071c58aca4b73853c1fcc6e2f08a3");
}
interface IUrlParams {
    ckId?: string;
    appName?: string;
    filter?: string;
}
/**
 * @exports ApplicationContainer
 * @description Включает commonDecorator
 */

// eslint-disable-next-line max-lines-per-function, max-statements
export const ApplicationContainer: React.FC<IClassProps<IBuilderClassConfig>> = () => {
    const history = useHistory();
    const match = useRouteMatch<any>("/:appNameDefault");
    const appNameDefault = match?.params.appNameDefault ?? "";
    const {ckId, appName = appNameDefault, filter = ""} = useParams<IUrlParams>();
    const appNameRef = React.useRef(appName);
    const applicationStore = React.useMemo(() => new ApplicationModel(history, appNameRef.current), [history]);
    const [trans] = useTranslation("meta");
    const onFormChange = React.useCallback(
        (form: IForm) => {
            logger(trans("static:f9c3bf3691864f4d87a46a9ba367a855"), form.values);
        },
        [trans],
    );

    const form: IForm = React.useMemo(
        () =>
            new Form({
                editing: true,
                hooks: {onChange: onFormChange},
                mode: "1",
                placement: "application",
                values: {},
            }),
        [onFormChange],
    );

    React.useEffect(() => {
        /**
         * @memberof ApplicationContainer
         * @member
         * @description Загрузка начального состоянии приложения
         */
        const loadApplication = async () => {
            await applicationStore.authStore.checkAuthAction(history);
            const isSuccess = await applicationStore.loadApplicationAction();

            // Contrinue for found application, else redirect to other application in loadApplicationAction
            if (isSuccess) {
                const {routesStore, pagesStore} = applicationStore;
                const routes = routesStore ? routesStore.recordsStore.records : [];
                const pageConfig = routes.find(
                    (route: IRecord) => route[VAR_RECORD_ID] === ckId || route[VAR_RECORD_URL] === ckId,
                );
                const pageId = pageConfig && pageConfig[VAR_RECORD_ID];

                if (typeof pageId === "string") {
                    applicationStore.handleSetPage(pageId, filter);
                } else if (ckId !== undefined) {
                    pagesStore.setPageAction(ckId, false);
                } else if (pagesStore.pages.length) {
                    pagesStore.setPageAction(pagesStore.pages[0].pageId, false);
                }
            }
        };

        loadApplication();

        return () => {
            if (applicationStore.wsClient) {
                // TODO: check why not send close_code to close event;
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                applicationStore.wsClient.onclose = () => {};
                applicationStore.wsClient.close(CLOSE_CODE);
                applicationStore.wsClient = null;
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicationStore]);

    // Change url for application
    React.useEffect(() => {
        appNameRef.current = appName;
        applicationStore.updateGlobalValuesAction({
            [VAR_SETTING_URL_APP_NAME]: `${appName}`,
        });

        if (applicationStore.url !== appName) {
            applicationStore.reloadApplication(appName, ckId, filter);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appName, applicationStore]);

    React.useEffect(() => {
        if (appNameRef.current !== applicationStore.url) {
            return;
        }
        if (ckId) {
            const {routesStore, pagesStore} = applicationStore;
            const routes = routesStore ? routesStore.recordsStore.records : [];
            const pageConfig = routes.find(
                (route: IRecord) => route[VAR_RECORD_ID] === ckId || route[VAR_RECORD_URL] === ckId,
            );
            const pageId = pageConfig && pageConfig[VAR_RECORD_ID];

            if (pageId && pagesStore.activePage.pageId !== pageId) {
                pagesStore.setPageAction(String(pageId), false);
            }
        } else if (applicationStore.bc.defaultvalue) {
            applicationStore.pagesStore.setPageAction(applicationStore.bc.defaultvalue, false);
        }
    }, [ckId, applicationStore]);

    React.useEffect(() => {
        const dispose = reaction(
            () => applicationStore.authStore.userInfo.session,
            (session) => {
                // Reinit ws for new session
                if (
                    session &&
                    !applicationStore.wsClient &&
                    (!settingsStore.settings[VAR_SETTING_TYPE_NOTIFICATION] ||
                        settingsStore.settings[VAR_SETTING_TYPE_NOTIFICATION] === "ws")
                ) {
                    applicationStore.initWsClient(session);
                }
            },
            {
                fireImmediately: true,
            },
        );

        return () => {
            dispose();
        };
    }, [applicationStore]);

    useHistoryListen({applicationStore, history});

    React.useEffect(() => {
        return observe(applicationStore, "bc", (change) => {
            if (change.oldValue) {
                applicationStore.pageStore.removeStore(change.oldValue[VAR_RECORD_PAGE_OBJECT_ID], applicationStore);
            }

            if (change.newValue) {
                applicationStore.pageStore.addStore(applicationStore, change.newValue[VAR_RECORD_PAGE_OBJECT_ID]);
            }
        });
    }, []);

    React.useEffect(() => {
        return reaction(
            () => applicationStore.pagesStore.activePage,
            (activePage) => {
                const route = activePage && activePage.route;
                let pageId: FieldValue = "";
                let routeUrl: FieldValue = "";
                let url = "";

                if (!applicationStore.isApplicationReady || appNameRef.current !== applicationStore.url) {
                    return;
                }

                if (route && route[VAR_RECORD_ID]) {
                    pageId = route[VAR_RECORD_ID];
                    routeUrl =
                        route[VAR_RECORD_CL_STATIC] && route[VAR_RECORD_URL]
                            ? route[VAR_RECORD_URL]
                            : route[VAR_RECORD_ID];
                } else if (applicationStore.authStore.userInfo.session) {
                    pageId = applicationStore.defaultValue;
                    routeUrl = applicationStore.defaultValue;
                }

                if (routeUrl) {
                    url = `/${applicationStore.url}/${routeUrl}`;
                }

                if (url && history.location.pathname !== url) {
                    if (routeUrl === applicationStore.defaultValue) {
                        history.replace(url);
                    } else {
                        history.push(url);
                    }
                }

                if (pageId && (!activePage || activePage.pageId !== pageId)) {
                    applicationStore.pagesStore.setPageAction(String(pageId), false);
                }
            },
        );
    }, [applicationStore, history]);

    React.useEffect(() => {
        return reaction(
            () => applicationStore.globalValues.toJSON(),
            (globalValues) => {
                applicationStore.pagesStore.pages.forEach((page: IPageModel) => {
                    page.updateGlobalValues(globalValues);
                });
            },
        );
    }, [applicationStore]);

    React.useEffect(() => {
        return reaction(
            () => applicationStore.globalValues.toJS(),
            (globalValues) =>
                snackbarStore.snackbarOpenAction({
                    autoHidden: true,
                    hiddenTimeout: 0,
                    status: "debug",
                    text: renderGlobalValuelsInfo(globalValues),
                    title: globalTitle,
                }),
            {fireImmediately: true},
        );
    }, [applicationStore]);

    // Close all windows after change application
    React.useEffect(() => {
        return reaction(
            () => applicationStore.url,
            () => {
                applicationStore.pageStore.windows.clear();
            },
        );
    }, [applicationStore]);

    React.useEffect(() => {
        return reaction(
            () => snackbarStore.snackbarsCount,
            (snackbarsCount) =>
                applicationStore.updateGlobalValuesAction({
                    gSysNoReadSnack: `${snackbarsCount}`,
                }),
        );
    }, [applicationStore]);

    return useObserver(() => (
        <ApplicationContext.Provider value={applicationStore}>
            <FormContext.Provider value={form}>
                <Theme applicationStore={applicationStore}>
                    {applicationStore.isApplicationReady && applicationStore.bc ? (
                        <>
                            {mapComponents(applicationStore.bc.childs, (ChildComponent, childBc) => (
                                <ChildComponent
                                    pageStore={applicationStore.pageStore}
                                    key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                                    bc={childBc}
                                    visible
                                />
                            ))}
                            <ApplicationWindows pageStore={applicationStore.pageStore} />
                            <Block applicationStore={applicationStore} />
                        </>
                    ) : (
                        <PageLoader
                            container={null}
                            isLoading
                            loaderType={settingsStore.settings[VAR_SETTING_PROJECT_LOADER] as "default" | "bfl-loader"}
                        />
                    )}
                    <Snackbar
                        snackbars={snackbarStore.snackbars}
                        onClose={snackbarStore.snackbarCloseAction}
                        onSetCloseble={snackbarStore.setClosebleAction}
                    />
                    <CssBaseline />
                </Theme>
            </FormContext.Provider>
        </ApplicationContext.Provider>
    ));
};
