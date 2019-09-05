// @flow
import {type BuilderBaseType} from "../BuilderType";

export type BuilderFilterType = BuilderBaseType & {
    childs?: Array<BuilderBaseType>,
    dynamicfilter?: string,
    topbtn?: Array<Object>,
};
