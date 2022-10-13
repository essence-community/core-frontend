// eslint-disable-next-line import/named
import {action, observable, IObservableArray, ObservableMap, computed} from "mobx";
import {
    STORE_PAGES_IDS_KEY,
    STORE_LAST_CV_LOGIN_KEY,
    VAR_RECORD_ROUTE_VISIBLE_MENU,
    VAR_RECORD_CV_LOGIN,
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
import {changePagePosition} from "../../Application/utils/changePagePosition";

export class PagesModel implements IPagesModel {
    @observable activePage: IPageModel | null = null;

    @observable expansionRecords: ObservableMap<string, boolean> = observable.map();

    @observable pages: IObservableArray<IPageModel> = observable.array();

    @computed get visiblePages() {
        return this.pages.filter(({route}) => route && route[VAR_RECORD_ROUTE_VISIBLE_MENU]);
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

    loadActivePage = (pageId: string, autoset = true, isActiveRedirect = false): Promise<IPageModel> => {
        const activePage = new PageModel({
            applicationStore: this.applicationStore,
            isActiveRedirect,
            pageId,
        });

        this.pages.push(activePage);

        if (autoset) {
            this.activePage = activePage;
        }

        return activePage.loadConfigAction(pageId).then(() => activePage);
    };

    reloadPageAction = (pageId: string) => {
        const activePage = this.pages.find((page) => page.pageId === pageId);

        if (activePage) {
            activePage.reloadPageAction();
        }
    };

    setPageAction = action(
        "setPageAction",
        async (pageId: string, isActiveRedirect = false): Promise<false | IPageModel> => {
            if (pageId === "-1") {
                return false;
            }

            let activePage = this.pages.find((page) => page.pageId === pageId);

            if (activePage) {
                this.activePage = activePage;
            } else {
                activePage = await this.loadActivePage(pageId, true, isActiveRedirect);
            }

            saveToStore(
                this.storeKey,
                this.pages.map((page) => page.pageId),
            );

            return activePage;
        },
    );

    removePageAction = action("removePageAction", (pageId: string) => {
        // Don't close default page. This is hidden page and need to display start screen
        if (pageId !== this.applicationStore.bc.defaultvalue) {
            const selectedPage = this.pages.find((page) => page.pageId === pageId);

            if (selectedPage === this.activePage) {
                this.activePage =
                    (this.pages.length &&
                        this.pages.find(
                            (page) => page.pageId !== this.applicationStore.bc.defaultvalue && page.pageId !== pageId,
                        )) ||
                    null;
            }

            if (selectedPage) {
                selectedPage.clearAction();
                this.pages.remove(selectedPage);
            }

            saveToStore(
                this.storeKey,
                this.pages.map((page) => page.pageId),
            );
        }
    });

    removePageOtherAction = action("removePageOtherAction", (pageIdLost: string) => {
        this.pages.slice().forEach((page) => {
            if (page.pageId !== pageIdLost) {
                this.pages.remove(page);
            }
        });

        this.activePage = this.pages[0] || null;
        saveToStore(
            this.storeKey,
            this.pages.map((page) => page.pageId),
        );
    });

    removeAllPagesAction = action("removeAllPagesAction", () => {
        this.activePage = null;
        this.pages.clear();
        removeFromStore(this.storeKey);
    });

    removeAllPagesRightAction = action("removeAllPagesRightAction", (pageId: string) => {
        const pageIndex = this.pages.findIndex((page) => page.pageId === pageId);

        this.pages.slice(pageIndex + 1).forEach((page) => {
            this.pages.remove(page);
        });

        const activePage = this.pages.find((page) => page === this.activePage);

        if (!activePage) {
            this.activePage = this.pages[0] || null;
        }

        saveToStore(
            this.storeKey,
            this.pages.map((page) => page.pageId),
        );
    });

    openCloseExpansionAction = action("openCloseExpansionAction", (ckId: string) => {
        this.expansionRecords.set(ckId, !this.expansionRecords.get(ckId));
    });

    restorePagesAction = action("restorePagesAction", (login: string) => {
        const pagesIds = getFromStore(this.storeKey, []);
        const lastCvLogin = getFromStore(STORE_LAST_CV_LOGIN_KEY);
        const promise = Promise.resolve();

        if (login === lastCvLogin && pagesIds) {
            pagesIds.forEach((pageId) => {
                const activePage = this.pages.find((page) => page.pageId === pageId);

                if (!activePage) {
                    const page = new PageModel({
                        applicationStore: this.applicationStore,
                        isActiveRedirect: false,
                        pageId,
                    });

                    this.pages.push(page);

                    promise.then(() => page.loadConfigAction(pageId));
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
    });

    movePages = (dragVisibleIndex: number, hoverVisibleIndex: number) => {
        const dragIndex = this.pages.findIndex((page) => page === this.visiblePages[dragVisibleIndex]);
        const hoverIndex = this.pages.findIndex((page) => page === this.visiblePages[hoverVisibleIndex]);

        this.pages.replace(changePagePosition(this.pages, dragIndex, hoverIndex));

        saveToStore(
            this.storeKey,
            this.pages.map((page) => page.pageId),
        );
    };
}
