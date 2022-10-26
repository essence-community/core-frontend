/* eslint-disable sort-keys */
/* eslint-disable no-unused-vars */
import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        activeWidget: {
            zIndex: 1,
        },
        draggableHandle: {},
        fullScreen: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100% !important",
            zIndex: 2,
            transform: "none !important",
        },
        item: {
            overflow: "hidden",
        },
        root: {
            "& > .react-grid-item > .react-resizable-handle": {
                zIndex: 10,
            },
        },
    }),
    {
        name: "LayoutPanelContainer",
    },
);
