import {IClassProps} from "@essence-community/constructor-share";

export interface IRepeaterGroupProps extends IClassProps {
    idx: number;
    deleteLabel: string;
    isDisabledDel?: boolean;
    isHiddenDel?: boolean;
    storeName: string;
}
