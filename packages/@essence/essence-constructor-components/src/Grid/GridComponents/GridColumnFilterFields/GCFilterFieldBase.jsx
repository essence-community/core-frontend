// @flow
import * as React from "react";
import camelCase from "lodash/camelCase";
import uniqueId from "lodash/uniqueId";
import {observer} from "mobx-react";
import {isEmpty} from "../../../utils/base";
import BuilderField from "../../../TextField/BuilderField";
import {parseValue} from "../../../TextField/TFUtils/TFParseValue";
import {type GCFilterFieldBaseType} from "./GCFilterFieldTypes";

type PropsType = GCFilterFieldBaseType;

const datatypeOperator = {
    boolean: "eq",
    checkbox: "eq",
    integer: "eq",
    numeric: "eq",
};

class GCFilterFieldBase extends React.Component<PropsType> {
    column: string;

    constructor(...args: Array<*>) {
        super(...args);

        const {form, bc} = this.props;

        this.column = camelCase(bc.column) || uniqueId("GCFilterFieldBase");

        form.add({
            key: this.column,
            options: {
                bc,
                output: this.prepareValue,
            },
        });
    }

    prepareValue = (value: any) => {
        const {bc} = this.props;
        const {column, datatype, format} = bc;

        if (isEmpty(value)) {
            return undefined;
        }

        const cleanValue = parseValue(value, bc);

        return {
            datatype,
            format,
            operator: datatypeOperator[datatype] || "like",
            property: column,
            value: cleanValue,
        };
    };

    render() {
        const {renderPopover, form} = this.props;
        const fieldContent = <BuilderField {...this.props} autoremove={false} />;
        const isFilled = form.has(this.column) && !isEmpty(form.$(this.column).get("value"));

        return renderPopover({fieldContent, isFilled});
    }
}

export default observer(GCFilterFieldBase);
