// @flow
export const HorizontalResizerStyles = (theme: any) => ({
    btn: {
        fontSize: 20,
        fontWeight: 600,
        left: 4,
        position: "absolute",
        transform: "rotate(90deg)",
    },
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
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        cursor: "col-resize",
        display: "flex",
        height: "100%",
        minWidth: 10,
        position: "relative",
        textAlign: "center",
        visibility: "hidden",
        width: 10,
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
