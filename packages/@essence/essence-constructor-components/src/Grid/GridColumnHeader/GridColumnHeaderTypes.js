// @flow
import {type GridModelType} from "../../stores/GridModel";

export type GridColumnPropsType = {|
    bc: Object,
    disabled?: boolean,
    readOnly?: boolean,
    store: GridModelType,
|};
