import {IField} from "../types";

function requiredMessage() {
    return "Поле обязательно для заполнения.";
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
