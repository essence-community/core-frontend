import {IClassProps} from "@essence-community/constructor-share/types";
import * as React from "react";
import {toSize} from "@essence-community/constructor-share/utils/transform";

export const EmptySpace: React.FC<IClassProps> = ({bc}) => (
    <div style={{height: toSize(bc.height), width: toSize(bc.width)}} />
);
