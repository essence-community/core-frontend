// @flow
const TooltipStyles = (theme: Object) => ({
    tooltipBackdrop: {
        backgroundColor: "transparent",
        height: "100%",
        left: 0,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: theme.zIndex.tooltip - 1,
    },
    tooltipContent: {
        backgroundColor: "#e4e7f0",
        borderRadius: 5,
        boxShadow: theme.shadows["8"],
        color: theme.palette.common.black,
        hyphens: "auto",
        maxWidth: 340,
        overflow: "hidden",
        overflowWrap: "break-word",
        padding: 8,
        pointerEvents: "auto",
        position: "fixed",
        textOverflow: "ellipsis",
        wordBreak: "keep-all",
        wordWrap: "break-word",
        zIndex: theme.zIndex.tooltip,
    },
    tooltipRoot: {},
});

export default TooltipStyles;
