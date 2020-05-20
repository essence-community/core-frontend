import {getComponent} from "@essence-community/constructor-share";
import FieldPassword from "./FieldPassword/FieldPassword";

export const fieldMap = {
    password: FieldPassword,
};

export const getFieldInstance = (config) => {
    const component = getComponent(`${config.type}.${config.datatype.toUpperCase()}`);

    return component || fieldMap[config.datatype];
};
