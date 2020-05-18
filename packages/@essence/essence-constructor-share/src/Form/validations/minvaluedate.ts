import moment from "moment";
import {IField, IForm} from "../types";
import {TFunction} from "../../utils";

export function minvaluedate(field: IField, form: IForm, req = "") {
    const {value} = field;

    if (value === null || typeof value === "boolean") {
        return undefined;
    }

    const val1 = moment(req);
    const val2 = moment(value);

    if (val1.isValid() && val2.isValid()) {
        if (val2.isSameOrAfter(val1, "days")) {
            return undefined;
        }

        return function minvaluedateMessage(trans: TFunction) {
            return trans("static:31d96e87a5514f509c75bc701b772504").replace(":minvalue", req);
        };
    }

    return undefined;
}
