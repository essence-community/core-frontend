// @flow
import {type TextFieldChildProps} from "../../BuilderFieldType";
import styles from "./FieldCheckboxStyles";

export type FieldCheckboxPropsType = TextFieldChildProps & {
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
};
