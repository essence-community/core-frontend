// @flow
import * as React from "react";
import {EditorContex} from "@essence/essence-constructor-share";
import GCFilterFieldBase from "./GCFilterFieldBase";
import GCFilterFieldDate from "./GCFilterFieldDate";
import {type GCFilterFieldBaseType} from "./GCFilterFieldTypes";

type PropsType = GCFilterFieldBaseType;

const GridColumnFilterFields = (props: $Diff<PropsType, {form?: Object}>) => {
    // $FlowFixMe
    const editor = React.useContext(EditorContex);
    const {bc} = props;

    if (bc.datatype === "date") {
        return <GCFilterFieldDate {...props} form={editor.form} />;
    }

    return <GCFilterFieldBase {...props} form={editor.form} />;
};

export default GridColumnFilterFields;
