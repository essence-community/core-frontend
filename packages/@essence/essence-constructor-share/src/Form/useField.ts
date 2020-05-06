import {useMemo, useContext, useEffect} from "react";
import uniqueId from "lodash/uniqueId";
import {IBuilderConfig, IPageModel, IRecord, FieldValue} from "../types";
import {FormContext} from "../context";
import {VAR_RECORD_MASTER_ID} from "../constants";
import {IField} from "./types";

interface IUseFieldProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    disabled?: boolean;
    output?: (field: IField) => IRecord | FieldValue;
}

export const useField = ({bc, pageStore, output}: IUseFieldProps): IField => {
    const form = useContext(FormContext);
    const key = useMemo(() => bc.column || uniqueId("builderField"), [bc]);
    const field = useMemo(() => {
        return form.registerField(key, {bc, output, pageStore});
    }, [bc, form, key, output, pageStore]);

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
