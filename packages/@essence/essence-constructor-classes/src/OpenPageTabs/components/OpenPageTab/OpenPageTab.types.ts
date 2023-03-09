import {TabProps} from "@material-ui/core/Tab";
import {IPageModel} from "@essence-community/constructor-share/types";
import {IPagesModel} from "@essence-community/constructor-share/types/PagesModel";

export interface IDragPos {
    posX: number;
    posY: number;
}

export type IOpenTabProps = TabProps & {
    value: IPageModel;
    route?: Record<string, any>;
    pagesStore: IPagesModel;
    pageIndex: number;
    orientation: "horizontal" | "vertical";
    selected?: boolean;
    tabDragClassName: string;
    titleRoutePath: string;
    onDragStartIndex: (index: number, dragPos: IDragPos, element: HTMLDivElement | null) => void;
    onDragEnterIndex: (index: number) => void;
    onClose?: (value: string) => void;
    onContextMenuCustom: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: IPageModel) => void;
};
