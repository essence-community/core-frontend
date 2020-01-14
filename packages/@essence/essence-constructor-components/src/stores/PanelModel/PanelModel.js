// @flow
import {extendObservable, action} from "mobx";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import type {BuilderPanelType} from "../../Panel/BuilderPanelType";
import {type StoreBaseModelInterface, type StoreBaseModelPropsType, StoreBaseModel} from "../StoreBaseModel";
import {type RecordsModelType} from "../RecordsModel";
import {getInitChilds} from "./PanelModelActions";

export type PanelModelConfigType = {
    bc: BuilderPanelType,
    disabled?: boolean,
    hidden?: boolean,
    recordStore?: RecordsModelType,
};
export type ItemType = {
    id: string,
    index: number,
    width: number,
    collapsed: boolean,
};
export type ChildsType = {
    [key: string]: ItemType,
};
export interface PanelModelType extends StoreBaseModelInterface {
    hidden: ?boolean;
    disabled: ?boolean;
    bc: BuilderPanelType;
    childsWidths: ChildsType;
    +changeChildWidth: (id: string, newWidth: number, side?: "right" | "left") => void;
    constructor(props: StoreBaseModelPropsType): void;
}

const MIN_WIDTH = 10;

export class PanelModel extends StoreBaseModel implements PanelModelType {
    bc: BuilderPanelType;

    childsWidths: ChildsType;

    constructor(props: StoreBaseModelPropsType) {
        super(props);

        const {childs, resizable} = props.bc;

        extendObservable(this, {
            childsWidths: resizable === "true" && childs ? getInitChilds(childs) : undefined,
        });
    }

    // eslint-disable-next-line max-statements
    changeChildWidth = action("changeChildWidth", (id: string, userNewWidth: number, side = "right") => {
        const record = this.childsWidths[id];
        const offsetChild = side === "right" ? 1 : -1;
        const nextChild = this.bc.childs ? this.bc.childs[record.index + offsetChild] : null;
        const nextRecord = nextChild && this.childsWidths[nextChild[VAR_RECORD_PAGE_OBJECT_ID]];
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
    });
}
