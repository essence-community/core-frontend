import {TextFieldProps} from "@material-ui/core";
import {TError} from "../../Form/types";
import {TText} from "../../types";

export interface ITextFieldExtendProps {
    variant: TextFieldProps["variant"];
    "data-page-object"?: string;
    "data-qtip"?: string | TError | TText | TText[];
}
