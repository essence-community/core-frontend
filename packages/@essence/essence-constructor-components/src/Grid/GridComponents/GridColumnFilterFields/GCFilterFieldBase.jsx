// @flow
import * as React from "react";
import {observer, useObserver} from "mobx-react";
import {useField} from "@essence-community/constructor-share/Form";
import {isEmpty} from "../../../utils/base";
import BuilderField from "../../../TextField/BuilderField";
import {parseValue} from "../../../TextField/TFUtils/TFParseValue";
import {type GCFilterFieldBaseType} from "./GCFilterFieldTypes";

const datatypeOperator = {
    boolean: "eq",
    checkbox: "eq",
    integer: "eq",
    numeric: "eq",
};

const GCFilterFieldBase: React.FC<GCFilterFieldBaseType> = (props) => {
    const {bc, pageStore, renderPopover} = props;
    const prepareValue = React.useCallback((field) => {
        const {column, datatype, format} = field.bc;

        if (isEmpty(field.value)) {
            return undefined;
        }

        const cleanValue = parseValue(field.value, field.bc);

        return {
            datatype,
            format,
            operator: datatypeOperator[datatype] || "like",
            property: column,
            value: cleanValue,
        };
    }, []);
    const field = useField({
        bc,
        output: prepareValue,
        pageStore,
    });

    return useObserver(() => {
        const fieldContent = <BuilderField {...props} autoremove={false} />;

        return renderPopover({fieldContent, isFilled: !isEmpty(field.value)});
    });
};

export default observer(GCFilterFieldBase);
