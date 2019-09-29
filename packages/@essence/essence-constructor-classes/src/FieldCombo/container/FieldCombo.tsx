import * as React from "react";
import {reaction} from "mobx";
import {Popover, withModel, ICreateModelProps} from "@essence/essence-constructor-share";
import {useDisposable} from "mobx-react-lite";
import {FieldComboList} from "../components/FieldComboList";
import {FieldComboInput} from "../components/FieldComboInput";
import {FieldComboModel} from "../store/FieldComboModel";
import {IFieldComboProps} from "./FieldCombo.types";

/**
 * How it should work:
 * 1. Value can get from recordsStore
 * 2. can be changed from props.value
 */
const FieldCombo: React.FC<IFieldComboProps> = (props) => {
    const popoverContent = (
        <FieldComboList store={props.store} bc={props.bc} value={props.value} onChange={props.onChange} />
    );

    useDisposable(
        () =>
            reaction(
                () => props.store.recordsStore.recordsState,
                (recordsState) => {
                    const value = recordsState.defaultValueSet
                        ? props.store.recordsStore.selectedRecord[props.store.valuefield]
                        : props.value;

                    // @ts-ignore
                    props.store.handleSetValue(value, true);
                },
            ),
        [props.value],
    );

    React.useEffect(
        () => {
            props.store.handleSetValue(props.value);
        },
        [props.value],
    );

    return (
        <Popover
            popoverContent={popoverContent}
            container={props.pageStore.pageEl}
            pageStore={props.pageStore}
            hideOnScroll
        >
            {({onClose, onOpen, open}) => <FieldComboInput {...props} onClose={onClose} onOpen={onOpen} open={open} />}
        </Popover>
    );
};

export const FieldComboEnchance = withModel(
    (props: ICreateModelProps) => new FieldComboModel({bc: props.bc, pageStore: props.pageStore}),
)(FieldCombo);
