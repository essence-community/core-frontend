import * as React from "react";
import {reaction} from "mobx";
import {Popover, ApplicationContext, useModel} from "@essence-community/constructor-share";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {IPopoverChildrenProps} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
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
    const {i18n} = useTranslation();
    const inputRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);
    const listRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);
    const textFieldRef: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);
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
            listRef={listRef}
            {...popoverProps}
        />
    );

    const handleChangeOpen = React.useCallback(
        (open: boolean) => {
            if (open === false && !props.bc.allownew && store.lastValue !== props.value) {
                store.handleSetValue(props.value, false, false);
            }
        },
        [props.bc.allownew, store, props.value],
    );

    useDisposable(
        () =>
            reaction(
                () => store.recordsStore.recordsState,
                (recordsState) => {
                    const value =
                        recordsState.isDefault && recordsState.record
                            ? recordsState.record[store.valuefield]
                            : props.value;

                    if (recordsState.isDefault) {
                        props.onChange(null, recordsState.record ? recordsState.record[store.valuefield] : "");
                    }

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
        if (store.lastValue !== props.value) {
            store.handleSetValue(props.value, false, false);
        }
    }, [props.value, store]);
    React.useEffect(() => {
        if (props.bc.localization && i18n.language) {
            store.handleChangeLanguage(props.value, i18n.language);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language, props.bc.localization]);

    if (props.hidden) {
        return null;
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {relatedTarget} = event;

        if (relatedTarget instanceof Node) {
            const isFocus = [listRef.current, textFieldRef.current].some((el: HTMLDivElement | null) => {
                return el && el.contains(relatedTarget);
            });

            if (!isFocus && store.isInputChanged) {
                store.handleSetValue(props.value, false, false);
            }
        }
    };

    return (
        <Popover
            popoverContent={popoverContent}
            container={props.pageStore.pageEl}
            pageStore={props.pageStore}
            hideOnScroll
            onChangeOpen={handleChangeOpen}
            disableFocusableArrow
        >
            {({onClose, onOpen, open}) => (
                <FieldComboInput
                    {...props}
                    store={store}
                    inputRef={inputRef}
                    textFieldRef={textFieldRef}
                    onClose={onClose}
                    onOpen={onOpen}
                    open={open}
                    onBlur={handleBlur}
                />
            )}
        </Popover>
    );
};

export const FieldComboEnchance = FieldCombo;
