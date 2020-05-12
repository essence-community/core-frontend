/* eslint-disable max-len */
import {useMemo, useContext, useEffect} from "react";
import uniqueId from "lodash/uniqueId";
import {IBuilderConfig, IPageModel} from "../types";
import {FormContext, ParentFieldContext} from "../context";
import {VAR_RECORD_MASTER_ID} from "../constants";
import {IField, IRegisterFieldOptions} from "./types";

interface IUseFieldProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    isArray?: boolean;
    isObject?: boolean;
    output?: IRegisterFieldOptions["output"];
    input?: IRegisterFieldOptions["input"];
    disabled?: boolean;
    hidden?: boolean;
}

export const useField = ({bc, pageStore, output, input, isArray, disabled, hidden}: IUseFieldProps): IField => {
    const form = useContext(FormContext);
    const parentField = useContext(ParentFieldContext);
    const key = useMemo(() => {
        const columnKey = bc.column || uniqueId("builderField");

        if (parentField) {
            return `${parentField.key}.${columnKey}`;
        }

        return columnKey;
    }, [bc.column, parentField]);
    const field = useMemo(() => {
        return form.registerField(key, {
            bc,
            input: input || parentField?.input,
            isArray,
            output: output || parentField?.output,
            pageStore,
        });
    }, [bc, form, input, isArray, key, output, pageStore, parentField]);

    useEffect(() => {
        const masterId = bc[VAR_RECORD_MASTER_ID];

        if (masterId) {
            pageStore.addToMastersAction(masterId, field);

            return pageStore.removeFromMastersAction(masterId, field);
        }

        return undefined;
    }, [bc, field, pageStore]);

    useEffect(() => {
        field.setDisabled(disabled);
        field.setHidden(hidden);
    }, [field, disabled, hidden]);

    useEffect(() => {
        return () => {
            form.unregisterField(key);
        };
    }, [form, key]);

    return field;
};
