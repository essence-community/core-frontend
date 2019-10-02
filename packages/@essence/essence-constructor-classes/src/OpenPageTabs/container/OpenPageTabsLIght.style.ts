// tslint:disable: object-literal-sort-keys
export const OpenPageTabsLight = (theme: any) => ({
    scroller: {
        overflow: "hidden",
        height: theme.sizing.appbarHeight,
    },
    text: {
        fontSize: 15,
        width: 120,
    },
    tabIcon: {
        color: theme.palette.secondary.main,
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
        border: `1px solid ${theme.palette.primary.main}`,
        padding: 0,
        height: theme.sizing.appbarHeight,
        minHeight: theme.sizing.appbarHeight,
    },
    verticalTabRoot: {
        width: "100%",
        maxWidth: "100%",
    },
    horizontalTabRoot: {
        width: 160,
    },
    tabWrapper: {
        flexDirection: "row",
        textTransform: "none",
    },
    tabsFlexContainer: {
        borderRight: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        height: "100%",
        width: "100%",
    },
    tabsRoot: {
        backgroundColor: theme.palette.grey.light,
        flexGrow: 1,
    },
    activeTab: {
        backgroundColor: theme.palette.common.white,
        height: theme.sizing.appbarHeight,
        borderBottom: `2px solid ${theme.palette.common.white}`,
    },
    activeTabWrapper: {
        flexDirection: "row",
        textTransform: "none",
    },
    activeCloseIcon: {
        top: 2,
        right: 2,
        position: "absolute",
        color: theme.palette.primary.main,
    },
    closeIcon: {
        top: 2,
        right: 2,
        position: "absolute",
        color: theme.palette.primary.main,
    },
    activeTabIcon: {
        color: theme.palette.secondary.main,
    },
});