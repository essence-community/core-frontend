

// tslint:disable: object-literal-sort-keys
export const OpenPageTabsDark = (theme: any) => ({
    text: {
        fontSize: 15,
        width: 120,
    },
    tabIcon: {
        color: theme.palette.primary.main,
        fontSize: 20,
        padding: "0 4px",
        width: 32,
        textAlign: "center",
    },
    tabRoot: {
        "& $tabWrapper > *:first-child": {
            marginBottom: 0,
        },
        "& $activeTabWrapper > *:first-child": {
            marginBottom: 0,
        },
        border: `1px solid ${theme.palette.grey.main}`,
        padding: 0,
        height: theme.sizing.appbarHeight,
        minHeight: theme.sizing.appbarHeight,
    },
    verticalTabRoot: {
        width: "100%",
    },
    horizontalTabRoot: {
        width: 160,
    },
    tabWrapper: {
        flexDirection: "row",
        textTransform: "none",
        color: theme.palette.primary.main,
    },
    tabsFlexContainer: {
        height: "100%",
        width: "100%",
    },
    tabsRoot: {
        backgroundColor: theme.palette.grey.light,
        flexGrow: 1,
    },
    activeTab: {
        borderBottom: "none",
        backgroundColor: theme.palette.primary.main,
        height: theme.sizing.appbarHeight,
    },
    activeTabWrapper: {
        flexDirection: "row",
        textTransform: "none",
        color: theme.palette.grey.light,
    },
    activeCloseIcon: {
        top: 2,
        right: 2,
        position: "absolute",
        color: theme.palette.grey.light,
    },
    closeIcon: {
        top: 2,
        right: 2,
        position: "absolute",
        color: theme.palette.primary.main,
    },
    activeTabIcon: {
        color: theme.palette.grey.light,
    },
});