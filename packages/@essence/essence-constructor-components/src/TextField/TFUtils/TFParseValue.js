// @flow
import isObject from "lodash/isObject";
import isArray from "lodash/isArray";
import {isEmpty} from "../../utils/base";
import {MAX_LENGTH_NUMERIC} from "./TFConstants";

type BcType = {
    datatype?: string,
    collectionvalues?: "array" | "object",
};

export const parseValue = (value: mixed, bc: BcType): mixed => {
    switch (true) {
        case bc.datatype === "checkbox" || bc.datatype === "boolean":
            return isEmpty(value) ? 0 : Number(value);
        case bc.datatype === "numeric":
            if (isEmpty(value)) {
                return "";
            }

            return String(value).length > MAX_LENGTH_NUMERIC ? value : parseFloat(value);
        case bc.datatype === "integer":
            return isEmpty(value) ? "" : parseInt(value, 10);
        case bc.datatype === "array":
            if (isObject(value)) {
                return Object.values(value);
            }

            return isArray(value) ? value : [value];
        case !isEmpty(value):
            return value;
        default:
            return bc.collectionvalues === "array" ? null : "";
    }
};
