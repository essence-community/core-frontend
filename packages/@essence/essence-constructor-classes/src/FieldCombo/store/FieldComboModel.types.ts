import {FieldValue} from "@essence-community/constructor-share/types";

export interface ISuggestion {
    label: string;
    labelLower: string;
    value: string;
    isNew?: boolean;
    id: FieldValue;
}
