import * as React from "react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import {observable} from "mobx";
import {createMemoryHistory} from "history";
import {
    IBuilderConfig,
    IEssenceTheme,
    IApplicationModel,
    IRoutesModel,
    IAuthModel,
    IPagesModel,
    IPageModel,
    IClassProps,
} from "../types";
import {VAR_RECORD_NAME, VAR_RECORD_OBJECT_ID, VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "../constants";
import {PageModel, RecordsModel, GlobalRecordsModel} from "../models";

export {ANIMATION_TIMEOUT} from "../constants";

const themeVars: IEssenceTheme["essence"] = {
    palette: {
        common: {
            black: "#000",
            disabled: "#7f828d",
            link: "#0000EE",
            selectedMenu: "#f98d00",
            selectedRecord: "#c8cfde",
            selectedRecordBorder: "#60dfff",
            stripeRecord: "#f3f3f5",
            success: "#0f9d58",
            warning: "#fff82a",
            white: "#fff",
        },
        grey: {
            arrow: "#CBCDE0",
            backgroundInput: "#fafafa",
            checkbox: "#e5e8f4",
            disable: "#bbb",
            info: "#dbdfef",
            light: "#dfdfdf",
            main: "#cbcaca",
            shadow: "rgb(203, 202, 202, 0.4)",
        },
        icon: {
            secondary: "#80838d",
        },
        tab: {
            active: "",
            hover: "",
        },
        text: {
            dark: "#2c3345",
            disabled: "#2c3345",
            light: "#dbdfef",
        },
    },
    sizing: {
        appBarHeight: 45,
        gridRowHeight: 30,
    },
    ui: {
        modal: {
            palette: {
                background: "#2c3345",
            },
        },
        notification: {
            palette: {
                gray: "#939393",
            },
        },
    },
    zIndex: {
        backdrop: 3,
        loader: 1600,
    },
};

export const theme = createMuiTheme({essence: themeVars} as IEssenceTheme);
export const MIN_REQUEST_TIME = 30;
export const MAX_REQUEST_TIME = 100;
export const sleep = (time: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

export const getBaseBc = (name: string, props?: Partial<IBuilderConfig>): IBuilderConfig => ({
    [VAR_RECORD_NAME]: name,
    [VAR_RECORD_OBJECT_ID]: name,
    [VAR_RECORD_PAGE_OBJECT_ID]: name,
    [VAR_RECORD_PARENT_ID]: "root",
    datatype: name,
    ...props,
});

const createEmptyRoutesStore = (): IRoutesModel => ({
    favorits: observable.map({}),
    recordsStore: new RecordsModel(getBaseBc("routes")),
    setFavoritsAction: () => undefined,
});
const createEmptyAuthStore = (applicationStore: IApplicationModel): IAuthModel => ({
    applicationStore,
    changeUserInfo: () => Promise.resolve(),
    checkAuthAction: () => Promise.resolve(),
    loginAction: () => Promise.resolve(),
    successLoginAction: () => Promise.resolve(),
    userInfo: {},
});
const createEmptyPagesStore = (applicationStore: IApplicationModel): IPagesModel => ({
    activePage: null,
    applicationStore,
    expansionRecords: observable.map(),
    globalRecordsStore: new GlobalRecordsModel({
        applicationStore,
        pageStore: null,
    }),
    loadActivePage: () => Promise.resolve() as any,
    movePages: () => Promise.resolve(),
    openCloseExpansionAction: () => Promise.resolve(),
    pages: observable.array(),
    reloadPageAction: () => Promise.resolve(),
    removeAllPagesAction: () => Promise.resolve(),
    removeAllPagesRightAction: () => Promise.resolve(),
    removePageAction: () => Promise.resolve(),
    removePageOtherAction: () => Promise.resolve(),
    restorePagesAction: () => Promise.resolve(),
    setPageAction: () => Promise.resolve(false),
    visiblePages: [],
});

class ApplicationModelMock implements IApplicationModel {
    applicationStore = null;

    authStore = createEmptyAuthStore(this);

    bc = getBaseBc("Application");

    blockApplicationAction = () => undefined;

    blockText = "";

    clearStoreAction = () => undefined;

    countConnect = 0;

    globalValues = observable.map();

    handleChangeUrl = () => Promise.resolve();

    handleSetPage = () => Promise.resolve();

    handleWsMessage = () => undefined;

    handlers = {};

    history = createMemoryHistory();

    initWsClient = () => undefined;

    isApplicationReady = true;

    isBlock = false;

    loadApplicationAction = () => Promise.resolve(true);

    logoutAction = () => undefined;

    pageStore: IPageModel = new PageModel({
        applicationStore: this,
        isActiveRedirect: false,
        pageId: "-1",
    });

    pagesStore = createEmptyPagesStore(this);

    recordId = "-1";

    redirectToAction = () => Promise.resolve();

    reloadApplication = () => Promise.resolve();

    reloadPageObjectAction = () => undefined;

    reloadStoreAction = () => Promise.resolve(undefined);

    reloadUserInfoAction = () => undefined;

    routesStore = createEmptyRoutesStore();

    setSesssionAction = () => Promise.resolve();

    updateGlobalValuesAction = () => undefined;

    url = "test";

    wsClient = null;
}

const createEmptyApplicationStore = (): IApplicationModel => {
    return new ApplicationModelMock();
};

export const createEmptyPageStore = () =>
    new PageModel({
        applicationStore: createEmptyApplicationStore(),
        isActiveRedirect: false,
        pageId: "-1",
    });

interface IRendererProps extends Partial<IClassProps> {
    bc: IBuilderConfig;
    component: React.FC<IClassProps>;
}

export const Renderer: React.FC<IRendererProps> = (props) => {
    const {component: Component, ...classProps} = props;
    const pageStore = React.useMemo(() => classProps.pageStore || createEmptyPageStore(), [classProps.pageStore]);

    return (
        <MuiThemeProvider theme={theme}>
            <Component {...classProps} pageStore={pageStore} visible />
        </MuiThemeProvider>
    );
};
