// @flow
import * as React from "react";
import FieldCurrency from "../FieldCurrency/FieldCurrency";

const FieldInteger = (props: any) => <FieldCurrency {...props} bc={{...props.bc, decimalprecision: "0"}} />;

export default FieldInteger;
