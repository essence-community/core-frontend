// @flow
import * as React from "react";
import {setComponent} from "@essence/essence-constructor-share";
import commonDecorator, {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import {type BuilderBaseType} from "../BuilderType";

type PropsType = CommonDecoratorInjectType & {
    bc: BuilderBaseType,
};

const BaseEmptySpace = ({bc, hidden}: PropsType) => (hidden ? null : <div style={{width: bc.width}} />);

const EmptySpace = commonDecorator(BaseEmptySpace);

setComponent("EMPTY_SPACE", EmptySpace);

export default EmptySpace;
