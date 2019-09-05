// @flow
import {extendObservable, action} from "mobx";
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
};
export type ChildsType = {
    [key: string]: ItemType,
};
export interface PanelModelType extends StoreBaseModelInterface {
    hidden: ?boolean;
    disabled: ?boolean;
    bc: BuilderPanelType;
    childsWidths: ChildsType;
    +changeChildWidth: (id: string, newWidth: number) => void;
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

    changeChildWidth = action("changeChildWidth", (id: string, newWidth: number) => {
        const record = this.childsWidths[id];
        const nextChild = this.bc.childs ? this.bc.childs[record.index + 1] : null;
        const nextRecord = nextChild && this.childsWidths[nextChild.ckPageObject];
        const oldWidth = record && record.width;

        if (record && nextRecord) {
            const rest = oldWidth - newWidth;
            const nextRecordNewWidth = nextRecord && nextRecord.width + rest;

            if (nextRecordNewWidth > MIN_WIDTH) {
                record.width = newWidth;
                nextRecord.width = nextRecordNewWidth;
            }
        }
    });
}
