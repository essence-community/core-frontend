import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useFieldGetGlobal, useFieldSetGlobal, useDefaultValueQuery} from "@essence-community/constructor-share/hooks";

export const FIeldHiddenContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const field = useField(props);

    useFieldGetGlobal({bc, field, pageStore});
    useFieldSetGlobal({bc, field, pageStore});
    useDefaultValueQuery({bc, field, pageStore});

    return null;
};
