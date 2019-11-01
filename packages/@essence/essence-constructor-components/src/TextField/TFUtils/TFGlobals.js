// @flow
import {reaction} from "mobx";
import forOwn from "lodash/forOwn";
import {Form, Field} from "mobx-react-form";
import {camelCaseMemoized} from "@essence/essence-constructor-share/utils";
import {parseMemoize} from "@essence/essence-constructor-share/utils/parser";
import {VALUE_SELF_FIRST} from "@essence/essence-constructor-share/constants";
import {type PageModelType} from "../../stores/PageModel";
import {findSetKey} from "../../utils/findKey";
import {toStringGlobal} from "../../utils/globalStringify";
import {isEmpty} from "../../utils/base";
import {type BuilderFieldType} from "../BuilderFieldType";

type InitGetGlobalType = {
    form: Form,
    field: Field,
    pageStore: PageModelType,
    bc: BuilderFieldType,
    store: any,
    disposers: Array<Function>,
};

export const initGetGlobal = ({form, field, pageStore, bc, store}: InitGetGlobalType) => {
    const {globalValues} = pageStore;
    const {getglobal = ""} = bc;
    const getglobalReturn = toStringGlobal(getglobal);

    return reaction(
        () => {
            let hasEmptyValue = false;
            const getValue = (name: string) => {
                let value = "";

                if (name.charAt(0) === "g") {
                    value = globalValues.has(name) ? globalValues.get(name) : "";
                } else if (store) {
                    value = store.selectedRecord ? store.selectedRecord[name] : "";
                } else {
                    // eslint-disable-next-line prefer-destructuring
                    value = form.$(name).value;
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
                field.set("");
            } else {
                field.set("value", isEmpty(value) ? "" : value);
            }
        },
        {
            fireImmediately: isEmpty(field.value) || field.value === VALUE_SELF_FIRST,
        },
    );
};

export const initSetGlobal = ({form, field, pageStore, bc, store, disposers}: InitGetGlobalType) => {
    const {globalValues} = pageStore;
    const {setglobal = "", collectionvalues, valuefield} = bc;
    const keys = findSetKey(setglobal, field.key);
    const isStoreRecord =
        store && ((setglobal.indexOf("=") > -1 && setglobal.indexOf(",") > -1) || setglobal.indexOf("=") > -1);

    if (store && setglobal) {
        forOwn(keys, (fieldName, globaleKey) => {
            pageStore.addGlobalStoresAction(globaleKey, store);
        });

        disposers.push(() => {
            forOwn(keys, (fieldName, globaleKey) => {
                pageStore.removeGlobalStoresAction(globaleKey, store);
            });
        });
    }

    return reaction(
        () => {
            const values = {};

            if (store && collectionvalues === "array" && valuefield) {
                forOwn(keys, (fieldName, globaleKey) => {
                    if (valuefield.indexOf(",") === -1) {
                        values[globaleKey] = store.selectedEntries.map(
                            (value) => value[1][camelCaseMemoized(valuefield)],
                        );
                    } else {
                        values[globaleKey] = store.selectedEntries.map((value) => {
                            const obj = {};

                            valuefield.split(",").forEach((fieldKey) => {
                                obj[fieldKey] = value[1][camelCaseMemoized(fieldKey)];
                            });

                            return obj;
                        });
                    }
                });

                return values;
            }

            if (store && !store.selectedRecord) {
                forOwn(keys, (fieldName, globaleKey) => {
                    values[globaleKey] = null;
                });

                return values;
            }

            forOwn(keys, (fieldName, globaleKey) => {
                if (isStoreRecord) {
                    values[globaleKey] = store.selectedRecord[fieldName];

                    if (isEmpty(values[globaleKey])) {
                        values[globaleKey] = globalValues.has(globaleKey) ? null : undefined;
                    }
                } else if (form.has(fieldName)) {
                    values[globaleKey] = form.$(fieldName).value;
                } else if (globalValues.has(globaleKey)) {
                    values[globaleKey] = null;
                }
            });

            return values;
        },
        (values) => {
            const clearValues = {};

            forOwn(values, (value, key) => {
                clearValues[key] = null;
            });

            pageStore.updateGlobalValues(clearValues);
            pageStore.updateGlobalValues(values);
        },
        {
            fireImmediately: true,
        },
    );
};
