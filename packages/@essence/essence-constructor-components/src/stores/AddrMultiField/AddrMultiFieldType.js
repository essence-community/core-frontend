// @flow
import {type Form} from "mobx-react-form";
import {type BaseMultiFieldModelInterface} from "../BaseMultiFieldModel";

export interface AddrMultiFieldInterface extends BaseMultiFieldModelInterface {
    +displayText: string;
    +builderConfigs: Array<Object>;
    +searchRecordAction: (value: string | number) => void;
    +fillActiveRecordAction: (form: Form) => void;
    +clearAction: () => void;
    +addListeners: (form: Form) => void;
    +removeListeners: () => void;
}

export type AddrMultiFieldType = AddrMultiFieldInterface;
