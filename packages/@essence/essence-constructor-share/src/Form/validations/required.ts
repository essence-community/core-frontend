import {TFunction} from "../../utils/I18n";
import {IField} from "../types";

function requiredMessage(trans: TFunction) {
    return trans("static:58c125b1b34f445c9ae5640ff3122e03");
}

export function required(field: IField) {
    if (field.value === null || field.value === undefined) {
        return requiredMessage;
    }

    if (String(field.value).replace(/\s/gu, "").length === 0) {
        return requiredMessage;
    }

    return undefined;
}
