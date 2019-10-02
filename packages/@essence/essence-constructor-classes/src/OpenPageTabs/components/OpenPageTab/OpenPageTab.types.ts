import { TabProps } from "@material-ui/core/Tab";
import {ReactNode} from "react";

export type IOpenTabProps = TabProps & {
    classes: Record<string, string>,
    value: string,
    iconfont?: string,
    label?: string,
    selected?: boolean,
    component?: ReactNode,
    onClose?: (value: string) => void,
    onContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => void,
};