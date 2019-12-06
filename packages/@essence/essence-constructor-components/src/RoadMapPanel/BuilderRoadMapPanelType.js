// @flow
import * as React from "react";
import {type BuilderBaseType} from "../BuilderType";
import {type BuilderPanelType, type BuilderPanelPropsType} from "../Panel/BuilderPanelType";
import {type PageModelType} from "../stores/PageModel";

export type BuilderRoadMapPanelType = BuilderBaseType & {
    type: "ROADMAPPANEL",
    align: "left" | "top" | "right",
    childs?: Array<BuilderPanelType>,
};

export type BuilderRoadMapPanelPropsType = {
    bc: BuilderRoadMapPanelType,
    disabled?: boolean,
    readOnly?: boolean,
    hidden?: boolean,
    visible: boolean,
    pageStore: PageModelType,
    record?: Object,
    elevation?: boolean,
};

export type BuilderRoadMapPanelMapType = {
    PANEL: React.ComponentType<BuilderPanelPropsType>,
};
