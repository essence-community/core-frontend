import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {ObservableMap} from "mobx";

export interface ITabStatus {
    disabled: boolean;
    hidden: boolean;
    btns: IBuilderConfig[];
    index: number;
    num: number;
}

export interface ITabStatusChange {
    disabled?: boolean;
    hidden?: boolean;
    num?: number;
}

export type TabsStatusType = ObservableMap<string, ITabStatus>;
