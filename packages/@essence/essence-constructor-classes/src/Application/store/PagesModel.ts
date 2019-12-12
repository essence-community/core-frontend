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
} from "@essence/essence-constructor-share";
import {PageModel} from "@essence/essence-constructor-share/models";
import {changePagePosition} from "../../Application/utils/changePagePosition";

export class PagesModel implements IPagesModel {
    @observable activePage: IPageModel | null = null;

    @observable expansionRecords: ObservableMap<string, boolean> = observable.map();

    @observable pages: IObservableArray<IPageModel> = observable.array();

    // eslint-disable-next-line no-useless-constructor
    constructor(public applicationStore: IApplicationModel) {}

    loadActivePage = (ckPage: string, autoset = true, isActiveRedirect = false): Promise<IPageModel> => {
        const activePage = new PageModel({
            applicationStore: this.applicationStore,
            ckPage,
            isActiveRedirect,
            isReadOnly: false,
        });

        this.pages.push(activePage);

        if (autoset) {
            this.activePage = activePage;
        }

        return activePage.loadConfigAction(ckPage).then(() => activePage);
    };

    reloadPageAction = (ckPage: string) => {
        const activePage = this.pages.find((page) => page.ckPage === ckPage);

        if (activePage) {
            activePage.reloadPageAction();
        }
    };

    setPageAction = action(
        "setPageAction",
        async (ckPage: string, isActiveRedirect = false): Promise<false | IPageModel> => {
            if (ckPage === "-1") {
                return false;
            }

            let activePage = this.pages.find((page) => page.ckPage === ckPage);

            if (activePage) {
                this.activePage = activePage;
            } else {
                activePage = await this.loadActivePage(ckPage, true, isActiveRedirect);
            }

            saveToStore(
                STORE_PAGES_IDS_KEY,
                this.pages.map((page) => page.ckPage),
            );

            return activePage;
        },
    );

    removePageAction = action("removePageAction", (ckPage: string) => {
        const selectedPage = this.pages.find((page) => page.ckPage === ckPage);

        if (selectedPage) {
            selectedPage.clearAction();
            this.pages.remove(selectedPage);
        }

        if (selectedPage === this.activePage) {
            this.activePage = this.pages.length ? this.pages[0] : null;
        }

        saveToStore(
            STORE_PAGES_IDS_KEY,
            this.pages.map((page) => page.ckPage),
        );
    });

    removePageOtherAction = action("removePageOtherAction", (ckPageLost: string) => {
        this.pages.slice().forEach((page) => {
            if (page.ckPage !== ckPageLost) {
                this.pages.remove(page);
            }
        });

        this.activePage = this.pages[0] || null;
        saveToStore(
            STORE_PAGES_IDS_KEY,
            this.pages.map((page) => page.ckPage),
        );
    });

    removeAllPagesAction = action("removeAllPagesAction", () => {
        this.activePage = null;
        this.pages.clear();
        removeFromStore(STORE_PAGES_IDS_KEY);
    });

    removeAllPagesRightAction = action("removeAllPagesRightAction", (ckPage: string) => {
        const pageIndex = this.pages.findIndex((page) => page.ckPage === ckPage);

        this.pages.slice(pageIndex + 1).forEach((page) => {
            this.pages.remove(page);
        });

        const activePage = this.pages.find((page) => page === this.activePage);

        if (!activePage) {
            this.activePage = this.pages[0] || null;
        }

        saveToStore(
            STORE_PAGES_IDS_KEY,
            this.pages.map((page) => page.ckPage),
        );
    });

    openCloseExpansionAction = action("openCloseExpansionAction", (ckId: string) => {
        this.expansionRecords.set(ckId, !this.expansionRecords.get(ckId));
    });

    restorePagesAction = action("restorePagesAction", (cvLogin: string) => {
        const pagesIds = getFromStore(STORE_PAGES_IDS_KEY, []);
        const lastCvLogin = getFromStore(STORE_LAST_CV_LOGIN_KEY);
        const promise = Promise.resolve();

        if (cvLogin === lastCvLogin && pagesIds) {
            pagesIds.forEach((ckPage) => {
                const activePage = this.pages.find((page) => page.ckPage === ckPage);

                if (!activePage) {
                    const page = new PageModel({
                        applicationStore: this.applicationStore,
                        ckPage,
                        isActiveRedirect: false,
                    });

                    this.pages.push(page);

                    promise.then(() => page.loadConfigAction(ckPage));
                }
            });
        } else {
            removeFromStoreByRegex(/_filter_/u);
        }

        // This.globalRecordsStore.loadAllStoresAction(this.applicationStore);

        saveToStore(STORE_LAST_CV_LOGIN_KEY, cvLogin);
    });

    movePages = (dragIndex: number, hoverIndex: number) => {
        this.pages.replace(changePagePosition(this.pages, dragIndex, hoverIndex));

        saveToStore(
            STORE_PAGES_IDS_KEY,
            this.pages.map((page) => page.ckPage),
        );
    };
}
