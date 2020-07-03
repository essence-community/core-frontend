import * as React from "react";
import {isEmpty} from "@essence-community/constructor-share/utils";
import {VALUE_SELF_FIRST, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
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
import {getFirstValues} from "../utils";
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

    useFieldGetGlobal({bc, field, pageStore, store});
    useFieldSetGlobal({bc, field, pageStore, store});
    useDefaultValueQuery({bc, field, pageStore});

    const changeValue = React.useCallback(
        (value) => {
            if (isEmpty(value)) {
                store.clearAction();
            } else if (value === VALUE_SELF_FIRST) {
                field.onChange(getFirstValues(store.recordsStore));
            } else {
                store.setDefaultRecordAction(value);
            }
        },
        [store, field],
    );

    // Check for grid store
    React.useEffect(() => {
        return reaction(
            () => pageStore.stores.get(store.gridBc[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore,
            (recordsStore) => {
                if (recordsStore) {
                    store.restoreSelectedAction(recordsStore);
                }
            },
        );
    }, [pageStore.stores, store]);

    React.useEffect(() => {
        changeValue(field.value);

        return reaction(() => field.value, changeValue, {
            fireImmediately: true,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeValue]);

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
