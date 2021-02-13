import {IField} from "../types";
import {TFunction} from "../../utils";

function requiredFileMessage(trans: TFunction) {
    return trans("static:58c125b1b34f445c9ae5640ff3122e03");
}

export function requiredFile(field: IField) {
    const {value} = field;

    if (value && (value as File[]).length) {
        return undefined;
    }

    return requiredFileMessage;
}
