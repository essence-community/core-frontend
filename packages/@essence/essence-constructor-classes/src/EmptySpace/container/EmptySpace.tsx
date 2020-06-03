import {IClassProps} from "@essence-community/constructor-share/types";
import * as React from "react";

export const EmptySpace: React.FC<IClassProps> = ({bc}) => <div style={{height: bc.height, width: bc.width}} />;
