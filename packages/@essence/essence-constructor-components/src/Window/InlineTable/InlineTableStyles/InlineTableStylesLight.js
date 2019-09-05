// @flow
export const InlineTableStylesLight = (theme: any) => ({
    hidden: {
        display: "none",
    },
    inlineRoot: {
        height: theme.sizing.gridRowHeight,
        position: "absolute",
        width: "100%",
        zIndex: theme.zIndex.modal,
    },
    inlineTable: {
        tableLayout: "fixed",
    },
    tableCell: {
        "&:last-child": {
            paddingRight: 4,
        },
        border: "none",
        padding: 0,
        paddingLeft: 4,
        paddingRight: 4,
    },
    tableRow: {
        height: theme.sizing.gridRowHeight,
    },
});
