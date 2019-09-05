// @flow
import {type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type BaseMultiFieldModelInterface} from "../BaseMultiFieldModel";

export interface MoMultiFieldType extends BaseMultiFieldModelInterface {
    +displayText: string;
    +builderConfigs: Array<Object>;
    constructor(props: StoreBaseModelPropsType): void;
    +searchRecordAction: (value: string | number) => void;
    +fillActiveRecordAction: (form: any) => void;
    +clearAction: () => void;
    +addListeners: (form: any) => void;
    +removeListeners: () => void;
}
