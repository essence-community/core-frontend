import * as React from "react";
import {FieldValue, IClassProps, IRecord} from "@essence-community/constructor-share/types";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {useModel} from "@essence-community/constructor-share/hooks";
import {reaction} from "mobx";
import {deepChange, deepFind, isEmpty} from "@essence-community/constructor-share/utils";
import {useField} from "@essence-community/constructor-share/Form/useField";
import {VALUE_SELF_ALWAYSFIRST, VALUE_SELF_FIRST, VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {ServiceHiddenModel} from "../stores/ServiceHiddenModel";

const CLEAR_VALUE = undefined;

export const ServiceHiddenContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const {setglobal, valuefield, idproperty, disabled, hidden} = bc;
    const applicationStore = React.useContext(ApplicationContext);
    const [store] = useModel((options) => new ServiceHiddenModel({...options, applicationStore}), props);
    const memoBc = React.useMemo(
        () => ({
            ...bc,
            defaultvalue:
                bc.defaultvalue === VALUE_SELF_ALWAYSFIRST || bc.defaultvalue === VALUE_SELF_FIRST
                    ? undefined
                    : bc.defaultvalue,
            defaultvaluelocalization:
                bc.defaultvaluelocalization === VALUE_SELF_ALWAYSFIRST ||
                bc.defaultvaluelocalization === VALUE_SELF_FIRST
                    ? undefined
                    : bc.defaultvaluelocalization,
        }),
        [bc],
    );
    const field = useField({bc: memoBc, clearValue: CLEAR_VALUE, disabled, hidden, pageStore});

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
                reaction(() => store.selectedRecord, calcRecord, {
                    fireImmediately: true,
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

                            valuefield.forEach(({in: fieldName, out}) => {
                                const valueField = out || bc.column;

                                deepChange(
                                    patchValues,
                                    `${parentKey ? `${parentKey}.` : ""}${valueField}`,
                                    deepFind(record, fieldName)[1],
                                );

                                if (!column && (valueField === bc.column || !out)) {
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
                    {
                        fireImmediately: true,
                    },
                ),
            );
        }

        return () => rows.forEach((cb) => cb());
    }, [setglobal, pageStore, store, bc.column, idproperty, valuefield, field]);

    return null;
};
