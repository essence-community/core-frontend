export const BuilderFormPanelStylesDark = (theme) => ({
    contentRoot: {},
    formActions: {
        alignSelf: "flex-end",
        bottom: 0,
        color: theme.palette.common.white,
        fill: theme.palette.common.white,
        minWidth: theme.sizing.controlPanelWidth,
        paddingTop: 4,
        position: "sticky",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        width: theme.sizing.controlPanelWidth,
    },
    root: {},
    rootActions: {
        "& $contentRoot": {
            maxWidth: `calc(100% -${theme.sizing.controlPanelWidth}px)`,
        },
        "&:before": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "4px 0 0 4px",
            bottom: 0,
            // eslint-disable-next-line prettier/prettier
            content: "\"\"",
            left: 0,
            position: "absolute",
            top: 0,
            width: theme.sizing.controlPanelWidth,
        },
    },
});
