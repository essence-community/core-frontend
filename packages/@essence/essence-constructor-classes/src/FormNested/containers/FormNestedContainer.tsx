import * as React from "react";
import {IClassProps, IBuilderConfig, FieldValue} from "@essence-community/constructor-share/types";
import {ApplicationContext, ParentFieldContext} from "@essence-community/constructor-share/context";
import {
    useModel,
    useFieldGetGlobal,
    useFieldSetGlobal,
    useDefaultValueQuery,
} from "@essence-community/constructor-share/hooks";
import {reaction} from "mobx";
import {useField} from "@essence-community/constructor-share/Form";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {FormNestedModel} from "../stores/FormNestedModel";

const CLEAR_VALUE: Record<string, FieldValue> = {};

export const FormNestedContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden} = props;
    const applicationStore = React.useContext(ApplicationContext);
    const [store] = useModel((options) => new FormNestedModel({...options, applicationStore}), props);
    const field = useField({bc, clearValue: CLEAR_VALUE, disabled, hidden, isObject: true, pageStore});
    const parentContext = React.useMemo(
        () => ({
            key: field.key,
            parentFieldKey: field.key,
        }),
        [bc, field],
    );
    const boxBc = React.useMemo(() => ({...bc, type: "BOX.NOCOMMONDECORATOR"} as IBuilderConfig), [bc]);

    useFieldGetGlobal({bc, field, pageStore, store});
    useFieldSetGlobal({bc, field, pageStore, store});
    useDefaultValueQuery({bc, field, pageStore});
    React.useEffect(
        () =>
            reaction(
                () => store.recordsStore.selectedRecord,
                (record) => {
                    field.onChange(record ? record : CLEAR_VALUE);
                    if (bc.setrecordtoglobal) {
                        pageStore.updateGlobalValues({
                            [bc.setrecordtoglobal]: record || null,
                        });
                    }
                },
            ),
        [field, store],
    );

    return (
        <ParentFieldContext.Provider value={parentContext}>
            {mapComponentOne(boxBc, (Child, childBc) => (
                <Child key={childBc.ck_page_object} {...props} bc={childBc} />
            ))}
        </ParentFieldContext.Provider>
    );
};
