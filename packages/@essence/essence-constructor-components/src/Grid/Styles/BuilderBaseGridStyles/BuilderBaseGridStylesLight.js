// @flow
const BuilderBaseGridStylesLight = (theme: any) => ({
    editActionsGrid: {
        backgroundColor: theme.palette.common.white,
        height: 48,
        padding: "6px 4px",
        position: "relative",
        zIndex: 3,
    },
    gridColumnFilter: {
        visibility: "hidden",
    },
    pagination: {
        justifyContent: "flex-end",
    },
    tableActions: {
        color: theme.palette.primary.main,
        fill: theme.palette.primary.main,
        minHeight: 48,
        padding: "6px 4px",
        position: "inherit",
    },

    tableBodyItem: {
        backgroundColor: theme.palette.common.white,
    },
    tableCell: {
        "&:hover": {
            "& $gridColumnFilter": {
                visibility: "visible",
            },
            backgroundColor: theme.palette.grey.light,
        },
        "&:last-child": {
            paddingRight: 0,
        },
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderTop: `1px solid ${theme.palette.primary.main}`,
        fontSize: 16,
        height: theme.sizing.gridRowHeight,
        padding: 0,
    },
    tableCellActive: {
        backgroundColor: theme.palette.grey.light,
    },
    tableCellContent: {
        display: "flex",
        height: "100%",
    },
    tableHead: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderTop: `1px solid ${theme.palette.primary.main}`,
        width: "100%",
    },
    tableHeadButton: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    tableHeadResizer: {
        cursor: "col-resize",
        height: theme.sizing.gridRowHeight,
        width: 4,
    },
    tableRoot: {
        maxHeight: 250,
    },
    tableRow: {
        backgroundColor: theme.palette.common.white,
        height: theme.sizing.gridRowHeight,
    },
    tableSortLabel: {
        flexGrow: 1,
        overflow: "hidden",
        paddingLeft: 12,
    },
});

export default BuilderBaseGridStylesLight;
