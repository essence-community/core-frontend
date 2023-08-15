import {reaction} from "mobx";
import {useEffect} from "react";
import {parseMemoize, isEmpty} from "../utils";
import {VALUE_SELF_FIRST, VALUE_SELF_ALWAYSFIRST} from "../constants";
import {IField} from "../Form";
import {IPageModel, IBuilderConfig, IStoreBaseModel, FieldValue} from "../types";

interface IUseFieldGetGlobalProps {
    bc: IBuilderConfig;
    field: IField;
    pageStore: IPageModel;
    store?: IStoreBaseModel;
}

export function useFieldGetGlobal({field, pageStore, bc, store}: IUseFieldGetGlobalProps) {
    const {globalValues} = pageStore;
    const {getglobal} = bc;

    useEffect(() => {
        if (!getglobal) {
            return undefined;
        }

        return reaction(
            () => {
                let hasEmptyValue = false;
                const getValue = (name: string) => {
                    const [isExists, val] = field.input(field.form.initialValues, field, field.form);
                    let value: FieldValue = val || "";

                    if (!isExists || field.form.mode !== "2") {
                        if (typeof name === "string" && name.charAt(0) === "g") {
                            value = globalValues.has(name) ? globalValues.get(name) : "";
                        } else if (store) {
                            value = store.selectedRecord ? store.selectedRecord[name] : "";
                        } else {
                            // eslint-disable-next-line prefer-destructuring
                            value = field.form.select(name)?.value;
                        }
                    }
                    if (isEmpty(value)) {
                        hasEmptyValue = true;
                    }

                    return value;
                };

                return {hasEmptyValue, value: parseMemoize(getglobal).runer({get: getValue})};
            },
            ({hasEmptyValue, value}) => {
                if (hasEmptyValue) {
                    field.onChange(field.isArray || field.isObject ? value : "");
                } else {
                    field.onChange(value);
                }
            },
            {
                fireImmediately:
                    isEmpty(field.value) || field.value === VALUE_SELF_FIRST || field.value === VALUE_SELF_ALWAYSFIRST,
            },
        );
    }, [getglobal, field, globalValues, store]);
}
