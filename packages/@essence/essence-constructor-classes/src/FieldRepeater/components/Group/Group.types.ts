import * as React from "react";
import {IBuilderConfig, IClassProps} from "@essence/essence-constructor-share";

export interface IGroupProps {
    error: boolean;
    isRow: boolean;
    bc: IBuilderConfig;
    status?: React.ReactNode;
    renderComponent?: (ChildComp: React.ComponentType<IClassProps>, bc: IBuilderConfig) => React.ReactNode;
}
