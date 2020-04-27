export const FileRecordStyles = () => ({
    adornment: {
        height: 30,
        width: 50,
        zIndex: 100,
    },
    clearButton: {
        visibility: "hidden",
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
