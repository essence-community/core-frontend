import moment from "moment";
import {TFunction} from "../../utils";
import {IField, IForm} from "../types";

function beforeNotRequiredMessage(trans: TFunction) {
    return trans("static:93e0035fa0684768839021399baed028");
}

export function beforeNotRequired(field: IField, form: IForm, req = "") {
    const {value} = field;
    const reqVal = form.select(req)?.value;

    if (value === null || typeof value === "boolean" || reqVal === null || typeof reqVal === "boolean") {
        return undefined;
    }

    const val1 = moment(reqVal);
    const val2 = moment(value);

    if (val1.isValid() && val2.isValid()) {
        if (val2.isSameOrBefore(val1, "days")) {
            return undefined;
        }

        return beforeNotRequiredMessage;
    }

    return undefined;
}
