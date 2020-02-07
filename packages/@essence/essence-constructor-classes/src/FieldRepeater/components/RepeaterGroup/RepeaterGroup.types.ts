import {Field, IBuilderMode, FormType} from "@essence-community/constructor-share/types/Base";
import {IClassProps} from "@essence-community/constructor-share";

export interface IRepeaterGroupProps extends IClassProps {
    field: Field;
    form: FormType;
    mode?: IBuilderMode;
    deleteLabel: string;
    isDisabledDel?: boolean;
    storeName: string;
}
