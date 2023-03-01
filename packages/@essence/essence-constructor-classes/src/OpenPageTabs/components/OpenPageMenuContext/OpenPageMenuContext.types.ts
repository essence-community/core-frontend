import {IPageModel} from "@essence-community/constructor-share/types";
import {IPagesModel} from "@essence-community/constructor-share/types/PagesModel";

export interface IPopoverPosition {
    left: number;
    top: number;
}

export interface IOpenPageMenuContextProps {
    open: boolean;
    position: IPopoverPosition;
    value?: IPageModel;
    pagesStore: IPagesModel;
    onCloseMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onClose: (value: string) => void;
}
