// @flow

export const BuilderIframeStyles = (theme: any) => ({
    disabled: {
        height: "100%",
        position: "absolute",
        width: "100%",
    },
    iframe: {
        border: "none",
        width: "100%",
    },
    loaderContainer: {
        alignItems: "center",
        background: theme.palette.grey.backgroundInput,
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
    },
    root: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        position: "relative",
    },
});

export default BuilderIframeStyles;
