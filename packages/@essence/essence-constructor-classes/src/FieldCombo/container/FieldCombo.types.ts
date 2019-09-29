import {IWithModelProps, IFieldProps} from "@essence/essence-constructor-share";
import {FieldComboModel} from "../store/FieldComboModel";

export interface IFieldComboProps extends IWithModelProps, IFieldProps {
    store: FieldComboModel;
}
