import * as React from "react";
import {toSize, isEmpty} from "@essence-community/constructor-share/utils";
import {VALUE_SELF_FIRST} from "@essence-community/constructor-share/constants";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useModel, useFieldGetGlobal, useFieldSetGlobal} from "@essence-community/constructor-share/hooks";
import {reaction} from "mobx";
import {Popover} from "@essence-community/constructor-share/uicomponents";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {FormContext} from "@essence-community/constructor-share/context";
import {FieldTableModel} from "../stores/FieldTableModel";
import {getFirstValues} from "../utils";
import {FieldTableInput} from "../components/FieldTableInput";

export const FieldTableContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden} = props;
    const form = React.useContext(FormContext);
    const field = useField({bc, disabled, hidden, pageStore});
    const [store] = useModel((options) => new FieldTableModel({...options, field, form}), props);

    useFieldGetGlobal({bc, field, form, pageStore, store});
    useFieldSetGlobal({bc, field, form, pageStore, store});

    React.useEffect(() => {
        if (!isEmpty(field.value) && !Array.isArray(field.value)) {
            store.setDefaultRecordAction(field.value);
        }
    }, [field.value, store]);

    React.useEffect(
        () =>
            reaction(
                () => field.value,
                (value) => {
                    if (isEmpty(value)) {
                        store.clearAction();
                    } else if (value === VALUE_SELF_FIRST) {
                        field.onChange(getFirstValues(store.recordsStore));
                    } else if (!Array.isArray(value)) {
                        store.setDefaultRecordAction(value);
                    }
                },
            ),
        [field, store],
    );

    const handleChangeOpen = (open: boolean) => {
        if (open) {
            store.restoreSelectedAction();
        }
    };

    return (
        <Popover
            popoverContent={mapComponentOne(store.gridBc, (ChildCmp, childBc) => (
                <ChildCmp {...props} bc={childBc} />
            ))}
            onChangeOpen={handleChangeOpen}
            container={pageStore.pageEl}
            width={toSize(bc.pickerwidth) as number}
            pageStore={pageStore}
            hideOnScroll
        >
            <FieldTableInput bc={bc} disabled={disabled} field={field} store={store} />
        </Popover>
    );
};
