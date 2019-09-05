// @flow
import * as React from "react";
import PropTypes from "prop-types";
import GCFilterFieldBase from "./GCFilterFieldBase";
import GCFilterFieldDate from "./GCFilterFieldDate";
import {type GCFilterFieldBaseType} from "./GCFilterFieldTypes";

type PropsType = GCFilterFieldBaseType;

const GridColumnFilterFields = (props: $Diff<PropsType, {form?: Object}>, context: {form: Object}) => {
    const {bc} = props;

    if (bc.datatype === "date") {
        return <GCFilterFieldDate {...props} form={context.form} />;
    }

    return <GCFilterFieldBase {...props} form={context.form} />;
};

GridColumnFilterFields.contextTypes = {
    form: PropTypes.object,
};

export default GridColumnFilterFields;
