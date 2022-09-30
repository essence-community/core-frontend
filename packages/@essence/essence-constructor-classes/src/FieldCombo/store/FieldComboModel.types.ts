import {FieldValue, IStoreBaseModelProps} from "@essence-community/constructor-share/types";
import {IField} from "@essence-community/constructor-share/Form/types";

export interface ISuggestion {
    label: string;
    labelLower: string;
    value: string;
    isNew?: boolean;
    id: FieldValue;
}

export interface IFieldComboModelProps extends IStoreBaseModelProps {
    field: IField;
}
