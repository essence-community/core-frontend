import * as React from "react";
import {FieldValue, IClassProps, IRecord} from "@essence-community/constructor-share/types";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {useModel} from "@essence-community/constructor-share/hooks";
import {autorun, reaction} from "mobx";
import {deepChange, deepFind, isEmpty} from "@essence-community/constructor-share/utils";
import {useField} from "@essence-community/constructor-share/Form/useField";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {ServiceHiddenModel} from "../stores/ServiceHiddenModel";

const CLEAR_VALUE = undefined;

export const ServiceHiddenContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const {setglobal, valuefield, idproperty, getglobaltostore, disabled, hidden} = bc;
    const applicationStore = React.useContext(ApplicationContext);
    const [store] = useModel((options) => new ServiceHiddenModel({...options, applicationStore}), props);
    const field = useField({bc, clearValue: CLEAR_VALUE, disabled, hidden, pageStore});

    // Set record to global
    React.useEffect(() => {
        const rows = [];

        if (setglobal?.length) {
            const calcRecord = (record: IRecord = {}) => {
                const values = setglobal.reduce<IRecord>((acc, {in: keyIn, out}) => {
                    const [isExist, res] = deepFind(record, keyIn || idproperty || out);

                    acc[out] = isExist ? res : record[keyIn || idproperty || out];

                    return acc;
                }, {});

                pageStore.updateGlobalValues(values);
            };

            rows.push(
                autorun(() => {
                    const [record = {}] = store.recordsStore.records;

                    calcRecord(record);
                }),
            );
            rows.push(calcRecord);
        }

        if (bc.column) {
            rows.push(
                reaction(
                    () => store.selectedRecord,
                    (record = {}) => {
                        let column = "";

                        if (valuefield && valuefield.length > 1) {
                            const patchValues: IRecord = {};
                            let parentKey = "";

                            if (field.key.indexOf(".") > -1) {
                                const arrKey = field.key.split(".");

                                parentKey = arrKey.slice(0, arrKey.length - 1).join(".");
                            }

                            valuefield.forEach(({in: fieldName, out: valueField = bc.column}) => {
                                deepChange(
                                    patchValues,
                                    `${parentKey ? `${parentKey}.` : ""}${valueField}`,
                                    deepFind(record, fieldName)[1],
                                );

                                if (valueField === bc.column) {
                                    column = fieldName;
                                }
                            });

                            field.form.patch(patchValues, true);
                        } else if (valuefield && valuefield.length === 1) {
                            column = valuefield[0].in;
                        } else {
                            column = store.recordsStore.recordId || VAR_RECORD_ID;
                        }

                        const value: FieldValue = deepFind(record, column)[1];

                        if (isEmpty(value)) {
                            field.onClear();
                        } else if (field.value !== value) {
                            field.onChange(value);
                        }
                    },
                ),
            );
        }

        return () => rows.forEach((cb) => cb());
    }, [setglobal, pageStore, store, bc.column, idproperty, valuefield, field]);

    /*
     * Listen to new values in the getglobaltostore
     * For input field can be a lot of requests. Avoid to use text field for this component
     */
    React.useEffect(() => {
        if (getglobaltostore) {
            const dispose = reaction(
                () => getglobaltostore.map(({in: keyIn}) => pageStore.globalValues.get(keyIn)).join(":"),
                store.reloadStoreAction,
                {
                    delay: 300,
                },
            );

            return dispose;
        }

        return undefined;
    }, [getglobaltostore, pageStore, store]);

    return null;
};
