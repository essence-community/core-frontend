/* eslint-disable sort-keys */
export const StyleTabPanelLight = (theme) => ({
    fullWidth: {
        width: "100%",
    },
    tabsRoot: {
        display: "block",
        minHeight: 38,
        marginBottom: -5,
    },
    tabRoot: {
        borderTop: `1px solid ${theme.palette.secondary.main}`,
        borderRight: `1px solid ${theme.palette.secondary.main}`,
        borderTopRightRadius: 6,
        flexShrink: 1,
        height: 36,
        minHeight: 36,
        marginRight: 15,
        minWidth: 70,
        transform: "skewX(30deg)",
        transformOrigin: "top",
        "&:hover": {
            background: "#e9ecf4",
        },
    },
    activeTabRoot: {
        borderTop: `2px solid ${theme.palette.secondary.main}`,
        borderRight: `2px solid ${theme.palette.secondary.main}`,
        backgroundColor: "#fff0e1",
    },
    tabWrapper: {
        transform: "skewX(-30deg)",
        width: "100%",

        fontSize: 13,
        fontWeight: "bold",
        padding: "0 4px",
        textTransform: "none",

        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
    },
    tabsFlexContainer: {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
    },
    tabsIndicator: {
        height: 0,
    },
    selectedTabRoot: {
        "&$tabRoot": {
            background: "#e9ecf4",
        },
    },
    tabsContainer: {
        outline: "none",
    },
    slimTabs: {
        flexWrap: "wrap-reverse",
    },
    slimTab: {
        maxWidth: 70,
    },
});
/* eslint-enable sort-keys */
