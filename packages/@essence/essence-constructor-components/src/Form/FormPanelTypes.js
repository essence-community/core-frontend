// @flow

import {type BuilderBaseType} from "../BuilderType";
import {type PageModelType} from "../stores/PageModel";

export type FormPanelType = BuilderBaseType & {
    childs: Array<BuilderBaseType>,
};

export type PropsType = {
    bc: FormPanelType,
    disabled: boolean,
    pageStore: PageModelType,
    visible: boolean,
    parentBc?: BuilderBaseType,
    readOnly: boolean,
    updateglobal: string,
};

export type StateType = {
    initialValues: mixed,
};
