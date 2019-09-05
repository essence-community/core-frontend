const BuilderPanelEditingButtonsStylesDark = (theme) => ({
    cancelButton: {
        "&:hover": {
            backgroundColor: theme.palette.common.white,
        },
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
    },
    editModeLabel: {
        color: theme.palette.common.white,
        width: 15,
        wordWrap: "break-word",
    },
});

export default BuilderPanelEditingButtonsStylesDark;
