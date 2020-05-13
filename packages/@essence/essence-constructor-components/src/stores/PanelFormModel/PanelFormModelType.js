// @flow
import * as React from "react";
import {type BuilderModeType, type CkIdType} from "../../BuilderType";
import {type HistoryModelInterface} from "../HistoryModel";

export interface PanelFormModelInterface extends HistoryModelInterface {
    +mode: BuilderModeType;
    +selectedRecord: Object | null;
    +refs: Map<CkIdType, HTMLDivElement | React.ElementRef<*>>;
    +panelBc: any;
    +searchAction: (values: Object) => void;
    +addAction: () => void;
    +editAction: () => void;
    +cloneAction: () => void;
    +removeRecordAction: () => void;
    +handleNextStepAction: () => void;
    +defaultHandlerBtnAction: (mode?: BuilderModeType, bc: any) => void;
    +loadRecordsAction: () => Promise<*>;
    +setNextRecord: () => void;
    +setPrevRecord: () => void;
    +addRefAction: (ckId: CkIdType, node: HTMLDivElement | React.ElementRef<*>) => void;
}

export type PanelFormModelType = PanelFormModelInterface;
