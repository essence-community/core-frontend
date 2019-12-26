// @flow
import {SCROLL_WEIGHT} from "../../../constants";

// eslint-disable-next-line max-lines-per-function
const BuilderBaseGridStyles = (theme: Object) => ({
    activeSortLabel: {},
    "align-center": {
        justifyContent: "center",
    },
    "align-right": {
        justifyContent: "flex-end",
    },
    autoHeihtBody: {
        height: "calc(100% - 44px)",
    },
    editableTable: {
        zIndex: 3,
    },
    fullHeight: {
        height: "100%",
    },
    gridOverflow: {
        overflow: "auto",
    },
    headerItem: {
        flexGrow: 0,
    },
    headerScroll: {
        overflow: "hidden",
    },
    inlineButton: {},
    mainButton: {},
    tableBody: {
        display: "flex",
        height: "100%",
        position: "relative",
    },
    tableBodyRoot: {
        marginBottom: SCROLL_WEIGHT - 2,
        tableLayout: "fixed",
    },
    tableCellEllipsis: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    tableContainerRoot: {
        flexGrow: 1,
    },
    tableHeadButton: {},
    tableHeader: {
        tableLayout: "fixed",
    },
    tableRoot: {},
    timesButton: {},
    warning: {
        color: theme.palette.error.main,
        fontSize: "2rem",
        textAlign: "center",
    },
});

export default BuilderBaseGridStyles;
