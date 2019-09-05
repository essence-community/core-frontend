// @flow
export const InlineTableStylesDark = (theme: any) => ({
    hidden: {
        display: "none",
    },
    inlineRoot: {
        height: theme.sizing.gridRowHeight,
        position: "absolute",
        zIndex: theme.zIndex.modal,
    },
    inlineTable: {
        tableLayout: "fixed",
    },
    tableCell: {
        "&:first-of-type": {
            border: "none",
        },
        "&:last-child": {
            borderRight: "none",
            paddingRight: 4,
        },
        border: "none",
        borderRight: `1px solid ${theme.palette.grey.arrow}`,
        padding: 0,
        paddingLeft: 4,
        paddingRight: 4,
        width: "calc(100% - 1px)",
    },
    tableRow: {
        height: theme.sizing.gridRowHeight,
    },
});
