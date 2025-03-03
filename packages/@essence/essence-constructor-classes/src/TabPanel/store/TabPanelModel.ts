import {action, observable, ObservableMap, computed, makeObservable} from "mobx";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {IBuilderConfig, IStoreBaseModelProps} from "@essence-community/constructor-share/types";

export interface ITabStatusType {
    disabled?: boolean;
    hidden?: boolean;
}
export interface ITabsStatusType {
    [$key: string]: ITabStatusType;
}

export class TabPanelModel extends StoreBaseModel {
    tabBc: IBuilderConfig;

    tabs: IBuilderConfig[];

    childs: IBuilderConfig[];

    @computed get tabsInHidden(): boolean {
        const activeTabIndex = this.tabs.findIndex((tabBc) => this.tabValue === tabBc[VAR_RECORD_PAGE_OBJECT_ID]);

        return activeTabIndex >= this.tabs.length - this.hiddenTabsIndex;
    }

    @computed get activeTabs(): IBuilderConfig[] {
        return this.tabs.filter((tab): boolean => {
            const status = this.tabStatus[tab[VAR_RECORD_PAGE_OBJECT_ID]];

            return status ? !status.hidden : true;
        });
    }

    @observable tabStatus: ITabsStatusType = {};

    @observable hiddenTabsIndex = 0;

    @observable openedTabs: ObservableMap<string, boolean> = observable.map();

    @observable tabValue: null | string;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        const childs = this.bc.childs || [];

        this.childs = childs.map((child) => ({...child, [VAR_RECORD_DISPLAYED]: undefined}));
        this.tabBc = this.bc;
        this.tabs = childs.map((tab) => ({...tab, type: "TABBUTTON"}));

        this.childs.forEach((child) => {
            this.tabStatus[child[VAR_RECORD_PAGE_OBJECT_ID]] = {
                disabled: false,
                hidden: false,
            };
        });

        this.tabValue = this.bc.childs && this.bc.childs.length ? this.bc.childs[0][VAR_RECORD_PAGE_OBJECT_ID] : null;

        const tab =
            this.tabValue && this.tabBc.childs.find((child) => child[VAR_RECORD_PAGE_OBJECT_ID] === this.tabValue);

        if (tab && this.bc.setglobal?.length) {
            const global = {};

            this.bc.setglobal.forEach(({out}) => {
                global[out] = tab.ckobject || tab[VAR_RECORD_NAME];
            });
            this.pageStore.updateGlobalValues(global);
        }
        makeObservable(this);
    }

    @action
    changeTabAction = (tabValue: string): void => {
        this.tabValue = tabValue;
        this.openedTabs.set(this.tabValue, true);
        const tab = this.tabBc.childs.find((child) => child[VAR_RECORD_PAGE_OBJECT_ID] === tabValue);

        if (tab && this.bc.setglobal?.length) {
            const global = {};

            this.bc.setglobal.forEach(({out}) => {
                global[out] = tab.ckobject || tab[VAR_RECORD_NAME];
            });
            this.pageStore.updateGlobalValues(global);
        }
    };

    @action
    setActiveTab = (tabValue: string): void => {
        if (this.tabBc.childs && this.tabBc.childs.find((child) => child[VAR_RECORD_PAGE_OBJECT_ID] === tabValue)) {
            this.changeTabAction(tabValue);
        }
    };

    @action
    setFirstActiveTab = (): void => {
        if (!this.tabValue || this.tabStatus[this.tabValue].hidden) {
            const tab =
                this.tabBc.childs &&
                this.tabBc.childs.find((child) => !this.tabStatus[child[VAR_RECORD_PAGE_OBJECT_ID]].hidden);

            if (tab) {
                this.changeTabAction(tab[VAR_RECORD_PAGE_OBJECT_ID]);
            }
        }
    };

    @action
    setOpenedTab = (tabValue: string, isActive: boolean): void => {
        if (tabValue === this.tabValue || !isActive) {
            this.openedTabs.set(tabValue, isActive);
        }
    };

    @action
    setTabStatus = (tabValue: string, status: ITabStatusType): void => {
        const oldStatus = this.tabStatus[tabValue];

        if (oldStatus.hidden !== status.hidden || oldStatus.disabled !== status.disabled) {
            this.tabStatus[tabValue] = {
                ...this.tabStatus[tabValue],
                ...status,
            };
        }
    };

    @action
    setHiddenTabsIndex = (hiddenTabsIndex: number): void => {
        const hiddenTabFirst = this.activeTabs[hiddenTabsIndex];

        if (hiddenTabsIndex === 0) {
            this.hiddenTabsIndex = 0;
        } else if (hiddenTabFirst) {
            // Convert hidden tabs from active to all tabs
            const hiddenTabsId = hiddenTabFirst[VAR_RECORD_PAGE_OBJECT_ID];

            this.hiddenTabsIndex = this.tabs.findIndex(
                (bc: IBuilderConfig) => bc[VAR_RECORD_PAGE_OBJECT_ID] === hiddenTabsId,
            );
        } else {
            // All tabs should be hidden
            this.hiddenTabsIndex = this.tabs.length;
        }
    };

    @action
    resetOpenedTabs = (): void => {
        this.openedTabs.clear();

        if (this.tabValue) {
            this.openedTabs.set(this.tabValue, true);
        }
    };
}
