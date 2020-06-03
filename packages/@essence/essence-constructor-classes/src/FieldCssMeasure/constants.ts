import {IValueState} from "./FieldCssMeasure.types";

export const PARSE_VALUE = /^(?<value>\d*\.?\d*)(?<measure>px|%)$/;
export const EMPTY_STATE: IValueState = {
    measure: undefined,
    value: "",
};
