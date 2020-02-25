// @flow
const BuilderFilterStylesDark = (theme: any) => ({
    filterButtons: {
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        display: "flex",
        fill: theme.palette.common.white,
        flexDirection: "column",
        width: theme.sizing.controlPanelWidth,
    },
    filterButtonsAbsolute: {
        backgroundColor: "none",
        left: 0,
        position: "absolute",
    },
    filterButtonsContainer: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    hidden: {
        display: "none",
    },
    maxWidth: {
        maxWidth: "100%",
    },
    titleTypography: {
        fontSize: 30,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
});

export default BuilderFilterStylesDark;
