import {useState, useEffect} from "react";
import {reaction} from "mobx";
import {IClassProps} from "../../types";
import {parseMemoize} from "../../utils";
import {VAR_RECORD_MASTER_ID} from "../../constants";
import {isDisabled} from "./isDisabled";
import {useGetValue} from "./useGetValue";

interface IUseCommonResult {
    disabled: boolean;
    hidden: boolean;
    readOnly?: boolean;
    visible: boolean;
}

export const useCommon = (props: IClassProps): IUseCommonResult => {
    const {bc, pageStore, disabled, readOnly, hidden} = props;
    const {hiddenrules, readonlyrules} = bc;
    const [disabledState, setDisabledState] = useState(bc.disabled === true);
    const [hiddenState, setHiddenState] = useState(bc.hidden === true);
    const [readOnlyState, setReadOnlyState] = useState(
        typeof bc.readonly === "undefined" ? pageStore.isReadOnly : bc.readonly === true,
    );
    const isHidden = hidden || hiddenState;
    const getValue = useGetValue({pageStore});

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
