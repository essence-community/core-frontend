import {getComponent} from "@essence/essence-constructor-share";
import TextField from "../TextField";
import FieldMask from "./FieldMask/FieldMask";
import FieldDateRC from "./FieldDateRC/FieldDateRC";
import FieldCheckbox from "./FieldCheckbox/FieldCheckbox";
import FieldCurrency from "./FieldCurrency/FieldCurrency";
import FieldTable from "./FieldTable/FieldTable";
import FieldMulti from "./FieldMulti/FieldMulti";
import FieldSmartMask from "./FieldSmartMask/FieldSmartMask";
import FieldComputed from "./FieldComputed/FieldComputed";
import FieldGroup from "./FieldGroup/FieldGroup";
import FieldTextArea from "./FieldTextarea/FieldTextarea";
import FieldInteger from "./FieldInteger";
import FieldPassword from "./FieldPassword/FieldPassword";
import FieldColorPicker from "./FieldColorPicker/FieldColorPicker";
import FieldRadioGroup from "./FieldRadioGroup/FieldRadioGroup";
import FieldImage from "./FieldImage/FieldImage";

export const fieldMap = {
    addr: FieldMulti,
    boolean: FieldCheckbox,
    checkbox: FieldCheckbox,
    color: FieldColorPicker,
    computed: FieldComputed,
    date: FieldDateRC,
    grid: FieldTable,
    group: FieldGroup,
    image: FieldImage,
    integer: FieldInteger,
    mo: FieldMulti,
    numeric: FieldCurrency,
    password: FieldPassword,
    radio: FieldRadioGroup,
    text: TextField,
    textarea: FieldTextArea,
    tree: FieldTable,
};

export const getFieldInstance = (config) => {
    if (config.imask) {
        return config.imask.indexOf("!") === 0 ? FieldSmartMask : FieldMask;
    }

    const component = getComponent(`${config.type}.${config.datatype.toUpperCase()}`);

    return component || fieldMap[config.datatype];
};
