import {getComponent} from "@essence-community/constructor-share";
import FieldDateRC from "./FieldDateRC/FieldDateRC";
import FieldMulti from "./FieldMulti/FieldMulti";
import FieldGroup from "./FieldGroup/FieldGroup";
import FieldPassword from "./FieldPassword/FieldPassword";
import FieldColorPicker from "./FieldColorPicker/FieldColorPicker";
import FieldRadioGroup from "./FieldRadioGroup/FieldRadioGroup";
import FieldImage from "./FieldImage/FieldImage";

export const fieldMap = {
    addr: FieldMulti,
    color: FieldColorPicker,
    date: FieldDateRC,
    group: FieldGroup,
    image: FieldImage,
    mo: FieldMulti,
    password: FieldPassword,
    radio: FieldRadioGroup,
};

export const getFieldInstance = (config) => {
    const component = getComponent(`${config.type}.${config.datatype.toUpperCase()}`);

    return component || fieldMap[config.datatype];
};
