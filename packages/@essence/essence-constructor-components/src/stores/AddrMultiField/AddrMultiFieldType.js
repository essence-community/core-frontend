// @flow
import {type BaseMultiFieldModelInterface} from "../BaseMultiFieldModel";

export interface AddrMultiFieldInterface extends BaseMultiFieldModelInterface {
    +displayText: string;
    +builderConfigs: Array<Object>;
    +searchRecordAction: (value: string | number) => void;
    +fillActiveRecordAction: (form: IForm) => void;
    +clearAction: () => void;
    +addListeners: (form: IForm) => void;
    +removeListeners: () => void;
}

export type AddrMultiFieldType = AddrMultiFieldInterface;
