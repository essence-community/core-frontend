// @flow
import {type BuilderBaseType} from "../BuilderType";
import {type BuilderFieldType} from "../TextField/BuilderFieldType";

export type BuilderFieldSetType = BuilderBaseType & {
    column?: string,
    datatype?: string,
    childs?: Array<BuilderFieldType | BuilderFieldSetType>,
};
