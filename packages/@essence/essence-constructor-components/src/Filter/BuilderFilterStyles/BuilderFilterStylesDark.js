// @flow
const BuilderFilterStylesDark = (theme: any) => ({
    filterButtons: {
        alignItems: "center",
        color: theme.palette.common.white,
        display: "flex",
        fill: theme.palette.common.white,
        flexDirection: "column",
        left: 0,
        position: "absolute",
        width: theme.sizing.controlPanelWidth,
    },
    filterButtonsContainer: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    hidden: {
        display: "none",
    },
    titleTypography: {
        fontSize: 30,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
});

export default BuilderFilterStylesDark;
