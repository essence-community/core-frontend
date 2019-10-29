import * as React from "react";
import {reaction} from "mobx";
import {Popover, ApplicationContext, useModel, isEmpty} from "@essence/essence-constructor-share";
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
    const {field, onInitGlobal} = props;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const applicationStore = React.useContext(ApplicationContext);
    const [store] = useModel((modelProps) => new FieldComboModel(modelProps), {
        applicationStore,
        bc: props.bc,
        disabled: props.disabled,
        hidden: props.hidden,
        pageStore: props.pageStore,
    });

    const popoverContent = (popoverProps: IPopoverChildrenProps) => (
        <FieldComboList
            store={store}
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
                store.handleSetValue(props.value);
            }
        },
        [props.bc.allownew, store, props.value],
    );

    const handleBlur = React.useCallback(() => {
        requestAnimationFrame(() => {
            if (document.activeElement !== inputRef.current) {
                if (isEmpty(props.value)) {
                    store.handleSetValue(props.value);
                    store.handleChangeValue("");
                } else if (props.bc.allownew !== "true") {
                    store.handleSetValue(props.value);
                }
            }
        });
    }, [props.bc.allownew, store, props.value]);

    useDisposable(
        () =>
            reaction(
                () => store.recordsStore.recordsState,
                (recordsState) => {
                    const value =
                        recordsState.defaultValueSet && store.recordsStore.selectedRecord
                            ? store.recordsStore.selectedRecord[store.valuefield]
                            : props.value;

                    store.handleSetValue(value, true, recordsState.status === "search" && recordsState.isUserReload);
                },
            ),
        [props.value],
    );

    React.useEffect(() => {
        field.store = store;
        onInitGlobal(store);

        return () => {
            field.store = undefined;
        };
    }, [field, onInitGlobal, store]);

    React.useEffect(() => {
        store.handleSetValue(props.value);
    }, [props.value, store]);

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
                <FieldComboInput
                    {...props}
                    store={store}
                    inputRef={inputRef}
                    onClose={onClose}
                    onOpen={onOpen}
                    open={open}
                />
            )}
        </Popover>
    );
};

export const FieldComboEnchance = FieldCombo;
