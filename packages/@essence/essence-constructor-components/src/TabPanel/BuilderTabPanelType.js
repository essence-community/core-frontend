// @flow
import * as React from "react";
import {type BuilderBaseType} from "../BuilderType";
import {type BuilderPanelType, type BuilderPanelPropsType} from "../Panel/BuilderPanelType";
import {type BuilderHistoryPanelType, type BuilderHistoryPanelPropsType} from "../HistoryPanel/BuilderHistoryPanelType";
import {type BuilderGridType, type BuilderGridPropsType} from "../Grid/BuilderGridType";
import {type PageModelType} from "../stores/PageModel";

export type BuilderTabPanelType = BuilderBaseType & {
    type: "TABPANEL",
    childs?: Array<BuilderPanelType | BuilderHistoryPanelType | BuilderGridType>,
};

export type BuilderTabPanelPropsType = {
    bc: BuilderTabPanelType,
    disabled?: boolean,
    readOnly?: boolean,
    hidden?: boolean,
    visible: boolean,
    pageStore: PageModelType,
    record?: Object,
    elevation?: boolean,
};

export type BuilderTabPanelMapType = {
    BASEPANEL: React.ComponentType<BuilderPanelPropsType>,
    GRID: React.ComponentType<BuilderGridPropsType>,
    HISTORYPANEL: React.ComponentType<BuilderHistoryPanelPropsType>,
    PANEL: React.ComponentType<BuilderPanelPropsType>,
    TREEGRID: React.ComponentType<BuilderGridPropsType>,
};
