const EmptyTitleStylesDark = (theme) => ({
    titleButtons: {
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        display: "flex",
        fill: theme.palette.common.white,
        flexDirection: "column",
        width: theme.sizing.controlPanelWidth,
    },
    titleButtonsSlim: {
        width: 3,
    },
    titleTypography: {
        fontSize: 30,
        paddingLeft: theme.spacing.unit,
    },
});

export default EmptyTitleStylesDark;
