import {VAR_RECORD_ID} from "@essence/essence-constructor-share/constants";
import {FieldValue} from "@essence/essence-constructor-share/types";

export interface ISuggestion {
    [VAR_RECORD_ID]: FieldValue;
    label: string;
    labelLower: string;
    value: string;
    isNew?: boolean;
}
