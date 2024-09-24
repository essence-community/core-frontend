import {useMemo, useContext, useEffect, useCallback} from "react";
import uniqueId from "lodash/uniqueId";
import {reaction} from "mobx";
import {IBuilderConfig, IPageModel, FieldValue} from "../types";
import {FormContext, ParentFieldContext} from "../context";
import {VAR_RECORD_MASTER_ID, VAR_RECORD_CL_IS_MASTER, VAR_RECORD_PAGE_OBJECT_ID} from "../constants";
import {isEmpty} from "../utils/base";
import {debounce} from "../utils";
import {IField, IRegisterFieldOptions} from "./types";

const CHANGE_TIMEOUT = 500;

interface IUseFieldProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    isArray?: boolean;
    isObject?: boolean;
    isFile?: boolean;
    defaultCopyValueFn?: IField["defaultCopyValueFn"];
    defaultValueFn?: IField["defaultValueFn"];
    output?: IRegisterFieldOptions["output"];
    input?: IRegisterFieldOptions["input"];
    disabled?: boolean;
    hidden?: boolean;
    clearValue?: FieldValue;
}

export const useField = ({
    bc,
    pageStore,
    output,
    input,
    defaultCopyValueFn,
    defaultValueFn,
    isArray,
    isObject,
    isFile,
    disabled,
    hidden,
    clearValue,
}: IUseFieldProps): IField => {
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
            clearValue,
            defaultCopyValueFn,
            defaultValueFn,
            input: input || parentField?.input,
            isArray,
            isFile,
            isObject,
            output: output || parentField?.output,
            pageStore,
            parentFieldKey: parentField?.parentFieldKey,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, key]);

    const handleReactValue = useCallback(
        debounce((value: FieldValue) => {
            const ckPageObject = bc[VAR_RECORD_PAGE_OBJECT_ID];

            pageStore.addFieldValueMaster(ckPageObject, value);

            pageStore.stores.forEach((store) => {
                if (store && store.bc && store.bc[VAR_RECORD_MASTER_ID] === ckPageObject) {
                    if (isEmpty(value)) {
                        store.clearStoreAction();
                        store.clearAction && store.clearAction();
                        if (store.recordsStore) {
                            store.recordsStore.recordsAll = [];
                            store.recordsStore.recordsState = {
                                isUserReload: false,
                                records: [],
                                status: "clear",
                            };
                        }
                    } else {
                        store.reloadStoreAction();
                    }
                }
            });
        }, CHANGE_TIMEOUT),
        [bc, pageStore],
    );

    useEffect(() => {
        if (bc[VAR_RECORD_CL_IS_MASTER]) {
            const disposer = reaction(() => field.value, handleReactValue, {
                fireImmediately: true,
            });

            return () => {
                disposer();
                pageStore.removeFieldValueMaster(bc[VAR_RECORD_PAGE_OBJECT_ID]);
            };
        }

        return undefined;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [field, handleReactValue]);

    useEffect(() => {
        const masterId = bc[VAR_RECORD_MASTER_ID];

        if (masterId) {
            pageStore.addToMastersAction(masterId, field);

            return () => {
                pageStore.removeFromMastersAction(masterId, field);
            };
        }

        return undefined;
    }, [bc, field, pageStore]);

    useEffect(() => {
        field.setDisabled(disabled);
    }, [field, disabled]);

    useEffect(() => {
        field.setHidden(hidden);
    }, [field, hidden]);

    useEffect(() => {
        return () => {
            form.unregisterField(key);
        };
    }, [form, key]);

    return field;
};
