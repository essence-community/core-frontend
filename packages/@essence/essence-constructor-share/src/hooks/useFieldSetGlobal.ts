import React from "react";
import {reaction} from "mobx";
import {IBuilderConfig, IPageModel, IStoreBaseModel, IRecord} from "../types";
import {IForm, IField} from "../Form";
import {findSetKey, isEmpty} from "../utils";

interface IUseFieldSetGlobalProps {
    bc: IBuilderConfig;
    form: IForm;
    field: IField;
    pageStore: IPageModel;
    store?: IStoreBaseModel;
}

export function useFieldSetGlobal({form, field, pageStore, bc, store}: IUseFieldSetGlobalProps) {
    React.useEffect(() => {
        if (store && bc.setglobal) {
            const keys = findSetKey(bc.setglobal, field.key);

            Object.keys(keys).forEach((globaleKey) => {
                pageStore.addGlobalStoresAction(globaleKey, store);
            });

            return () => {
                Object.keys(keys).forEach((globaleKey) => {
                    pageStore.removeGlobalStoresAction(globaleKey, store);
                });
            };
        }

        return undefined;
    }, [bc.setglobal, field, pageStore, store]);

    React.useEffect(() => {
        if (!bc.setglobal) {
            return undefined;
        }

        const {setglobal = "", collectionvalues, valuefield} = bc;
        const {globalValues} = pageStore;
        const isStoreRecord =
            store && ((setglobal.indexOf("=") > -1 && setglobal.indexOf(",") > -1) || setglobal.indexOf("=") > -1);

        return reaction(
            () => {
                const keys = findSetKey(setglobal, field.key);
                const values: IRecord = {};
                const selectedEntries = store?.selectedEntries;

                if (selectedEntries && collectionvalues === "array" && valuefield) {
                    Object.keys(keys).forEach((globaleKey) => {
                        if (valuefield.indexOf(",") === -1) {
                            values[globaleKey] = selectedEntries.map((value) => value[1][valuefield]);
                        } else {
                            values[globaleKey] = selectedEntries.map((value) => {
                                const obj: IRecord = {};

                                valuefield.split(",").forEach((fieldKey) => {
                                    obj[fieldKey] = value[1][fieldKey];
                                });

                                return obj;
                            });
                        }
                    });

                    return values;
                }

                if (store && !store.selectedRecord) {
                    Object.keys(keys).forEach((globaleKey) => {
                        values[globaleKey] = null;
                    });

                    return values;
                }

                Object.keys(keys).forEach((globaleKey) => {
                    const fieldName = keys[globaleKey];

                    if (isStoreRecord && store) {
                        values[globaleKey] = store.selectedRecord?.[fieldName];

                        if (isEmpty(values[globaleKey])) {
                            values[globaleKey] = globalValues.has(globaleKey) ? null : undefined;
                        }
                    } else if (form.select(fieldName)) {
                        values[globaleKey] = form.select(fieldName)?.value;
                    } else if (globalValues.has(globaleKey)) {
                        values[globaleKey] = null;
                    }
                });

                return values;
            },
            (values) => {
                const clearValues: Record<string, null> = {};

                Object.keys(values).forEach((key) => {
                    clearValues[key] = null;
                });

                // To trigger mobx change value event
                pageStore.updateGlobalValues(clearValues);
                pageStore.updateGlobalValues(values);
            },
            {
                fireImmediately: true,
            },
        );
    }, [bc, field, form, pageStore, store]);
}
