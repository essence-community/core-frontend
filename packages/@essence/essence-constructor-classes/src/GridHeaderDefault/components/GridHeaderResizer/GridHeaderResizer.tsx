import * as React from "react";
import {IBuilderConfig, IStoreBaseModel} from "@essence-community/constructor-share/types";
import {TABLE_CELL_MIN_WIDTH} from "../../constants";
import {useStyles} from "./GridHeaderResizer.styles";

interface IGridHeaderResizerProps {
    ckPageObject: string;
    store: IStoreBaseModel;
    bc: IBuilderConfig;
}

export const GridHeaderResizer: React.FC<IGridHeaderResizerProps> = (props) => {
    const {ckPageObject, store, bc} = props;
    const classes = useStyles();
    const state = React.useRef({
        colWidth: TABLE_CELL_MIN_WIDTH,
        startOffset: 0,
    });
    const handleMouseMove = React.useCallback(
        (event: MouseEvent) => {
            if (state.current.colWidth && state.current.startOffset) {
                const newWidth = state.current.startOffset + event.pageX;
                const maxWidth = bc.maxwidth && bc.maxwidth.indexOf("px") > -1 ? parseInt(bc.maxwidth, 10) : null;
                const minWidth = bc.minwidth && bc.minwidth.indexOf("px") > -1 ? parseInt(bc.minwidth, 10) : null;

                if (maxWidth && newWidth > maxWidth) {
                    (store as any).setColumnsWidth(ckPageObject, maxWidth);
                } else if (minWidth && newWidth < minWidth) {
                    (store as any).setColumnsWidth(ckPageObject, minWidth);
                } else {
                    (store as any).setColumnsWidth(ckPageObject, newWidth);
                }
            }
        },
        [ckPageObject, bc, store],
    );
    const handleMouseUp = React.useCallback(() => {
        state.current.startOffset = 0;
        state.current.colWidth = TABLE_CELL_MIN_WIDTH;
        document.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);
    const onMouseDown = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            const columnsWidth = (store as any).columnsWidth.get(ckPageObject);
            const maxWidth = bc.maxwidth && bc.maxwidth.indexOf("px") > -1 ? parseInt(bc.maxwidth, 10) : null;
            const minWidth = bc.minwidth && bc.minwidth.indexOf("px") > -1 ? parseInt(bc.minwidth, 10) : null;

            state.current.colWidth = Number(
                columnsWidth && typeof columnsWidth === "number"
                    ? columnsWidth
                    : event.currentTarget?.parentElement?.parentElement?.offsetWidth ?? TABLE_CELL_MIN_WIDTH,
            );

            if (maxWidth && maxWidth < state.current.colWidth) {
                (store as any).setColumnsWidth(ckPageObject, maxWidth);
                state.current.colWidth = maxWidth;
            }

            if (minWidth && minWidth > state.current.colWidth) {
                (store as any).setColumnsWidth(ckPageObject, minWidth);
                state.current.colWidth = minWidth;
            }

            state.current.startOffset = Number(state.current.colWidth) - event.pageX;

            event.preventDefault();
            event.stopPropagation();

            document.addEventListener("mousemove", handleMouseMove);

            document.addEventListener("mouseup", handleMouseUp);
        },
        [ckPageObject, handleMouseMove, handleMouseUp, store, bc],
    );

    React.useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return <div className={classes.tableHeadResizer} onMouseDown={onMouseDown} />;
};
