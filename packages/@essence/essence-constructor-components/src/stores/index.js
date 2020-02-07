// @flow
import {PageModel, type PageModelType} from "./PageModel";

export type StoresType = {
    pageStore: PageModelType,
};

export const createEmptyApplication = () => ({
    actions: [],
    authData: {},
    blockApplicationAction: () => undefined,
    blockText: "",
    // $FlowFixMe
    globalValues: {},
    isApplicationReady: false,
    isBlock: false,
    login: "",
    logoutAction: () => undefined,
    pagesStore: {
        removePageAction: () => undefined,
    },
    redirectToAction: () => undefined,
    routesStore: {},
    session: "",
    setSesssionAction: () => undefined,
    settingsStore: {
        settings: {
            projectLoader: "default",
        },
    },
    updateGlobalValuesAction: () => undefined,
});

export const createEmptyPageStore = (options: ?Object) =>
    new PageModel({
        applicationStore: createEmptyApplication(),
        isActiveRedirect: false,
        isReadOnly: false,
        pageId: "1",
        styleTheme: "light",
        ...options,
    });

export const stores = {
    pageStore: new PageModel({
        applicationStore: createEmptyApplication(),
        isActiveRedirect: false,
        pageId: "1",
    }),
};
