// eslint-disable-next-line max-lines-per-function
export const MenuGridRowStyles = (theme) => ({
    chevronRoot: {
        boxSizing: "content-box",
        width: 17,
    },
    favoriteRoot: {
        alignItems: "center",
        bottom: 0,
        display: "none",
        left: 10,
        position: "absolute",
        top: 0,
    },
    favoriteSelected: {
        "&$favoriteRoot": {
            display: "flex",
        },
    },
    folrderRoot: {
        boxSizing: "content-box",
        width: 23,
    },
    iconRoot: {
        "&:empty": {
            display: "block",
        },
        boxSizing: "content-box",
        height: 23,
        textAlign: "center",
        width: 23,
    },
    nameTypography: {
        fontSize: 15,
    },
    root: {
        "&:hover": {
            "& $favoriteRoot": {
                display: "flex",
            },
            backgroundColor: theme.palette.common.selectedMenu,
        },
        color: theme.palette.common.white,
        cursor: "pointer",
        position: "relative",
    },
    rootGrid: {
        marginBottom: 0,
        marginTop: 0,
        minHeight: 42,
        padding: "0 10px",
    },
});
