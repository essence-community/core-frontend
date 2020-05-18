import {TValidation} from "../types";
import {required} from "./required";
import {requiredCheckbox} from "./requiredCheckbox";
import {maxvalue} from "./maxvalue";
import {minvalue} from "./minvalue";

export const validations: Record<string, TValidation> = {
    maxvalue,
    minvalue,
    required,
    "required-checkbox": requiredCheckbox,
};
