// @flow
import {type TextFieldChildProps} from "../../BuilderFieldType";
import {FieldRadioGroupModel} from "../../../stores/FieldRadioGroupModel";

import styles from "./FieldRadioGroupStyles";

export type FieldRadioGroupPropsType = TextFieldChildProps & {
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    store: FieldRadioGroupModel,
    contentwidth?: string,
};
