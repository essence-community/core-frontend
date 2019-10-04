export interface IPopoverPosition {
    left: number;
    top: number;
}

export interface IOpenPageMenuContextProps {
    open: boolean;
    position: IPopoverPosition;
    value?: string;
    pagesStore: any;
    onCloseMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onClose: (value: string) => void;
}
