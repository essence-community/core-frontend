import {action, observable, ObservableMap, computed} from "mobx";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {IBuilderConfig, IStoreBaseModelProps} from "@essence-community/constructor-share/types";

export type TabStatusType = {
    disabled?: boolean;
    hidden?: boolean;
};
export type TabsStatusType = {
    [$key: string]: TabStatusType;
};

export class TabPanelModel extends StoreBaseModel {
    tabBc: IBuilderConfig;

    tabStatus: TabsStatusType = {};

    tabs: IBuilderConfig[];

    childs: IBuilderConfig[];

    @computed get activeInHidden(): boolean {
        const activeTabIndex = this.childs.findIndex((tabBc) => this.tabValue === tabBc[VAR_RECORD_PAGE_OBJECT_ID]);

        return activeTabIndex >= this.childs.length - this.hiddenTabsIndex;
    }

    @computed get activeTabs(): IBuilderConfig[] {
        return this.tabs.filter((tab): boolean => {
            const status = this.tabStatus[tab[VAR_RECORD_PAGE_OBJECT_ID]];

            return status ? !status.disabled && !status.hidden : true;
        });
    }

    @observable hiddenTabsIndex = 0;

    @observable openedTabs: ObservableMap<string, boolean> = observable.map();

    @observable tabValue: null | string;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        const childs = this.bc.childs || [];

        this.childs = childs.map((child) => ({...child, [VAR_RECORD_DISPLAYED]: ""}));
        this.tabBc = this.bc;
        this.tabs = childs.map((tab) => ({...tab, type: "TABBUTTON"}));

        this.childs.forEach((child) => {
            this.tabStatus[child[VAR_RECORD_PAGE_OBJECT_ID]] = {
                disabled: false,
                hidden: false,
            };
        });

        this.tabValue = this.bc.childs && this.bc.childs.length ? this.bc.childs[0][VAR_RECORD_PAGE_OBJECT_ID] : null;
    }

    changeTabAction = action("changeTabAction", (tabValue: string) => {
        this.tabValue = tabValue;
        this.openedTabs.set(this.tabValue, true);
    });

    setActiveTab = action("setActiveTab", (tabValue: string) => {
        if (this.tabBc.childs && this.tabBc.childs.find((child) => child[VAR_RECORD_PAGE_OBJECT_ID] === tabValue)) {
            this.tabValue = tabValue;
            this.openedTabs.set(this.tabValue, true);
        }
    });

    setFirstActiveTab = action("setFirstActiveTab", () => {
        if (!this.tabValue || this.tabStatus[this.tabValue].hidden) {
            const tab =
                this.tabBc.childs &&
                this.tabBc.childs.find((child) => !this.tabStatus[child[VAR_RECORD_PAGE_OBJECT_ID]].hidden);

            if (tab) {
                this.tabValue = tab[VAR_RECORD_PAGE_OBJECT_ID];
                this.openedTabs.set(this.tabValue, true);
            }
        }
    });

    setOpenedTab = action("setOpenedTab", (tabValue: string, isActive: boolean) => {
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
