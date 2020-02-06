// @flow
const BuilderFilterStylesDark = (theme: any) => ({
    absolute: {
        backgroundColor: "none",
        left: 0,
        position: "absolute",
    },
    filterButtons: {
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        display: "flex",
        fill: theme.palette.common.white,
        flexDirection: "column",
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
