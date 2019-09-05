// @flow
import {type GridBuilderType} from "../stores/GridModel";

export type BuilderGridType = GridBuilderType;

export type BuilderGridPropsType = {
    bc: BuilderGridType,
    onDoubleClick?: () => void,
};
