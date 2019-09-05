// @flow
import {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import {type BuilderBaseType} from "../BuilderType";
import {type PageModelType} from "../stores/PageModel";
import {type IframeModelType} from "../stores/IframeModel";

export type PropsType = CommonDecoratorInjectType & {
    bc: BuilderBaseType,
    classes: Object,
    pageStore: PageModelType,
    store: IframeModelType,
};

export type DecoratorPropsType = CommonDecoratorInjectType & {
    bc: BuilderBaseType,
    pageStore: PageModelType,
    store: IframeModelType,
};
