import {IForm} from "../Form";

interface IUseFieldDisabled {
    disabled?: boolean;
    readOnly?: boolean;
    form: IForm;
}

export function useFieldDisabled({readOnly, disabled, form}: IUseFieldDisabled): boolean {
    return (readOnly && form.placement === "filter" && typeof form.bc?.readonly === "undefined" ? false : readOnly) ||
            disabled ||
            !form.editing;
}
