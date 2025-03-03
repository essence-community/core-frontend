import {action, makeObservable, observable} from "mobx";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {IStoreBaseModelProps} from "@essence-community/constructor-share/types";
import {getInitChilds} from "./PanelModelActions";

const MIN_WIDTH = 10;

export interface IItemType {
    id: string;
    index: number;
    width: number;
    collapsed: boolean;
}
export interface IChildsType {
    [key: string]: IItemType;
}

export class PanelModel extends StoreBaseModel {
    @observable childsWidths?: IChildsType;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        const {childs, resizable} = props.bc;

        this.childsWidths = resizable && childs ? getInitChilds(childs) : undefined;
        makeObservable(this);
    }

    @action
    changeChildWidth = (id: string, userNewWidth: number, side = "right") => {
        if (!this.childsWidths) {
            return;
        }
        const record = this.childsWidths[id];
        const offsetChild = side === "right" ? 1 : -1;
        const nextChild = this.bc.childs ? this.bc.childs[record.index + offsetChild] : null;
        const nextRecord = nextChild && this.childsWidths?.[nextChild[VAR_RECORD_PAGE_OBJECT_ID]];
        const oldWidth = record && record.width;
        const newWidth = userNewWidth < MIN_WIDTH ? 2 : userNewWidth;

        if (record && nextRecord) {
            const rest = oldWidth - newWidth;
            const nextRecordNewWidth = nextRecord && nextRecord.width + rest;

            if (nextRecordNewWidth) {
                record.width = newWidth;
                nextRecord.width = nextRecordNewWidth;

                record.collapsed = record.width < MIN_WIDTH;
                nextRecord.collapsed = nextRecord.width < MIN_WIDTH;
            }

            if (nextRecord.collapsed && nextRecord.width !== 2) {
                record.width += nextRecord.width - 2;
                nextRecord.width = 2;
            }
        }
    };
}
