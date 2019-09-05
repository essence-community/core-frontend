const RedirectPageStylesDark = (theme) => ({
    btnContainer: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.grey.light,
        },
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.grey.light,
        float: "right",
        height: 36,
        marginTop: 30,
        width: 105,
    },
    panel: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
        padding: 10,
        width: 455,
    },
    root: {
        boxSizing: "content-box",
        minHeight: `calc(100vh - ${theme.sizing.appbarHeight}px)`,
    },
});

export default RedirectPageStylesDark;
