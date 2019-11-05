// @flow
import {PageModel, type PageModelType} from "./PageModel";

export type StoresType = {
    pageStore: PageModelType,
};

export const createEmptyApplication = () => ({
    authData: {},
    blockApplicationAction: () => undefined,
    blockText: "",
    caActions: [],
    cvLogin: "",
    // $FlowFixMe
    globalValues: {},
    isApplicationReady: false,
    isBlock: false,
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
        ckPage: "1",
        isActiveRedirect: false,
        isReadOnly: false,
        styleTheme: "light",
        ...options,
    });

export const stores = {
    pageStore: new PageModel({
        applicationStore: createEmptyApplication(),
        ckPage: "1",
        isActiveRedirect: false,
    }),
};
