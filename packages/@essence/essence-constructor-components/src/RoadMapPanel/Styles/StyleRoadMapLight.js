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
    rightSideTabTheme: {
        borderTopColor: `${theme.palette.primary.main} !important`,
    },
    leftSideTabTheme: {
        borderRightColor: `${theme.palette.primary.main} !important`,
        borderLeftColor: `${theme.palette.primary.main} !important`,
        borderBottomColor: `${theme.palette.primary.main} !important`,
    },
    tabLabelContainer: {
        fontSize: 13,
        fontWeight: "bold",
        padding: "0 16px",
        textTransform: "none",
        width: "100%",
    },
    tabWrapper: {
        // Transform: "skewX(-30deg)",
        width: "100%",
    },
    tabsIndicator: {
        height: 0,
    },
    tabsContainer: {
        outline: "none",
    },
});
/* eslint-enable sort-keys */
