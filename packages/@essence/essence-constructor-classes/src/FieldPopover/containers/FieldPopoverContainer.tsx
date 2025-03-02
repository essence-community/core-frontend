import * as React from "react";
import {isEmpty} from "@essence-community/constructor-share/utils";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {
    useModel,
    useFieldGetGlobal,
    useFieldSetGlobal,
    useDefaultValueQuery,
} from "@essence-community/constructor-share/hooks";
import {reaction} from "mobx";
import {Popover} from "@essence-community/constructor-share/uicomponents";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {FormContext} from "@essence-community/constructor-share/context";
import {FieldPopoverModel} from "../stores/FieldPopoverModel";
import {FieldPopoverInput} from "../components/FieldPopoverInput";

export const FieldPopoverContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden, readOnly} = props;
    const form = React.useContext(FormContext);
    const field = useField({bc, disabled, hidden, pageStore});
    const [store] = useModel(
        (options) =>
            new FieldPopoverModel({
                ...options,
                field,
                form,
            }),
        props,
    );

    React.useEffect(() => {
        store.setField(field);
    }, [store, field]);

    useFieldGetGlobal({bc, field, pageStore, store});
    useFieldSetGlobal({bc, field, pageStore, store});
    useDefaultValueQuery({bc, field, pageStore});

    const changeValue = React.useCallback(
        (value) => {
            if (isEmpty(value)) {
                store.clearAction();
            } else {
                store.setDefaultRecordAction(value);
            }
        },
        [store],
    );

    React.useEffect(
        () =>
            reaction(() => field.value, changeValue, {
                fireImmediately: true,
            }),
        [changeValue, field],
    );

    React.useEffect(() => {
        return reaction(
            () => pageStore.forms.get(store.childId),
            (form) => {
                if (form) {
                    store.restoreSelectedAction(form);
                }
            },
        );
    }, [pageStore.forms, store]);

    return (
        <Popover
            popoverContent={mapComponentOne(store.childBc, (ChildCmp, childBc) => (
                <ChildCmp {...props} bc={childBc} />
            ))}
            container={pageStore.pageEl}
            width={bc.pickerwidth}
            pageStore={pageStore}
            hideOnScroll
        >
            <FieldPopoverInput bc={bc} disabled={disabled} readOnly={readOnly} field={field} store={store} />
        </Popover>
    );
};
