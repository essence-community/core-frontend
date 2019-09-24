// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {CircularProgress} from "@material-ui/core";
import {type FieldMultuStoreType} from "./FieldMultiTypes";

type PropsType = {
    className: string,
    store: FieldMultuStoreType,
};

const FieldMultiLoader = ({className, store}: PropsType) =>
    store.isLoading ? (
        <div className={className}>
            <CircularProgress />
        </div>
    ) : null;

export default observer(FieldMultiLoader);
