const ThemePanelWrapperStylesDark = (theme) => ({
    actionsBar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fill: theme.palette.common.white,
        paddingTop: 4,
        width: theme.sizing.controlPanelWidth,
    },
    topPanel: {
        backgroundColor: theme.palette.common.white,
        transition: "margin-top 200ms linear 0s",
        zIndex: 2,
    },
});

export default ThemePanelWrapperStylesDark;
