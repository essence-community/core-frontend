/* eslint-disable sort-keys */
// eslint-disable-next-line max-lines-per-function
export const StyleRoadMapBase = (theme) => ({
    verticalTabRootTheme: {
        backgroundColor: "transparent",
        textAlign: "left",
    },
    textNum: {
        marginRight: 20,
    },
    cycleNum: {
        display: "inline-block",
        textAlign: "center",
        borderRadius: "50%",
        fontSize: 20,
        marginRight: 16,
        width: 36,
        height: 36,
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
            opacity: 0.5,
        },
        "& $leftSideTab": {
            opacity: 0.5,
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
        position: "absolute",
    },
    "$rightSideTab::after": {
        content: "",
        width: 0,
        height: 0,
        border: "17px solid transparent",
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
        transform: "rotate(270deg)",
    },
    "$leftSideTab::after": {
        content: "",
        width: 0,
        height: 0,
        border: "17px solid transparent",
        borderTopColor: "transparent",
        display: "inline-block",
    },
    rightSideTabTheme: {
        "&&": {
            borderTopColor: theme.palette.primary.main,
        },
    },
    leftSideTabTheme: {
        "&&": {
            borderRightColor: theme.palette.primary.main,
            borderLeftColor: theme.palette.primary.main,
            borderBottomColor: theme.palette.primary.main,
        },
    },
    selectedTab: {
        opacity: 0.8,
    },
    activeTabRoot: {
        "& $cycleNum": {
            color: theme.palette.common.selectedMenu,
        },
        "& $horizontalTabRootTheme $label": {
            color: theme.palette.common.selectedMenu,
        },
    },
    bottomBar: {
        "& .MuiButtonBase-root": {
            boxShadow: "none",
        },
        height: 48,
        overflow: "hidden",
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
    verticalLabelText: {
        verticalAlign: "text-bottom",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textTransform: "none",
    },
    horizontalLabelText: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textTransform: "none",
    },
    horizontalTabRootTheme: {
        textAlign: "left",
        width: "100%",
    },
    horizontalContainerTab: {
        marginRight: 40,
    },
});
/* eslint-enable sort-keys */
