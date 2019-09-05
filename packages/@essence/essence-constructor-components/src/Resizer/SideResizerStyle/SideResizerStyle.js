// @flow
export const SideResizerStyle = (theme: any) => ({
    btnResizer: {
        marginTop: -10,
        position: "absolute",
        top: "50%",
    },
    sideResizer: {
        backgroundColor: theme.palette.common.white,
        cursor: "col-resize",
        height: "100%",
        position: "relative",
        width: 10,
    },
    textResizer: {
        "&:after": {
            content: "'...'",
            display: "inline-block",
            fontSize: 20,
            fontWeight: 600,
            transform: "rotate(270deg)",
        },
        marginLeft: -8,
    },
});
