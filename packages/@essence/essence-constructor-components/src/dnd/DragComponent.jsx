// @flow

// $FlowFixMe
import * as React from "react";
import {useDrag, useDrop} from "react-dnd";

type CardPropsType = {
    pageId: string,
    pageIndex: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void,
};

type DragItemType = {
    pageIndex: number,
    pageId: string,
    type: string,
};

export const DragComponent: React.FC<CardPropsType> = (props) => {
    const {moveCard, style, pageId, pageIndex, type, children, ...otherProps} = props;

    const ref = React.useRef(null);
    const [, drop] = useDrop({
        accept: type,
        hover(item: DragItemType) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.pageIndex;
            const hoverIndex = props.pageIndex;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveCard(dragIndex, hoverIndex);
            item.pageIndex = hoverIndex;
        },
    });

    const [{isDragging}, drag] = useDrag({
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
            item: monitor.getItem(),
        }),
        item: {pageId, pageIndex, type},
    });
    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <div {...otherProps} ref={ref} style={{...style, opacity}}>
            {children}
        </div>
    );
};
