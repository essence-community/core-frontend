import {getComponent} from "@essence-community/constructor-share";
import FieldGroup from "./FieldGroup/FieldGroup";
import FieldPassword from "./FieldPassword/FieldPassword";
import FieldRadioGroup from "./FieldRadioGroup/FieldRadioGroup";
import FieldImage from "./FieldImage/FieldImage";

export const fieldMap = {
    group: FieldGroup,
    image: FieldImage,
    password: FieldPassword,
    radio: FieldRadioGroup,
};

export const getFieldInstance = (config) => {
    const component = getComponent(`${config.type}.${config.datatype.toUpperCase()}`);

    return component || fieldMap[config.datatype];
};
