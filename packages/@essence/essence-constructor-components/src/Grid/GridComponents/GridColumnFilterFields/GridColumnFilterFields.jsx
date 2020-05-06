// @flow
import * as React from "react";
import {FormContext} from "@essence-community/constructor-share";
import GCFilterFieldBase from "./GCFilterFieldBase";
import GCFilterFieldDate from "./GCFilterFieldDate";
import {type GCFilterFieldBaseType} from "./GCFilterFieldTypes";

type PropsType = GCFilterFieldBaseType;

const GridColumnFilterFields = (props: $Diff<PropsType, {form?: Object}>) => {
    const formCtx = React.useContext(FormContext);
    const {bc} = props;

    if (bc.datatype === "date") {
        return <GCFilterFieldDate {...props} form={formCtx} />;
    }

    return <GCFilterFieldBase {...props} form={formCtx} />;
};

export default GridColumnFilterFields;
