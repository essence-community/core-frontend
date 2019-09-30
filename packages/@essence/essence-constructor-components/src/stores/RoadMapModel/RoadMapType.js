// @flow
import {type ObservableMap} from "mobx";
import {type Form} from "mobx-react-form";
import {type BuilderBaseType} from "../../BuilderType";
import {type StoreBaseModelInterface, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type RecordsModelType} from "../RecordsModel";

export type BuilderTabType = BuilderBaseType & {
    topbtn?: Array<BuilderBaseType>,
    childs?: Array<Object>,
};
export type TabStatusType = {
    disabled: boolean,
    hidden: boolean,
    form?: Form,
    btns: Array<BuilderBaseType>,
    index: number,
    num: number,
    recordStore: RecordsModelType,
};
export type TabStatusChangeType = {
    disabled?: boolean,
    hidden?: boolean,
    form?: Form,
    num?: number,
};

export type TabsStatusType = ObservableMap<string, TabStatusType>;

export interface RoadMapModelType extends StoreBaseModelInterface {
    +recordStore: RecordsModelType;
    +tabValue: string;
    +tabStatus: TabsStatusType;
    +childs: Array<BuilderBaseType>;
    +tabs: Array<BuilderBaseType>;
    constructor(props: StoreBaseModelPropsType): void;
    +changeTabAction: (tabValue: string) => void;
    +setFirstActiveTab: () => void;
    +setTabStatus: (tabValue: string, state: TabStatusChangeType) => void;
    +getActiveTabs: () => Array<BuilderTabType>;
}
