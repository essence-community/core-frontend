import {IField} from "../types";
import {TFunction} from "../../utils";

function requiredCheckboxMessage(trans: TFunction) {
    return trans("static:58c125b1b34f445c9ae5640ff3122e03");
}

export function requiredCheckbox(field: IField) {
    const {value} = field;

    if (value === 1 || value === "1" || value === true) {
        return undefined;
    }

    return requiredCheckboxMessage;
}
