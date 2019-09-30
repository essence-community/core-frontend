/* eslint-disable sort-keys */
export const StyleRoadMapLight = (theme) => ({
    themeLabel: {
        "& $cycleNum": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
    },
    horizontalTabRootTheme: {
        backgroundColor: theme.palette.primary.main,
    },
    tabLabelContainer: {
        fontSize: 13,
        fontWeight: "bold",
        padding: "0 16px",
        textTransform: "none",
        width: "100%",
    },
});
/* eslint-enable sort-keys */
