// @flow
import {type ObservableMap} from "mobx";
import {type BuilderBaseType} from "../../BuilderType";
import {type StoreBaseModelInterface, type StoreBaseModelPropsType} from "../StoreBaseModel";

export type BuilderTabType = BuilderBaseType & {
    childs?: Array<Object>,
};
export type TabStatusType = {
    disabled?: boolean,
    hidden?: boolean,
};
export type TabsStatusType = {
    [$key: string]: TabStatusType,
};

export type OpenedTabsType = ObservableMap<string, boolean>;

export interface TabModelType extends StoreBaseModelInterface {
    +tabValue: null | string;
    +tabStatus: TabsStatusType;
    +reverseTabs: Array<Object>;
    +openedTabs: OpenedTabsType;
    +tabs: Array<Object>;
    +hiddenTabsIndex: number;
    +activeInHidden: boolean;
    constructor(props: StoreBaseModelPropsType): void;
    +changeTabAction: (tabValue: string) => void;
    +setActiveTab: (tabValue: string) => void;
    +setFirstActiveTab: () => void;
    +setTabStatus: (tabValue: string, state: TabStatusType) => void;
    +getActiveTabs: () => Array<Object>;
    +setOpenedTab: (tabValue: string, isActive: boolean) => void;
    +resetOpenedTabs: () => void;
    +setHiddenTabsIndex: (hiddenTabsIndex: number) => void;
}
