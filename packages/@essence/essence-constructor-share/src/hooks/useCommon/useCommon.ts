import {useState, useContext, useCallback, useEffect} from "react";
import {reaction} from "mobx";
import {IClassProps} from "../../types";
import {isEmpty, parseMemoize} from "../../utils";
import {RecordContext} from "../../context";
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

    const [disabledState, setDisabledState] = useState(bc.disabled === true);
    const [hiddenState, setHiddenState] = useState(bc.hidden === true);
    const [readOnlyState, setReadOnlyState] = useState(() =>
        isEmpty(bc.readonly) ? undefined : bc.readonly === "true",
    );
    const isHidden = hidden || hiddenState;

    const getValue = useCallback(
        (name: string) => {
            return record && name.charAt(0) !== "g" ? record[name] : pageStore.globalValues.get(name);
        },
        [pageStore, record],
    );

    useEffect(() => {
        if ((bc.reqsel === "true" && bc[VAR_RECORD_MASTER_ID]) || bc.disabledrules || bc.disabledemptymaster) {
            return reaction(() => isDisabled({bc, getValue, pageStore}), setDisabledState, {
                fireImmediately: true,
            });
        }
    }, [bc, getValue, pageStore]);

    useEffect(() => {
        if (hiddenrules) {
            return reaction(() => parseMemoize(hiddenrules).runer({get: getValue}) as boolean, setHiddenState, {
                fireImmediately: true,
            });
        }
    }, [getValue, hiddenrules]);

    useEffect(() => {
        if (!readOnly && readonlyrules) {
            if (readOnly) {
                setReadOnlyState(true);
            }

            return reaction(() => parseMemoize(readonlyrules).runer({get: getValue}) as boolean, setReadOnlyState, {
                fireImmediately: true,
            });
        }
    }, [getValue, readOnly, readonlyrules]);

    return {
        disabled: disabled || disabledState,
        hidden: isHidden,
        readOnly: readOnly || readOnlyState,
        visible: isHidden || props.visible,
    };
};
