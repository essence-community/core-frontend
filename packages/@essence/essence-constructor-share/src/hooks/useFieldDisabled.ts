import {useObserver} from "mobx-react-lite";
import {IForm} from "../Form";

interface IUseFieldDisabled {
    disabled?: boolean;
    readOnly?: boolean;
    form: IForm;
}

export function useFieldDisabled({readOnly, disabled, form}: IUseFieldDisabled): boolean {
    return useObserver(() => readOnly || disabled || !form.editing);
}
