import {FieldValue} from "@essence/essence-constructor-share/types";

export interface ISuggestion {
    label: string;
    labelLower: string;
    value: string;
    isNew?: boolean;
    [key: string]: FieldValue | boolean;
}
