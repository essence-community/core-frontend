import {useMemo, useContext, useEffect} from "react";
import uniqueId from "lodash/uniqueId";
import {IBuilderConfig, IPageModel, IRecord, FieldValue} from "../types";
import {FormContext, ParentKeyContext} from "../context";
import {VAR_RECORD_MASTER_ID} from "../constants";
import {IField} from "./types";

interface IUseFieldProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    disabled?: boolean;
    isArray?: boolean;
    output?: (field: IField) => IRecord | FieldValue;
}

export const useField = ({bc, pageStore, output, isArray}: IUseFieldProps): IField => {
    const form = useContext(FormContext);
    const parentKey = useContext(ParentKeyContext);
    const key = useMemo(() => {
        const columnKey = bc.column || uniqueId("builderField");

        if (parentKey) {
            return `${parentKey}.${columnKey}`;
        }

        return columnKey;
    }, [bc.column, parentKey]);
    const field = useMemo(() => {
        return form.registerField(key, {bc, isArray, output, pageStore});
    }, [bc, form, isArray, key, output, pageStore]);

    useEffect(() => {
        const masterId = bc[VAR_RECORD_MASTER_ID];

        if (masterId) {
            pageStore.addToMastersAction(masterId, field);

            return pageStore.removeFromMastersAction(masterId, field);
        }

        return undefined;
    }, [bc, field, pageStore]);

    useEffect(() => {
        return () => {
            form.unregisterField(key);
        };
    }, [form, key]);

    return field;
};
