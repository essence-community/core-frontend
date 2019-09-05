import {getComponent} from "@essence/essence-constructor-share";
import TextField from "../TextField";
import FieldCombo from "./FieldComboDownshift/FieldComboDownshift";
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
    combo: FieldCombo,
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
    switch (true) {
        case Boolean(config.imask):
            return config.imask.indexOf("!") === 0 ? FieldSmartMask : FieldMask;
        case config.datatype === "wysiwyg":
            return getComponent(config.datatype.toUpperCase());
        default:
            return fieldMap[config.datatype];
    }
};
