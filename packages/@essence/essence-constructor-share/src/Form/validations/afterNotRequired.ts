import moment from "moment";
import {TFunction} from "../../utils";
import {IField, IForm} from "../types";

function afterNotRequiredMessage(trans: TFunction) {
    return trans("static:4f5060a1dc7c4f5ca76a606b4977f868");
}

export function afterNotRequired(field: IField, form: IForm, req = "") {
    const {value} = field;
    const reqVal = form.select(req)?.value;

    if (value === null || typeof value === "boolean" || reqVal === null || typeof reqVal === "boolean") {
        return undefined;
    }

    const val1 = moment(reqVal);
    const val2 = moment(value);

    if (val1.isValid() && val2.isValid()) {
        if (val2.isSameOrAfter(val1, "days")) {
            return undefined;
        }

        return afterNotRequiredMessage;
    }

    return undefined;
}
