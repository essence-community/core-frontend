/* eslint-disable sort-keys */
export const StyleRoadMapBase = (theme) => ({
    verticalTabRootTheme: {
        backgroundColor: "transparent",
    },
    textNum: {
        marginRight: 20,
    },
    cycleNum: {
        display: "inline-block",
        textAlign: "center",
        borderRadius: "50%",
        padding: "0.1px 0",
        fontSize: 24,
        marginRight: 20,
        width: 40,
        height: 40,
    },
    verticalTextNum: {
        backgroundColor: "transparent",
    },
    fullWidth: {
        width: "100%",
    },
    horizontalTabsRoot: {
        height: 34,
        minHeight: 34,
    },
    horizontalTabRoot: {
        height: 34,
        minHeight: 34,
    },
    label: {
        display: "inline-block",
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontWeight: "bold",
        textTransform: "none",
        fontSize: 15,
    },
    horizontalLabel: {
        color: theme.palette.common.white,
    },
    verticalLabel: {
        color: theme.palette.common.dark,
    },
    disabled: {
        "& $rightSideTab": {
            opacity: 0.4,
        },
        "& $leftSideTab": {
            opacity: 0.4,
        },
        "& $horizontalTabRootTheme $label": {
            color: theme.palette.common.white,
        },
    },
    textColorInherit: {
        opacity: "1",
    },
    rightSideTab: {
        width: 0,
        height: 0,
        border: "17px solid transparent",
        margin: 0,
        padding: 0,
        float: "right",
        transform: "rotate(270deg)",
    },
    "$rightSideTab::after": {
        content: "",
        width: 0,
        height: 0,
        border: "17px solid !transparent",
        borderTopColor: "transparent",
        display: "inline-block",
    },
    leftSideTab: {
        width: 0,
        height: 0,
        border: "17px solid transparent",
        margin: 0,
        padding: 0,
        float: "left",
        marginLeft: -26,
        transform: "rotate(270deg)",
    },
    "$leftSideTab::after": {
        content: "",
        width: 0,
        height: 0,
        border: "17px solid !transparent",
        borderTopColor: "transparent",
        display: "inline-block",
    },
    selectedTab: {
        opacity: 0.8,
    },
    activeTabRoot: {
        "& $cycleNum": {
            color: `${theme.palette.common.selectedMenu} !important`,
        },
        "& $horizontalTabRootTheme $label": {
            color: `${theme.palette.common.selectedMenu} !important`,
        },
    },
    bottomBar: {
        borderTop: `1px solid ${theme.palette.grey.main}`,
        height: 48,
        overflow: "hidden",
    },
});
/* eslint-enable sort-keys */
