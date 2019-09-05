const SearchTextFieldStyles = (theme) => ({
    clear: {
        bottom: 0,
        height: theme.sizing.gridRowHeight,
        position: "absolute",
        right: 50,
        top: 0,
        visibility: "hidden",
        width: theme.sizing.gridRowHeight,
        zIndex: 1,
    },
    inputFocused: {
        borderColor: theme.palette.primary.main,
    },
    labelRoot: {
        cursor: "pointer",
    },
    search: {
        "&:focus": {
            backgroundColor: theme.palette.grey.light,
            color: theme.palette.icon.secondary,
        },
        "&:hover": {
            backgroundColor: theme.palette.grey.light,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
        },
        backgroundColor: theme.palette.grey.light,
        border: "1px solid transparent",
        borderRadius: "0 4px 4px 0",
        bottom: 0,
        height: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        width: 50,
    },
    textFieldRoot: {
        "&:hover": {
            "& $clear": {
                visibility: "visible",
            },
        },
        cursor: "pointer",
    },
});

export default SearchTextFieldStyles;
