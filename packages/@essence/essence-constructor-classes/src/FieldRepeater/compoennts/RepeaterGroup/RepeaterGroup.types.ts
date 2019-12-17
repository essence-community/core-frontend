import {Field, IBuilderMode, FormType} from "@essence/essence-constructor-share/types/Base";
import {IClassProps} from "@essence/essence-constructor-share";

export interface IRepeaterGroupProps extends IClassProps {
    field: Field;
    form: FormType;
    mode?: IBuilderMode;
    isDisabledDel?: boolean;
    storeName: string;
}
