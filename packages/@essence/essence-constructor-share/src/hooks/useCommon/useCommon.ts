import {useState, useContext, useCallback, useEffect} from "react";
import {reaction} from "mobx";
import {IClassProps} from "../../types";
import {deepFind, parseMemoize} from "../../utils";
import {RecordContext, FormContext, ParentFieldContext} from "../../context";
import {VAR_RECORD_MASTER_ID} from "../../constants";
import {isDisabled} from "./isDisabled";

interface IUseCommonResult {
    disabled: boolean;
    hidden: boolean;
    readOnly?: boolean;
    visible: boolean;
}

export const useCommon = (props: IClassProps): IUseCommonResult => {
    const {bc, pageStore, disabled, readOnly, hidden} = props;
    const {hiddenrules, readonlyrules} = bc;
    const record = useContext(RecordContext);
    const form = useContext(FormContext);
    const parentField = useContext(ParentFieldContext);

    const [disabledState, setDisabledState] = useState(bc.disabled === true);
    const [hiddenState, setHiddenState] = useState(bc.hidden === true);
    const [readOnlyState, setReadOnlyState] = useState(
        typeof bc.readonly === "undefined" ? pageStore.isReadOnly : bc.readonly === true,
    );
    const isHidden = hidden || hiddenState;

    const getValue = useCallback(
        (name: string) => {
            if (name.charAt(0) === "g") {
                return pageStore.globalValues.get(name);
            }

            if (record) {
                const [isExistRecord, recValue] = deepFind(record, name);

                if (isExistRecord) {
                    return recValue;
                }
            }

            if (form) {
                const values = form?.values;

                if (parentField) {
                    const [isExistParent, val] = deepFind(values, `${parentField.key}.${name}`);

                    if (isExistParent) {
                        return val;
                    }
                }

                const [isExist, val] = deepFind(values, name);

                if (isExist) {
                    return val;
                }
            }

            return undefined;
        },
        [form, record, parentField, pageStore],
    );

    useEffect(() => {
        if ((bc.reqsel && bc[VAR_RECORD_MASTER_ID]) || bc.disabledrules || bc.disabledemptymaster) {
            setDisabledState(isDisabled({bc, getValue, pageStore}));

            return reaction(() => isDisabled({bc, getValue, pageStore}), setDisabledState, {
                fireImmediately: true,
            });
        }
    }, [bc, getValue, pageStore]);

    useEffect(() => {
        if (hiddenrules) {
            setHiddenState(parseMemoize(hiddenrules).runer({get: getValue}) as boolean);

            return reaction(() => parseMemoize(hiddenrules).runer({get: getValue}) as boolean, setHiddenState, {
                fireImmediately: true,
            });
        }
    }, [getValue, hiddenrules]);

    useEffect(() => {
        if (readonlyrules) {
            if (readOnly) {
                setReadOnlyState(true);
            }
            setReadOnlyState(parseMemoize(readonlyrules).runer({get: getValue}) as boolean);

            return reaction(() => parseMemoize(readonlyrules).runer({get: getValue}) as boolean, setReadOnlyState, {
                fireImmediately: true,
            });
        }
    }, [bc, getValue, pageStore, readOnly, readonlyrules]);

    return {
        disabled: disabled || disabledState,
        hidden: isHidden,
        readOnly: readOnly || readOnlyState,
        visible: !isHidden || props.visible,
    };
};
