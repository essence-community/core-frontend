// @flow
export const VerticalResizerStyles = (theme: any) => ({
    btn: {
        fontSize: 20,
        fontWeight: 600,
        left: "50%",
        lineHeight: "8px",
        position: "absolute",
        top: -6,
        transform: "translateX(-50%)",
    },
    line: {
        borderTop: `2px dashed ${theme.palette.primary.main}`,
        position: "fixed",
        zIndex: 2000,
    },
    resizer: {
        backgroundColor: theme.palette.common.white,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderTop: `1px solid ${theme.palette.primary.main}`,
        cursor: "row-resize",
        height: 10,
        position: "relative",
        textAlign: "center",
        width: "100%",
    },
});
