import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {Layout, ReactGridLayoutProps} from "react-grid-layout";

export interface ILayout extends Layout {
    extra?: string;
    isCollapsible?: boolean;
    isFullScreen?: boolean;
}

export interface IChildBuilderConfig extends IBuilderConfig {
    layoutcomponentconfig?: ILayout;
}

export interface IReactGridLayoutProps extends ReactGridLayoutProps {
    extra?: string;
    isCollapsible?: boolean;
    isFullScreen?: boolean;
}

export interface IBuilderClassConfig extends IBuilderConfig {
    layoutpanelconfig?: IReactGridLayoutProps;
    childs?: IChildBuilderConfig[];
    isstate?: boolean;
    // Служебный параметр не править
    type: "LAYOUT_GRID_PANEL";
}
