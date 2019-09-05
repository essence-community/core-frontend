// @flow
import {type TextFieldChildProps} from "../../BuilderFieldType";
import styles from "./FieldColorPickerStyles";

export type FieldColorPickerStateType = {
    focused: boolean,
};

export type FieldColorPickerPropsType = TextFieldChildProps & {
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
};
