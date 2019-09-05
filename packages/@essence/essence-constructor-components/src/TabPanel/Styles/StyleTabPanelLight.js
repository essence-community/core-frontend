/* eslint-disable sort-keys */
export const StyleTabPanelLight = {
    fullWidth: {
        width: "100%",
    },
    tabsRoot: {
        minHeight: "auto",
    },
    tabRoot: {
        borderTop: "1px solid #f78f1e",
        borderRight: "1px solid #f78f1e",
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
        borderTop: "2px solid #f78f1e",
        borderRight: "2px solid #f78f1e",
        backgroundColor: "#fff0e1",
    },
    label: {
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
    },
    tabLabel: {
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
    },
    tabLabelContainer: {
        fontSize: 13,
        fontWeight: "bold",
        padding: "0 16px",
        textTransform: "none",
        width: "100%",
    },
    tabWrapper: {
        transform: "skewX(-30deg)",
        width: "100%",
    },
    tabsFlexContainer: {
        borderBottom: "1px solid #f78f1e",
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
};
/* eslint-enable sort-keys */
