/* eslint-disable sort-keys */
export const styles = () => ({
    downloadBtn: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        height: 30,
        background: "#fff",
        opacity: 0.7,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        visibility: "hidden",
        cursor: "pointer",
    },
    img: {
        maxWidth: "100%",
        maxHeight: "100%",
    },
    container: {
        width: "100%",
        position: "relative",
        "&:hover": {
            "& $downloadBtn": {
                visibility: "visible",
            },
        },
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
    },
    downloadBtnText: {
        paddingLeft: 5,
    },
    zoomImg: {
        position: "absolute",
        height: "100%",
        margin: "auto",
        maxWidth: 10000,
    },
});
/* eslint-enable sort-keys */
