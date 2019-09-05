// @flow
import * as React from "react";
import {type GridColumnPropsType} from "./GridColumnTypes";

class GridColumnDate extends React.Component<GridColumnPropsType> {
    render() {
        const {value, bc, qtip} = this.props;

        if (value && bc.format && qtip) {
            return qtip;
        }

        return null;
    }
}

export default GridColumnDate;
