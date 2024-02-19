import {TValidation} from "../types";
import {required} from "./required";
import {requiredCheckbox} from "./requiredCheckbox";
import {maxvalue} from "./maxvalue";
import {minvalue} from "./minvalue";
import {maxsize} from "./maxsize";
import {minsize} from "./minsize";
import {minvaluedate} from "./minvaluedate";
import {maxvaluedate} from "./maxvaluedate";
import {date1, date2, date3, date4, date5, date6} from "./dates";
import {regex} from "./regex";
import {afterNotRequired} from "./afterNotRequired";
import {beforeNotRequired} from "./beforeNotRequired";
import {reqcount} from "./reqcount";
import {requiredFile} from "./requiredFile";
import {check} from "./check";

export const validations: Record<string, TValidation> = {
    after_not_required: afterNotRequired,
    before_not_required: beforeNotRequired,
    check: check,
    "date-1": date1,
    "date-2": date2,
    "date-3": date3,
    "date-4": date4,
    "date-5": date5,
    "date-6": date6,
    "date-default": date3,
    maxsize,
    maxvalue,
    maxvaluedate,
    minsize,
    minvalue,
    minvaluedate,
    regex,
    reqcount,
    required,
    "required-checkbox": requiredCheckbox,
    "required-file": requiredFile,
};
