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
import {FieldTableModel} from "../stores/FieldTableModel";
import {FieldTableInput} from "../components/FieldTableInput";

export const FieldTableContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden, readOnly} = props;
    const form = React.useContext(FormContext);
    const field = useField({bc, disabled, hidden, pageStore});
    const [store] = useModel(
        (options) =>
            new FieldTableModel({
                ...options,
                field,
                form,
            }),
        props,
    );

    React.useEffect(() => {
        store.setField(field);
    }, [store, field]);

    React.useEffect(() => {
        const name = pageStore.addStore(store, store.currentId, true);

        return () => pageStore.removeStore(name, store);
    }, [store, pageStore]);

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

    // Check for grid store
    React.useEffect(() => {
        return reaction(
            () => pageStore.stores.get(store.gridId)?.recordsStore,
            (recordsStore) => {
                if (recordsStore) {
                    store.restoreSelectedAction(recordsStore);
                }
            },
        );
    }, [pageStore.stores, store]);

    React.useEffect(
        () =>
            reaction(() => field.value, changeValue, {
                fireImmediately: true,
            }),
        [changeValue, field],
    );

    return (
        <Popover
            popoverContent={mapComponentOne(store.gridBc, (ChildCmp, childBc) => (
                <ChildCmp {...props} bc={childBc} />
            ))}
            container={pageStore.pageEl}
            width={bc.pickerwidth}
            pageStore={pageStore}
            hideOnScroll
        >
            <FieldTableInput bc={bc} disabled={disabled} readOnly={readOnly} field={field} store={store} />
        </Popover>
    );
};
