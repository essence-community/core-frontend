import React from "react";
import {reaction} from "mobx";
import {IBuilderConfig, IPageModel, IStoreBaseModel, IRecord} from "../types";
import {IField} from "../Form";
import {isEmpty} from "../utils";

interface IUseFieldSetGlobalProps {
    bc: IBuilderConfig;
    field: IField;
    pageStore: IPageModel;
    store?: IStoreBaseModel;
}

export function useFieldSetGlobal({field, pageStore, bc, store}: IUseFieldSetGlobalProps) {
    const {setglobal} = bc;

    React.useEffect(() => {
        if (store && setglobal?.length) {
            setglobal.forEach(({out}) => {
                pageStore.addGlobalStoresAction(out, store);
            });

            return () => {
                setglobal.forEach(({out}) => {
                    pageStore.removeGlobalStoresAction(out, store);
                });
            };
        }

        return undefined;
    }, [setglobal, field, pageStore, store]);

    React.useEffect(() => {
        if (!setglobal?.length) {
            return undefined;
        }

        const {collectionvalues, valuefield} = bc;
        const {globalValues} = pageStore;
        const isStoreRecord = store && (setglobal.length > 1 || !!setglobal[0].in);

        return reaction(
            () => {
                const values: IRecord = {};
                const selectedEntries = store?.selectedEntries;
                const selectedRecord = store?.selectedRecord;

                if (selectedEntries && collectionvalues === "array" && valuefield?.length) {
                    setglobal.forEach(({in: inKey, out}) => {
                        if (isEmpty(inKey)) {
                            if (valuefield.length === 1) {
                                values[out] = selectedEntries.map((value) => value[1][valuefield[0].in]);
                            } else {
                                values[out] = selectedEntries.map((value) => {
                                    const obj: IRecord = {};

                                    valuefield.forEach(({in: keyIn, out}) => {
                                        obj[out || keyIn] = value[1][keyIn];
                                    });

                                    return obj;
                                });
                            }
                        } else if (inKey) {
                            values[out] = selectedEntries.map((value) => {
                                const obj: IRecord = {};

                                obj[inKey] = value[1][inKey];

                                return obj;
                            });
                        }
                    });

                    return values;
                }

                if (store && (!selectedRecord || isEmpty(field.value))) {
                    setglobal.forEach(({out}) => {
                        values[out] = null;
                    });

                    return values;
                }

                setglobal.forEach((keys) => {
                    const keyIn = keys.in || field.key;
                    const {out} = keys;

                    if (isStoreRecord && store) {
                        values[out] = selectedRecord?.[keys.in || bc.idproperty || field.key];

                        if (isEmpty(values[out])) {
                            values[out] = globalValues.has(out) ? null : undefined;
                        }
                    } else if (field.form.select(keyIn)) {
                        values[out] = field.form.select(keyIn)?.value;
                    } else if (globalValues.has(out)) {
                        values[out] = null;
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
    }, [bc, field, pageStore, setglobal, store]);
}
