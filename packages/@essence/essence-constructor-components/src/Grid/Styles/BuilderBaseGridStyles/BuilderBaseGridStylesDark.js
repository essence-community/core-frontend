// @flow
const BuilderBaseGridStylesDark = (theme: any) => ({
    editActionsGrid: {
        backgroundColor: theme.palette.primary.main,
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
    tableActions: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fill: theme.palette.common.white,
        paddingTop: 4,
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
