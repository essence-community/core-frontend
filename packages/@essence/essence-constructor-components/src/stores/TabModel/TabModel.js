// @flow
import {extendObservable, action, observable} from "mobx";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {
    type BuilderTabType,
    type TabsStatusType,
    type TabModelType,
    type TabStatusType,
    type OpenedTabsType,
} from "./TabModelType";

export class TabModel extends StoreBaseModel implements TabModelType {
    tabValue: null | string;

    tabBc: BuilderTabType;

    tabStatus: TabsStatusType = {};

    reverseTabs: Array<Object>;

    tabs: Array<Object>;

    openedTabs: OpenedTabsType;

    activeInHidden: boolean;

    hiddenTabsIndex: number;

    constructor(props: StoreBaseModelPropsType) {
        super(props);

        const childs = (this.bc.childs || []).map((tab) => ({...tab, type: "TABBUTTON"}));

        this.tabBc = this.bc;
        this.reverseTabs = [...childs].reverse();
        this.tabs = [...childs];

        childs.forEach((child) => {
            this.tabStatus[child.ckPageObject] = {
                disabled: false,
                hidden: false,
            };
        });

        extendObservable(this, {
            get activeInHidden() {
                const activeTabIndex = this.reverseTabs.findIndex((tabBc) => this.tabValue === tabBc.ckPageObject);

                return activeTabIndex < this.hiddenTabsIndex;
            },
            hiddenTabsIndex: 0,
            openedTabs: observable.map(),
            tabValue: this.bc.childs && this.bc.childs.length ? this.bc.childs[0].ckPageObject : null,
        });
    }

    changeTabAction = action("changeTabAction", (tabValue: string) => {
        this.tabValue = tabValue;
        this.openedTabs.set(this.tabValue, true);
    });

    setActiveTab = action("setActiveTab", (tabValue) => {
        if (this.tabBc.childs && this.tabBc.childs.find((child) => child.ckPageObject === tabValue)) {
            this.tabValue = tabValue;
            this.openedTabs.set(this.tabValue, true);
        }
    });

    setFirstActiveTab = action("setFirstActiveTab", () => {
        if (!this.tabValue || this.tabStatus[this.tabValue].hidden) {
            const tab =
                this.tabBc.childs && this.tabBc.childs.find((child) => !this.tabStatus[child.ckPageObject].hidden);

            if (tab) {
                this.tabValue = tab.ckPageObject;
                this.openedTabs.set(this.tabValue, true);
            }
        }
    });

    setOpenedTab = action("setOpenedTab", (tabValue: string, isActive) => {
        if (tabValue === this.tabValue || !isActive) {
            this.openedTabs.set(tabValue, isActive);
        }
    });

    setTabStatus = (tabValue: string, status: TabStatusType) => {
        this.tabStatus[tabValue] = {
            ...this.tabStatus[tabValue],
            ...status,
        };
    };

    getActiveTabs = (): Array<Object> =>
        this.tabs.filter((tab): boolean => {
            const status = this.tabStatus[tab.ckPageObject];

            return status ? !status.disabled && !status.hidden : true;
        });

    setHiddenTabsIndex = (hiddenTabsIndex: number) => {
        this.hiddenTabsIndex = hiddenTabsIndex;
    };

    resetOpenedTabs = () => {
        this.openedTabs.clear();

        if (this.tabValue) {
            this.openedTabs.set(this.tabValue, true);
        }
    };
}
