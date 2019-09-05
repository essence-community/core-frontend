export const FileRecordStyles = (theme) => ({
    adornment: {
        height: 30,
        width: 50,
        zIndex: 100,
    },
    clearButton: {
        height: theme.sizing.gridRowHeight,
        visibility: "hidden",
        width: theme.sizing.gridRowHeight,
    },
    formLabelRoot: {
        display: "flex",
    },
    inputRoot: {
        "&:hover": {
            "& $clearButton": {
                visibility: "visible",
            },
        },
    },
    srinkedDocLabel: {
        paddingLeft: 46,
    },
});
