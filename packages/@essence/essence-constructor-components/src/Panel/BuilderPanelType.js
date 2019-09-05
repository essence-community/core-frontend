// @flow
import * as React from "react";
import {type BuilderBaseType} from "../BuilderType";
import {type PageModelType} from "../stores/PageModel";

export type BuilderPanelType = BuilderBaseType & {
    editmodepanel?: boolean,
    contentview?: "hbox" | "vbox",
    collapsible?: "true" | "false",
    childs?: Array<Object>,
    filters?: Array<Object>,
    topbtn?: Array<Object>,
    spacing?: 0 | 8 | 16 | 24 | 32 | 40,
    resizable?: "true" | "false",
};

export type BuilderPanelPropsType = {
    actions?: React.Node,
    childRef?: Function,
    bc: BuilderPanelType,
    record?: Object,
    direction?: "column" | "row",
    editing?: boolean,
    disabled?: boolean,
    hidden?: boolean,
    visible: boolean,
    readOnly?: boolean,
    elevation?: number,
    hideTitle?: boolean,
    pageStore: PageModelType,
    tabIndex?: string,
    classNameRoot?: string,
    topPanel?: boolean,
    onExpand?: () => void,
};

export type PanelAdditionalPropsType = {
    onExpand?: () => void,
    elevation?: number,
};
