import * as React from "react";

export interface ICardPropsType {
    pageId: string;
    pageIndex: number;
    style: React.CSSProperties;
    type: string;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export interface IDragItemType {
    pageIndex: number;
    pageId: string;
    type: string;
}
