import {TValidation} from "../types";
import {required} from "./required";
import {requiredCheckbox} from "./requiredCheckbox";

export const validations: Record<string, TValidation> = {
    required,
    "required-checkbox": requiredCheckbox,
};
