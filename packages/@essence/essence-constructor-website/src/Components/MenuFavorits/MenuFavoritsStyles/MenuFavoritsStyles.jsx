export const MenuFavoritsStyles = (theme) => ({
    iconRemove: {
        boxSizing: "content-box",
        display: "none",
        height: 23,
        textAlign: "center",
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
    menuContainer: {
        height: 50,
    },
    menuRoot: {
        "&:hover": {
            "& $iconRemove": {
                display: "block",
            },
            "& $iconRoot": {
                display: "none",
            },
            backgroundColor: theme.palette.common.selectedMenu,
        },
        color: theme.palette.common.white,
        cursor: "pointer",
        padding: "0 10px",
    },
    nameTypography: {
        fontSize: 15,
    },
    root: {
        padding: "10px 0",
    },
});
