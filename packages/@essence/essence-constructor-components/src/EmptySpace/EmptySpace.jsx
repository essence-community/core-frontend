// @flow
import * as React from "react";
import {setComponent, toSize} from "@essence-community/constructor-share";
import commonDecorator, {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import {type BuilderBaseType} from "../BuilderType";

type PropsType = CommonDecoratorInjectType & {
    bc: BuilderBaseType,
};

const BaseEmptySpace = ({bc, hidden}: PropsType) =>
    hidden ? null : <div style={{height: bc.height ? toSize(bc.height) : undefined, width: bc.width}} />;

const EmptySpace = commonDecorator(BaseEmptySpace);

setComponent("EMPTY_SPACE", EmptySpace);

export default EmptySpace;
