// @flow
import {type BuilderModeType, type BuilderBaseType} from "../../BuilderType";
import {type ButtonConfigType} from "../ButtonModel/ButtonModelTypes";
import {type StoreBaseModelInterface, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type RecordsModelType} from "../RecordsModel";

export type BuilderHistoryBcType = BuilderBaseType & {
    topbtn?: Array<BuilderBaseType>,
};

export type HistoryPanelBtnNamesType =
    | "Override Add Button"
    | "Override Audit Button"
    | "Override Edit Button"
    | "Override Clone Button"
    | "Override Delete Button"
    | "Override Refresh Button"
    | "Override Left Button"
    | "Override Right Button"
    | "Override Cancel Button"
    | "Override Save Button";

export type HistoryPanelBtnsConfigType = {
    btns: Array<ButtonConfigType>,
    btnsCollector?: Array<ButtonConfigType>,
    overrides: {
        [HistoryPanelBtnNamesType]: ButtonConfigType,
    },
};
export interface HistoryModelInterface extends StoreBaseModelInterface {
    +recordsStore: RecordsModelType;
    +editing: boolean;
    +bc: BuilderHistoryBcType;
    +mode: BuilderModeType;
    +selectedRecord: Object | null;
    +btnsConfig: HistoryPanelBtnsConfigType;
    constructor(props: StoreBaseModelPropsType): void;
    +addAction: () => void;
    +editAction: () => void;
    +cloneAction: () => void;
    +closeAction: () => void;
    +removeRecordAction: () => void;
    +handleNextStepAction: () => void;
    +loadRecordsAction: () => Promise<*>;
    +setNextRecord: () => void;
    +setPrevRecord: () => void;
}

export type HistoryModelType = HistoryModelInterface;
