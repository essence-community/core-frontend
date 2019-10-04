export interface ICardPropsType {
    pageId: string;
    pageIndex: number;
    style: Record<string, number | string>;
    type: string;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export interface IDragItemType {
    pageIndex: number;
    pageId: string;
    type: string;
}
