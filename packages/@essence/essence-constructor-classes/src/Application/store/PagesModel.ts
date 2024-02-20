// eslint-disable-next-line import/named
import {action, observable, IObservableArray, ObservableMap, computed} from "mobx";
import {
    STORE_PAGES_IDS_KEY,
    STORE_LAST_CV_LOGIN_KEY,
    VAR_RECORD_CV_LOGIN,
    VAR_RECORD_URL,
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_VISIBLE_MENU,
    VAR_RECORD_PAGE_MULTI,
} from "@essence-community/constructor-share/constants";
import {PageModel} from "@essence-community/constructor-share/models";
import {GlobalRecordsModel} from "@essence-community/constructor-share/models/GlobalRecordsModel";

import {
    getFromStore,
    saveToStore,
    removeFromStore,
    removeFromStoreByRegex,
} from "@essence-community/constructor-share/utils";
import {
    IPageModel,
    IPagesModel,
    IApplicationModel,
    IGlobalRecordsModel,
} from "@essence-community/constructor-share/types";
import {isDeepEqual} from "@essence-community/constructor-share/utils/base";
import {changePagePosition} from "../../Application/utils/changePagePosition";
import {IStoreOpenPage} from "./PagesModel.types";

export class PagesModel implements IPagesModel {
    @observable activePage: IPageModel | null = null;

    @observable expansionRecords: ObservableMap<string, boolean> = observable.map();

    @observable pages: IObservableArray<IPageModel> = observable.array();

    @computed get visiblePages() {
        // Отображаем всегда все
        return this.pages.filter(
            ({route}) =>
                !route ||
                (route &&
                    ((!route[VAR_RECORD_PAGE_MULTI] && route[VAR_RECORD_ROUTE_VISIBLE_MENU]) ||
                        route[VAR_RECORD_PAGE_MULTI])),
        );
    }

    @computed get storeKey() {
        const login = this.applicationStore.authStore.userInfo[VAR_RECORD_CV_LOGIN] || "anonymous";

        return `${this.applicationStore.url}_${login}_${STORE_PAGES_IDS_KEY}`;
    }

    globalRecordsStore: IGlobalRecordsModel;

    constructor(public applicationStore: IApplicationModel) {
        this.globalRecordsStore = new GlobalRecordsModel({
            applicationStore: this.applicationStore,
            pageStore: null,
        });
    }

    @action
    loadActivePage = (
        pageId: string,
        autoset = true,
        isActiveRedirect = false,
        initParamPage?: Record<string, any>,
    ): Promise<IPageModel> => {
        const activePage = new PageModel({
            applicationStore: this.applicationStore,
            initParamPage,
            isActiveRedirect,
            pageId,
        });

        if (this.activePage) {
            const indexActive = this.pages.indexOf(this.activePage);

            this.pages.splice(indexActive + 1, 0, activePage);
        } else {
            this.pages.push(activePage);
        }

        if (autoset) {
            this.activePage = activePage;
        }

        return activePage.loadConfigAction(pageId).then(() => activePage);
    };

    @action
    reloadPageAction = (pageId: string | IPageModel) => {
        const activePage = this.pages.find((page) => page.pageId === pageId || page === pageId);

        if (activePage) {
            activePage.reloadPageAction();
        }
    };

    @action
    setPageAction = async (
        pageId: string | IPageModel,
        isActiveRedirect = false,
        initParams?: Record<string, any>,
    ): Promise<false | IPageModel> => {
        if (pageId === "-1") {
            return false;
        }

        let activePage = this.pages.find(
            (page) =>
                page === pageId ||
                ((!page.isMulti || (page.isMulti && initParams && isDeepEqual(initParams, page.initParamPage))) &&
                    (page.pageId === pageId ||
                        page.route?.[VAR_RECORD_URL] === pageId ||
                        page.route?.[VAR_RECORD_ID] === pageId)),
        );

        if (activePage) {
            if (activePage.isMulti && initParams) {
                activePage.setInitParams(initParams);
            }
            if (!activePage.isLoaded) {
                await activePage.loadConfigAction(activePage.pageId);
            }
            this.activePage = activePage;
        } else if (typeof pageId === "string") {
            activePage = await this.loadActivePage(pageId, true, isActiveRedirect, initParams);
        }

        this.saveToStore();

        return activePage;
    };

    @action
    removePageAction = (pageId: string | IPageModel) => {
        // Don't close default page. This is hidden page and need to display start screen
        if (
            pageId !== this.applicationStore.defaultValue ||
            this.pages.filter(
                (page) =>
                    page.pageId !== this.applicationStore.defaultValue &&
                    page.route?.[VAR_RECORD_URL] !== this.applicationStore.defaultValue,
            ).length > 0
        ) {
            const selectedPage = this.pages.find(
                (page) =>
                    page === pageId ||
                    page.pageId === pageId ||
                    page.route?.[VAR_RECORD_URL] === pageId ||
                    page.route?.[VAR_RECORD_ID] === pageId,
            );

            if (selectedPage === this.activePage) {
                const indexActive = this.pages.indexOf(this.activePage);
                const newPage =
                    this.pages.length > 1 ? this.pages[indexActive > 0 ? indexActive - 1 : indexActive + 1] : null;

                if (newPage) {
                    this.setPageAction(newPage);
                } else {
                    this.activePage = null;
                }
            }

            if (selectedPage) {
                selectedPage.clearAction();
                this.pages.remove(selectedPage);
            }

            this.saveToStore();
        }
    };

    @action
    removePageOtherAction = (pageIdLost: string | IPageModel) => {
        this.pages.slice().forEach((page) => {
            if (page.pageId !== pageIdLost && page !== pageIdLost) {
                this.pages.remove(page);
            }
        });

        const newPage = this.pages[0] || null;

        if (newPage) {
            this.setPageAction(newPage);
        } else {
            this.activePage = null;
        }
        this.saveToStore();
    };

    @action
    removeAllPagesAction = () => {
        this.activePage = null;
        this.pages.clear();
        removeFromStore(this.storeKey);
    };

    @action
    removeAllPagesRightAction = (pageId: string | IPageModel) => {
        const pageIndex = this.pages.findIndex((page) => page.pageId === pageId || page === pageId);

        this.pages.slice(pageIndex + 1).forEach((page) => {
            this.pages.remove(page);
        });

        const activePage = this.pages.find((page) => page === this.activePage);

        if (!activePage) {
            const newPage = this.pages[pageIndex] || this.pages[0];

            if (newPage) {
                this.setPageAction(newPage);
            } else {
                this.activePage = null;
            }
        }

        this.saveToStore();
    };

    @action
    openCloseExpansionAction = (ckId: string) => {
        this.expansionRecords.set(ckId, !this.expansionRecords.get(ckId));
    };

    @action
    restorePagesAction = (login: string) => {
        const pagesIds = getFromStore<string[] | IStoreOpenPage[]>(this.storeKey, []);
        const lastCvLogin = getFromStore(STORE_LAST_CV_LOGIN_KEY);

        if (login === lastCvLogin && pagesIds) {
            pagesIds.forEach((val) => {
                let pageId = val;
                let filter;

                if (typeof val === "object") {
                    pageId = (val as IStoreOpenPage).pageId;
                    filter = (val as IStoreOpenPage).initParamPage;
                }
                const activePage = this.pages.find(
                    (page) =>
                        page.pageId === pageId &&
                        (!page.isMulti || (filter && isDeepEqual(page.initParamPage, filter))),
                );

                if (!activePage) {
                    const page = new PageModel({
                        applicationStore: this.applicationStore,
                        initParamPage: filter,
                        isActiveRedirect: false,
                        pageId,
                    });

                    this.pages.push(page);
                }
            });
        } else if (login) {
            removeFromStoreByRegex(/_filter_/u);
        }

        // Load only for session
        if (this.applicationStore.authStore.userInfo.session) {
            this.globalRecordsStore.loadAllStoresAction();
        }

        if (login) {
            saveToStore(STORE_LAST_CV_LOGIN_KEY, login);
        }
    };

    @action
    movePages = (dragVisibleIndex: number, hoverVisibleIndex: number) => {
        const dragIndex = this.pages.findIndex((page) => page === this.visiblePages[dragVisibleIndex]);
        const hoverIndex = this.pages.findIndex((page) => page === this.visiblePages[hoverVisibleIndex]);

        this.pages.replace(changePagePosition(this.pages, dragIndex, hoverIndex));

        this.saveToStore();
    };

    saveToStore = () => {
        saveToStore(
            this.storeKey,
            this.pages
                .filter((page) => !page.isMulti || page.initParamPage)
                .map((page) => ({initParamPage: page.isMulti ? page.initParamPage : undefined, pageId: page.pageId})),
        );
    };
}
