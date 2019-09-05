// @flow
import {type BuilderBaseType} from "../BuilderType";
import {type WindowModelType} from "../stores/WindowModel";
import {type PageModelType} from "../stores/PageModel";

export type BuilderWindowType = BuilderBaseType & {
    columns: Array<Object>,
    childs: Array<Object>,
    ckParent: string,
    ckwindow: string,
    title?: string,
    wintype?: string,
    bottombtn?: Array<Object>,
    detail?: Array<Object>,
    minheight?: string,
    maxheight?: string,
    height?: string,
    stepnamenext?: string,
};

export type BuilderWindowPropsType = {
    store: WindowModelType,
    pageStore: PageModelType,
    classes: Object,
    theme?: Object,
    visible: boolean,
};
