// @flow
export const HorizontalResizerStyles = (theme: any) => ({
    childrenContainer: {
        width: "calc(100% - 10px)",
    },
    resizeContainer: {
        display: "flex",
        flexDirection: "row",
    },
    resizer: {
        alignItems: "center",
        backgroundColor: theme.palette.common.white,
        borderLeft: `1px solid ${theme.essence.palette.grey.main}`,
        borderRight: `1px solid ${theme.essence.palette.grey.main}`,
        cursor: "none",
        display: "flex",
        height: "100%",
        minWidth: 10,
        position: "relative",
        textAlign: "center",
        visibility: "hidden",
        width: 10,
    },
    resizerIcon: {
        pointerEvents: "none",
        position: "fixed",
        transform: "translate(-50%, -50%)",
        transition: "transform 0.2s ease",
        zIndex: 2100,
    },
    resizerIconDown: {
        transform: "translate(-50%, -50%) scaleX(0.5)",
    },
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
