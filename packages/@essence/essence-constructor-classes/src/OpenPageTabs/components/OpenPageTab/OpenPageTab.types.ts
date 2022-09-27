import {TabProps} from "@material-ui/core/Tab";

export interface IDragPos {
    posX: number;
    posY: number;
}

export type IOpenTabProps = TabProps & {
    value: string;
    route?: Record<string, any>;
    pageIndex: number;
    iconfont?: string;
    label?: string;
    orientation: "horizontal" | "vertical";
    selected?: boolean;
    tabDragClassName: string;
    titleRoutePath: string;
    onDragStartIndex: (index: number, dragPos: IDragPos, element: HTMLDivElement | null) => void;
    onDragEnterIndex: (index: number) => void;
    onClose?: (value: string) => void;
    onContextMenuCustom: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => void;
};
