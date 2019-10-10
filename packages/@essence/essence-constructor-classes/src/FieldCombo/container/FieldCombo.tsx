import * as React from "react";
import {reaction} from "mobx";
import {Popover, withModel, ICreateModelProps, isEmpty} from "@essence/essence-constructor-share";
import {IPopoverChildrenProps} from "@essence/essence-constructor-share/uicomponents/Popover/Popover.types";
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
    const inputRef: React.RefObject<HTMLInputElement> = React.useRef();
    const popoverContent = (popoverProps: IPopoverChildrenProps) => (
        <FieldComboList
            store={props.store}
            bc={props.bc}
            inputRef={inputRef}
            value={props.value}
            onChange={props.onChange}
            {...popoverProps}
        />
    );

    const handleChangeOpen = React.useCallback(
        (open: boolean) => {
            if (open === false && props.bc.allownew !== "true") {
                props.store.handleSetValue(props.value);
            }
        },
        [props.bc.allownew, props.store, props.value],
    );

    const handleBlur = React.useCallback(
        () => {
            requestAnimationFrame(() => {
                if (isEmpty(props.value)) {
                    props.store.handleSetValue(props.value);
                    props.store.handleChangeValue("");
                } else if (props.bc.allownew !== "true" && document.activeElement !== inputRef.current) {
                    props.store.handleSetValue(props.value);
                }
            });
        },
        [props.bc.allownew, props.store, props.value],
    );

    useDisposable(
        () =>
            reaction(
                () => props.store.recordsStore.recordsState,
                (recordsState) => {
                    const value = recordsState.defaultValueSet
                        ? props.store.recordsStore.selectedRecord[props.store.valuefield]
                        : props.value;

                    props.store.handleSetValue(
                        value,
                        true,
                        recordsState.status === "search" && recordsState.isUserReload,
                    );
                },
            ),
        [props.value],
    );

    React.useEffect(
        () => {
            props.field.store = props.store;
            props.onInitGlobal(props.store);

            return () => {
                props.field.store = undefined;
            };
        },
        [props],
    );

    React.useEffect(
        () => {
            props.store.handleSetValue(props.value);
        },
        [props.store, props.value],
    );

    if (props.hidden) {
        return null;
    }

    return (
        <Popover
            popoverContent={popoverContent}
            container={props.pageStore.pageEl}
            pageStore={props.pageStore}
            hideOnScroll
            onChangeOpen={handleChangeOpen}
            onBlur={handleBlur}
        >
            {({onClose, onOpen, open}) => (
                <FieldComboInput {...props} inputRef={inputRef} onClose={onClose} onOpen={onOpen} open={open} />
            )}
        </Popover>
    );
};

export const FieldComboEnchance = withModel(
    (props: ICreateModelProps) => new FieldComboModel({bc: props.bc, pageStore: props.pageStore}),
)(FieldCombo);
