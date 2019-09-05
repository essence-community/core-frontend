// @flow
import * as React from "react";
import {type BuilderGridType, type BuilderGridPropsType} from "../Grid/BuilderGridType";
import {type BuilderTabPanelType, type BuilderTabPanelPropsType} from "../TabPanel/BuilderTabPanelType";

export type BuilderPageChildType = BuilderGridType | BuilderTabPanelType;

export type BuilderPageType = Array<BuilderPageChildType>;

export type BuilderPageMapType = {
    GRID: React.ComponentType<BuilderGridPropsType>,
    TABPANEL: React.ComponentType<BuilderTabPanelPropsType>,
    TREEGRID: React.ComponentType<BuilderGridPropsType>,
};
