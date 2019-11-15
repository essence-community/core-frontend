import * as React from "react";
import {
    IClassProps,
    mapComponents,
    ApplicationContext,
    VAR_RECORD_ID,
    PageLoader,
    VAR_SELF_CV_URL,
    FieldValue,
} from "@essence/essence-constructor-share";
import {settingsStore, snackbarStore} from "@essence/essence-constructor-share/models";
import {useTranslation} from "@essence/essence-constructor-share/utils";
import {useDisposable, useObserver} from "mobx-react-lite";
import {reaction, observe} from "mobx";
import {useParams, useHistory} from "react-router-dom";
import {ApplicationModel} from "../store/ApplicationModel";
import {renderGlobalValuelsInfo} from "../utils/renderGlobalValuelsInfo";
import {ApplicationWindows} from "../components/ApplicationWindows";

export const ApplicationContainer: React.FC<IClassProps> = () => {
    const history = useHistory();
    const {ckId, cvUrl = "pages"} = useParams();
    const [applicationStore] = React.useState(() => new ApplicationModel(history, cvUrl));
    const [trans] = useTranslation("meta");
    const appName = "pages";

    React.useEffect(() => {
        const loadApplication = async () => {
            await applicationStore.loadApplicationAction();
            const {routesStore, pagesStore} = applicationStore;
            const routes = routesStore.recordsStore.records;
            const pageConfig = routes.find((route) => route[VAR_RECORD_ID] === ckId || route[VAR_SELF_CV_URL] === ckId);
            const pageId = pageConfig && pageConfig[VAR_RECORD_ID];

            if (typeof pageId === "string") {
                pagesStore.setPageAction(pageId, false);
            } else if (ckId !== undefined) {
                pagesStore.setPageAction(ckId, true);
            } else if (pagesStore.pages.length) {
                pagesStore.setPageAction(pagesStore.pages[0].ckPage, true);
            }
        };

        loadApplication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicationStore]);

    useDisposable(() => {
        return observe(applicationStore, "bc", (change) => {
            if (change.oldValue) {
                applicationStore.pageStore.removeStore(change.oldValue.ckPageObject, applicationStore);
            }

            if (change.newValue) {
                applicationStore.pageStore.addStore(applicationStore, change.newValue.ckPageObject);
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

                if (route && route[VAR_RECORD_ID]) {
                    pageId = route[VAR_RECORD_ID];
                    routeUrl = route.clStatic && route[VAR_SELF_CV_URL] ? route[VAR_SELF_CV_URL] : route[VAR_RECORD_ID];
                } else if (applicationStore.authStore.userInfo.session) {
                    pageId = applicationStore.bc.defaultvalue;
                    routeUrl = applicationStore.bc.defaultvalue;
                }

                const url = routeUrl ? `/${appName}/${routeUrl}` : `/${applicationStore.bc.redirecturl}`;

                if (url && history.location.pathname !== url) {
                    history.push(url);
                }

                if (pageId && (!activePage || activePage.ckPage !== pageId)) {
                    applicationStore.pagesStore.setPageAction(String(pageId), false);
                }
            },
        );
    });

    useDisposable(() => {
        return reaction(
            () => applicationStore.globalValues.toJSON(),
            (globalValues) => {
                applicationStore.pagesStore.pages.forEach((page) => {
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
                    title: trans("d2c071c58aca4b73853c1fcc6e2f08a3"),
                }),
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
            {applicationStore.isApplicationReady && applicationStore.bc ? (
                <>
                    {mapComponents(applicationStore.bc.childs, (ChildComponent, childBc) => (
                        <ChildComponent
                            pageStore={applicationStore.pageStore}
                            key={childBc.ckPageObject}
                            bc={childBc}
                            visible
                        />
                    ))}
                    <ApplicationWindows pageStore={applicationStore.pageStore} />
                </>
            ) : (
                // @ts-ignore
                <PageLoader isLoading loaderType={settingsStore.settings.projectLoader} />
            )}
        </ApplicationContext.Provider>
    ));
};
