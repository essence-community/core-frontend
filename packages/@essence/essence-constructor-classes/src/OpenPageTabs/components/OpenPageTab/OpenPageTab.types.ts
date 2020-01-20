import {TabProps} from "@material-ui/core/Tab";

export type IOpenTabProps = TabProps & {
    value: string;
    pageIndex: number;
    iconfont?: string;
    label?: string;
    orientation: "horizontal" | "vertical";
    selected?: boolean;
    onDragStartIndex: (index: number) => void;
    onDragEnterIndex: (index: number) => void;
    onClose?: (value: string) => void;
    onContextMenuCustom: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => void;
};
