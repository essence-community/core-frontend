import {TabProps} from "@material-ui/core/Tab";
import {ReactNode} from "react";

export type IOpenTabProps = TabProps & {
    value: string;
    iconfont?: string;
    label?: string;
    orientation: "horizontal" | "vertical";
    selected?: boolean;
    component?: ReactNode;
    onClose?: (value: string) => void;
    onContextMenuCustom: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => void;
};
