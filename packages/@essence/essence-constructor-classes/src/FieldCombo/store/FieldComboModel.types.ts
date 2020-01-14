import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {FieldValue} from "@essence-community/constructor-share/types";

export interface ISuggestion {
    [VAR_RECORD_ID]: FieldValue;
    label: string;
    labelLower: string;
    value: string;
    isNew?: boolean;
}
