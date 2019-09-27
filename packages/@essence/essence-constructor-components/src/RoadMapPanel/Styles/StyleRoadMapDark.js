/* eslint-disable sort-keys */
export const StyleRoadMapDark = (theme) => ({
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
    tabWrapper: {
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
