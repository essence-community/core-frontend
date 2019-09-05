// @flow
import * as React from "react";
import {action, extendObservable} from "mobx";
import noop from "lodash/noop";
import {type BuilderModeType, type CkIdType, type BuilderBaseType} from "../../BuilderType";
import {type StoreBaseModelPropsType} from "../StoreBaseModel";
import {HistoryModel} from "../HistoryModel";
import {type RecordsModelType} from "../RecordsModel";
import {type PanelFormModelInterface} from "./PanelFormModelType";

export class PanelFormModel extends HistoryModel implements PanelFormModelInterface {
    name = "panelForm";

    hidden: ?boolean;

    disabled: ?boolean;

    recordsStore: RecordsModelType;

    bc: any;

    isFilterOpen: boolean;

    refs: Map<CkIdType, HTMLDivElement | React.ElementRef<*>> = new Map();

    constructor({pageStore, bc}: StoreBaseModelPropsType) {
        super({bc: {...bc, defaultvalue: "alwaysfirst"}, pageStore});

        extendObservable(this, {
            isFilterOpen: true,
        });
    }

    defaultHandlerBtnAction = action(
        "defaultHandlerBtnAction",
        (mode: BuilderModeType = "1", bc: BuilderBaseType, {files} = {}) => {
            switch (mode) {
                case "1":
                    return this.addAction();
                case "2":
                    return this.editAction();
                case "3":
                case "4":
                    return this.recordsStore.saveAction(this.recordsStore.records[0], bc.modeaction || mode, {
                        actionBc: bc,
                        query: bc.updatequery,
                    });
                case "6":
                    return this.cloneAction();
                case "7":
                    return this.recordsStore.downloadAction(this.recordsStore.records[0], bc.modeaction || mode, {
                        actionBc: bc,
                        query: bc.updatequery,
                    });
                case "8":
                    return this.recordsStore.saveAction(this.recordsStore.records[0], bc.modeaction || mode, {
                        actionBc: bc,
                        files,
                        query: bc.updatequery,
                    });
                default:
                    return false;
            }
        },
    );

    updateBtnAction = (mode: BuilderModeType = "1", bc: Object, obj: Object) =>
        this.defaultHandlerBtnAction(mode, bc, obj);

    searchAction = action("searchAction", (values) => this.recordsStore.searchAction(values));

    clearStoreAction = noop;

    toggleIsFilterOpen = action("toggleIsFilterOpen", () => {
        this.isFilterOpen = !this.isFilterOpen;
    });

    addRefAction = (ckId: CkIdType, node: HTMLDivElement | React.ElementRef<*>) => {
        this.refs.set(ckId, node);
    };
}
