// @flow
export const InlineButtonsStylesDark = (theme: Object) => ({
    cancelButton: {
        "&:hover": {
            backgroundColor: theme.palette.common.white,
        },
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        minWidth: 42,
    },
    label: {
        color: theme.palette.common.white,
        width: 15,
        wordWrap: "break-word",
    },
    saveButton: {
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        minWidth: 42,
    },
});
