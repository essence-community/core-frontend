// @flow
// eslint-disable-next-line max-lines-per-function
const BuilderBaseGridStylesDark = (theme: any) => ({
    contentRoot: {},
    editActionsGrid: {
        minWidth: theme.sizing.controlPanelWidth,
        paddingTop: 4,
        position: "relative",
        width: theme.sizing.controlPanelWidth,
        zIndex: 3,
    },
    gridColumnFilter: {
        visibility: "hidden",
    },
    pagination: {
        alignItems: "center",
        height: theme.sizing.gridRowHeight,
        justifyContent: "center",
    },
    rootActions: {
        "& $contentRoot": {
            maxWidth: `calc(100% - ${theme.sizing.controlPanelWidth}px)`,
        },
        "&:before": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "4px 0 0 4px",
            bottom: 0,
            // eslint-disable-next-line prettier/prettier
            content: "\"\"",
            left: 0,
            position: "absolute",
            top: 0,
            width: theme.sizing.controlPanelWidth,
        },
    },
    tableActions: {
        alignSelf: "flex-end",
        bottom: 0,
        color: theme.palette.common.white,
        fill: theme.palette.common.white,
        minWidth: theme.sizing.controlPanelWidth,
        paddingTop: 4,
        position: "sticky",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        width: theme.sizing.controlPanelWidth,
    },
    tableBodyItem: {
        backgroundColor: theme.palette.common.white,
        flexBasis: 0,
        transition: "margin-top 200ms linear 0s",
        zIndex: theme.zIndex.grid,
    },
    tableCell: {
        "&:hover": {
            "& $gridColumnFilter": {
                visibility: "visible",
            },
        },
        "&:last-child": {
            paddingRight: 0,
        },
        "&:not(:last-child)": {
            borderRight: `1px solid ${theme.palette.grey.arrow}`,
        },
        fontSize: 16,
        overflow: "hidden",
        padding: 0,
    },
    tableCellContent: {
        display: "flex",
        height: "100%",
    },
    tableHead: {
        backgroundColor: theme.palette.primary.field,
        height: theme.sizing.gridRowHeight,
        width: "100%",
    },
    tableHeadResizer: {
        cursor: "col-resize",
        height: theme.sizing.gridRowHeight,
        width: 4,
    },
    tableSortLabel: {
        "&$activeSortLabel": {
            color: theme.palette.common.white,
        },
        "&:focus": {
            color: theme.palette.common.white,
        },
        "&:hover": {
            color: theme.palette.common.white,
        },
        color: theme.palette.grey.light,
        flexGrow: 1,
        overflow: "hidden",
        paddingLeft: 12,
    },
});

export default BuilderBaseGridStylesDark;
