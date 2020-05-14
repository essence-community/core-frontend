import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {isEmpty} from "@essence-community/constructor-share/utils";
import {IField, useField} from "@essence-community/constructor-share/Form";
import {useObserver} from "mobx-react-lite";
import {mapComponentOne} from "@essence-community/constructor-share";

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
    const fieldBc = React.useMemo(
        () => ({
            ...bc,
            type: "IFIELD",
        }),
        [bc],
    );

    useField({
        bc,
        output: prepareValue,
        pageStore,
    });

    return useObserver(() => (
        <>
            {mapComponentOne(fieldBc, (ChildCmp, childBc) => (
                <ChildCmp {...props} bc={childBc} />
            ))}
        </>
    ));
};
