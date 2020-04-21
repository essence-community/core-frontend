import * as React from "react";
import MobxReactForm from "mobx-react-form";
import {
    IClassProps,
    mapComponents,
    ApplicationContext,
    VAR_RECORD_ID,
    PageLoader,
    VAR_RECORD_URL,
    FieldValue,
    loggerRoot,
    EditorContex,
    IEditorContext,
    IPageModel,
    IRecord,
} from "@essence-community/constructor-share";
import {settingsStore, snackbarStore} from "@essence-community/constructor-share/models";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_SETTING_PROJECT_LOADER,
    VAR_RECORD_CL_STATIC,
} from "@essence-community/constructor-share/constants";
import {useDisposable, useObserver} from "mobx-react-lite";
import {reaction, observe} from "mobx";
import {useParams, useHistory, useRouteMatch} from "react-router-dom";
import {ApplicationModel, CLOSE_CODE} from "../store/ApplicationModel";
import {renderGlobalValuelsInfo} from "../utils/renderGlobalValuelsInfo";
import {ApplicationWindows} from "../components/ApplicationWindows";
import {Block} from "../components/Block";

const logger = loggerRoot.extend("PagerContainer");

// eslint-disable-next-line max-lines-per-function
export const ApplicationContainer: React.FC<IClassProps> = () => {
    const history = useHistory();
    const match = useRouteMatch<any>("/:appNameDefault");
    const appNameDefault = match?.params.appNameDefault ?? "";
    const {ckId, appName = appNameDefault, filter = ""} = useParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const applicationStore = React.useMemo(() => new ApplicationModel(history, appName), []);
    const [trans] = useTranslation("meta");
    const onFormChange = React.useCallback(
        (form: typeof MobxReactForm) => {
            logger(trans("static:f9c3bf3691864f4d87a46a9ba367a855"), form.values());
        },
        [trans],
    );

    const editor: IEditorContext = React.useMemo(
        () => ({
            form: new MobxReactForm(undefined, {hooks: {onFieldChange: onFormChange}}),
            mode: "1",
        }),
        [onFormChange],
    );

    React.useEffect(() => {
        const loadApplication = async () => {
            await applicationStore.authStore.checkAuthAction(history);
            await applicationStore.loadApplicationAction();
            const {routesStore, pagesStore, authStore} = applicationStore;
            const routes = routesStore ? routesStore.recordsStore.records : [];
            const pageConfig = routes.find(
                (route: IRecord) => route[VAR_RECORD_ID] === ckId || route[VAR_RECORD_URL] === ckId,
            );
            const pageId = pageConfig && pageConfig[VAR_RECORD_ID];

            if (typeof pageId === "string") {
                applicationStore.handleSetPage(pageId, filter);
            } else if (ckId !== undefined) {
                pagesStore.setPageAction(ckId, true);
            } else if (pagesStore.pages.length) {
                pagesStore.setPageAction(pagesStore.pages[0].pageId, true);
            }

            if (authStore.userInfo.session && process.env.REACT_APP_REQUEST !== "MOCK") {
                applicationStore.initWsClient(authStore.userInfo.session);
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
        if (applicationStore.url !== appName) {
            applicationStore.reloadApplication(appName, ckId, filter);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appName, applicationStore]);

    useDisposable(() => {
        return observe(applicationStore, "bc", (change) => {
            if (change.oldValue) {
                applicationStore.pageStore.removeStore(change.oldValue[VAR_RECORD_PAGE_OBJECT_ID], applicationStore);
            }

            if (change.newValue) {
                applicationStore.pageStore.addStore(applicationStore, change.newValue[VAR_RECORD_PAGE_OBJECT_ID]);
            }
        });
    });

    useDisposable(() => {
        return reaction(
            () => applicationStore.pagesStore.activePage,
            (activePage) => {
                const route = activePage && activePage.route;
                let pageId: FieldValue = "";
                let routeUrl: FieldValue = "";
                let url = "";

                if (route && route[VAR_RECORD_ID]) {
                    pageId = route[VAR_RECORD_ID];
                    routeUrl =
                        route[VAR_RECORD_CL_STATIC] && route[VAR_RECORD_URL]
                            ? route[VAR_RECORD_URL]
                            : route[VAR_RECORD_ID];
                } else if (applicationStore.authStore.userInfo.session) {
                    pageId = applicationStore.bc.defaultvalue;
                    routeUrl = applicationStore.bc.defaultvalue;
                }

                if (routeUrl) {
                    url = `/${appName}/${routeUrl}`;
                }

                if (url && history.location.pathname !== url) {
                    history.push(url);
                }

                if (pageId && (!activePage || activePage.pageId !== pageId)) {
                    applicationStore.pagesStore.setPageAction(String(pageId), false);
                }
            },
        );
    }, [appName, applicationStore]);

    useDisposable(() => {
        return reaction(
            () => applicationStore.globalValues.toJSON(),
            (globalValues) => {
                applicationStore.pagesStore.pages.forEach((page: IPageModel) => {
                    page.updateGlobalValues(globalValues);
                });
            },
        );
    });

    useDisposable(() => {
        return reaction(
            () => applicationStore.globalValues.toJS(),
            (globalValues) =>
                snackbarStore.snackbarOpenAction({
                    autoHidden: true,
                    hiddenTimeout: 0,
                    status: "debug",
                    text: renderGlobalValuelsInfo(globalValues),
                    title: trans("static:d2c071c58aca4b73853c1fcc6e2f08a3"),
                }),
        );
    });

    // Close all windows after change application
    useDisposable(() => {
        return reaction(
            () => applicationStore.bc,
            () => {
                applicationStore.pageStore.windows.clear();
            },
        );
    });

    useDisposable(() => {
        return reaction(
            () => snackbarStore.snackbarsCount,
            (snackbarsCount) =>
                applicationStore.updateGlobalValuesAction({
                    gSysNoReadSnack: `${snackbarsCount}`,
                }),
        );
    });
    applicationStore.updateGlobalValuesAction(settingsStore.globals);

    return useObserver(() => (
        <ApplicationContext.Provider value={applicationStore}>
            <EditorContex.Provider value={editor}>
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
            </EditorContex.Provider>
        </ApplicationContext.Provider>
    ));
};
