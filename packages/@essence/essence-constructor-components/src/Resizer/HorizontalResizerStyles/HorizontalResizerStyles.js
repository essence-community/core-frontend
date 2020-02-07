// @flow
// eslint-disable-next-line max-lines-per-function
export const HorizontalResizerStyles = (theme: any) => ({
    childrenContainer: {
        "&$containerHide": {
            display: "none",
        },
        overflow: "hidden",
        width: "calc(100% - 10px)",
    },
    collapsedRoot: {
        "&:hover": {
            backgroundColor: theme.essence.palette.grey.main,
        },
        alignItems: "center",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
    },
    containerHide: {
        display: "none",
    },
    dottedLine: {
        borderRight: `2px dashed ${theme.essence.palette.grey.main}`,
        bottom: 0,
        left: 200,
        position: "absolute",
        top: 0,
        zIndex: 2000,
    },
    resizeContainer: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
    },
    resizer: {
        "&:before": {
            backgroundColor: theme.essence.palette.grey.main,
            bottom: 0,
            // eslint-disable-next-line quotes
            content: '""',
            left: 4,
            position: "absolute",
            top: 0,
            width: 2,
        },
        alignItems: "center",
        backgroundColor: theme.essence.palette.common.white,
        cursor: "none",
        display: "flex",
        height: "100%",
        minWidth: 10,
        padding: "0 4.5px",
        position: "relative",
        textAlign: "center",
        // Visibility: "hidden",
        width: 10,
    },
    resizerIcon: {
        position: "absolute",
    },
    resizerLineCollapsed: {
        backgroundColor: theme.essence.palette.grey.main,
        cursor: "none",
        height: "100%",
        width: 2,
    },
    resizerRootCollapsed: {},
    resizerRootIcon: {
        "&$resizerRootCollapsed": {
            // 35 / 2
            width: 17.5,
        },
        height: 35,
        overflow: "hidden",
        pointerEvents: "none",
        position: "fixed",
        transform: "translate(-50%, -50%)",
        transition: "transform 0.2s ease",
        width: 35,
        zIndex: 2100,
    },
    resizerRootIconDown: {
        transform: "translate(-50%, -50%) scaleX(0.5)",
    },
    resizerRootLeft: {
        "&$resizerRootCollapsed": {
            "& $resizerIcon": {
                right: "25%",
            },
        },
    },
    resizerRootRight: {},
    resizerWrapper: {
        "&:hover": {
            "& $resizer": {
                visibility: "visible",
            },
        },
    },
    show: {
        visibility: "visible",
    },
});
