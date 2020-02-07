// eslint-disable-next-line import/named
import {action, observable, IObservableArray, ObservableMap} from "mobx";
import {
    getFromStore,
    saveToStore,
    removeFromStore,
    removeFromStoreByRegex,
    STORE_PAGES_IDS_KEY,
    STORE_LAST_CV_LOGIN_KEY,
    IPageModel,
    IPagesModel,
    IApplicationModel,
} from "@essence-community/constructor-share";
import {PageModel} from "@essence-community/constructor-share/models";
import {changePagePosition} from "../../Application/utils/changePagePosition";

export class PagesModel implements IPagesModel {
    @observable activePage: IPageModel | null = null;

    @observable expansionRecords: ObservableMap<string, boolean> = observable.map();

    @observable pages: IObservableArray<IPageModel> = observable.array();

    // eslint-disable-next-line no-useless-constructor
    constructor(public applicationStore: IApplicationModel) {}

    loadActivePage = (pageId: string, autoset = true, isActiveRedirect = false): Promise<IPageModel> => {
        const activePage = new PageModel({
            applicationStore: this.applicationStore,
            isActiveRedirect,
            isReadOnly: false,
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
                STORE_PAGES_IDS_KEY,
                this.pages.map((page) => page.pageId),
            );

            return activePage;
        },
    );

    removePageAction = action("removePageAction", (pageId: string) => {
        const selectedPage = this.pages.find((page) => page.pageId === pageId);

        if (selectedPage) {
            selectedPage.clearAction();
            this.pages.remove(selectedPage);
        }

        if (selectedPage === this.activePage) {
            this.activePage = this.pages.length ? this.pages[0] : null;
        }

        saveToStore(
            STORE_PAGES_IDS_KEY,
            this.pages.map((page) => page.pageId),
        );
    });

    removePageOtherAction = action("removePageOtherAction", (pageIdLost: string) => {
        this.pages.slice().forEach((page) => {
            if (page.pageId !== pageIdLost) {
                this.pages.remove(page);
            }
        });

        this.activePage = this.pages[0] || null;
        saveToStore(
            STORE_PAGES_IDS_KEY,
            this.pages.map((page) => page.pageId),
        );
    });

    removeAllPagesAction = action("removeAllPagesAction", () => {
        this.activePage = null;
        this.pages.clear();
        removeFromStore(STORE_PAGES_IDS_KEY);
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
            STORE_PAGES_IDS_KEY,
            this.pages.map((page) => page.pageId),
        );
    });

    openCloseExpansionAction = action("openCloseExpansionAction", (ckId: string) => {
        this.expansionRecords.set(ckId, !this.expansionRecords.get(ckId));
    });

    restorePagesAction = action("restorePagesAction", (login: string) => {
        const pagesIds = getFromStore(STORE_PAGES_IDS_KEY, []);
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
        } else {
            removeFromStoreByRegex(/_filter_/u);
        }

        // This.globalRecordsStore.loadAllStoresAction(this.applicationStore);

        saveToStore(STORE_LAST_CV_LOGIN_KEY, login);
    });

    movePages = (dragIndex: number, hoverIndex: number) => {
        this.pages.replace(changePagePosition(this.pages, dragIndex, hoverIndex));

        saveToStore(
            STORE_PAGES_IDS_KEY,
            this.pages.map((page) => page.pageId),
        );
    };
}
