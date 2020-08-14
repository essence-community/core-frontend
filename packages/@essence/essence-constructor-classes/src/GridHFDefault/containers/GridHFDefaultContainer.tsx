import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {isEmpty} from "@essence-community/constructor-share/utils";
import {IField} from "@essence-community/constructor-share/Form";
import {useObserver} from "mobx-react";
import {mapComponentOne, FormContext} from "@essence-community/constructor-share";

const datatypeOperator = {
    boolean: "eq",
    checkbox: "eq",
    integer: "eq",
    numeric: "eq",
};

function prepareValue(field: IField) {
    const {column, datatype, format} = field.bc;

    if (isEmpty(field.value)) {
        return undefined;
    }

    return {
        datatype,
        format,
        operator: (datatype && datatypeOperator[datatype as keyof typeof datatypeOperator]) || "like",
        property: column,
        value: field.value,
    };
}

export const GridHFDefaultContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const form = React.useContext(FormContext);
    const fieldBc = React.useMemo(
        () => ({
            ...bc,
            type: "IFIELD",
        }),
        [bc],
    );

    React.useMemo(() => {
        // Skip remove value when unmounting in useField
        if (fieldBc.column && !form.select(fieldBc.column)) {
            form.registerField(fieldBc.column, {
                bc: fieldBc,
                output: prepareValue,
                pageStore,
            });
        }
    }, [fieldBc, form, pageStore]);

    return useObserver(() => (
        <>
            {mapComponentOne(fieldBc, (ChildCmp, childBc) => (
                <ChildCmp {...props} bc={childBc} />
            ))}
        </>
    ));
};
