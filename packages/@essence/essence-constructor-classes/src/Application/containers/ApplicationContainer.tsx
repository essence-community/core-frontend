import * as React from "react";
import {
    IClassProps,
    snackbarStore,
    mapComponents,
    ApplicationContext,
    VAR_RECORD_ID,
    PageLoader,
} from "@essence/essence-constructor-share";
import {settingsStore} from "@essence/essence-constructor-share/models";
import {useDisposable, useObserver} from "mobx-react-lite";
import {reaction} from "mobx";
import {useParams, useHistory} from "react-router-dom";
import {ApplicationModel} from "../store/ApplicationModel";
import {renderGlobalValuelsInfo} from "../utils/renderGlobalValuelsInfo";

export const ApplicationContainer: React.FC<IClassProps> = () => {
    const history = useHistory();
    const {ckId, cvUrl = "pages"} = useParams();
    const [applicationStore] = React.useState(() => new ApplicationModel(history, cvUrl));
    const appName = "pages";

    React.useEffect(
        () => {
            applicationStore.loadApplicationAction();
            const {routesStore, pagesStore} = applicationStore;
            const routes = routesStore.recordsStore.records;
            const pageConfig = routes.find((route) => route.ckId === ckId || route.cvUrl === ckId);
            const pageId = pageConfig && pageConfig[VAR_RECORD_ID];

            if (typeof pageId === "string") {
                pagesStore.setPageAction(pageId, false);
            } else {
                pagesStore.setPageAction(ckId, true);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [applicationStore],
    );

    useDisposable(() => {
        return reaction(
            () => applicationStore.pagesStore.activePage,
            (activePage) => {
                let url = "";

                if (activePage && activePage.route.clStatic && activePage.route.cvUrl) {
                    url = `${appName}/${activePage.route.cvUrl}`;
                } else if (activePage && activePage.route[VAR_RECORD_ID]) {
                    url = `/${appName}/${activePage.route[VAR_RECORD_ID]}`;
                } else if (applicationStore.authStore.userInfo.session) {
                    url = `/${appName}/${applicationStore.bc.defaultvalue}`;
                } else {
                    url = `/${applicationStore.bc.redirecturl}`;
                }

                if (url && history.location.pathname !== url) {
                    history.push(url);
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
                    title: "Супер Глобальные переменные",
                }),
        );
    });

    return useObserver(() => (
        <ApplicationContext.Provider value={applicationStore}>
            {applicationStore.isApplicationReady ? (
                mapComponents(applicationStore.bc.childs, (ChildComponent, childBc) => (
                    <ChildComponent pageStore={null} key={childBc.ckPageObject} bc={childBc} visible />
                ))
            ) : (
                // @ts-ignore
                <PageLoader isLoading loaderType={settingsStore.settings.projectLoader} />
            )}
        </ApplicationContext.Provider>
    ));
};
