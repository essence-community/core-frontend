import moment from "moment";
import {IField, IForm} from "../types";
import {TFunction} from "../../utils";

export function maxvaluedate(field: IField, form: IForm, req = "") {
    const {value} = field;

    if (value === null || typeof value === "boolean") {
        return undefined;
    }

    const val1 = moment(req);
    const val2 = moment(value);

    if (val1.isValid() && val2.isValid()) {
        if (val2.isSameOrBefore(val1, "days")) {
            return undefined;
        }

        return function maxvaluedateMessage(trans: TFunction) {
            return trans("static:58b71773e7664e70874020a45705bc4c").replace(":maxvalue", req);
        };
    }

    return undefined;
}
