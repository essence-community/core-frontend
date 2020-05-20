import {getComponent} from "@essence-community/constructor-share";
import FieldPassword from "./FieldPassword/FieldPassword";
import FieldRadioGroup from "./FieldRadioGroup/FieldRadioGroup";

export const fieldMap = {
    password: FieldPassword,
    radio: FieldRadioGroup,
};

export const getFieldInstance = (config) => {
    const component = getComponent(`${config.type}.${config.datatype.toUpperCase()}`);

    return component || fieldMap[config.datatype];
};
