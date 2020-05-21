import {reaction} from "mobx";
import {useEffect} from "react";
import {parseMemoize, isEmpty, toStringGlobal} from "../utils";
import {VALUE_SELF_FIRST} from "../constants";
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

    useEffect(() => {
        if (!bc.getglobal) {
            return undefined;
        }

        const getglobalReturn = toStringGlobal(bc.getglobal);

        return reaction(
            () => {
                let hasEmptyValue = false;
                const getValue = (name: string) => {
                    let value: FieldValue = "";

                    if (name.charAt(0) === "g") {
                        value = globalValues.has(name) ? globalValues.get(name) : "";
                    } else if (store) {
                        value = store.selectedRecord ? store.selectedRecord[name] : "";
                    } else {
                        // eslint-disable-next-line prefer-destructuring
                        value = field.form.select(name)?.value;
                    }

                    if (!value) {
                        hasEmptyValue = true;
                    }

                    return value;
                };

                return {hasEmptyValue, value: parseMemoize(getglobalReturn).runer({get: getValue})};
            },
            ({hasEmptyValue, value}) => {
                if (hasEmptyValue) {
                    field.onChange("");
                } else {
                    field.onChange(isEmpty(value) ? "" : value);
                }
            },
            {
                fireImmediately: isEmpty(field.value) || field.value === VALUE_SELF_FIRST,
            },
        );
    }, [bc.getglobal, field, globalValues, store]);
}
