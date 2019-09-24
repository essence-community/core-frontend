// @flow

/* eslint-disable sort-keys */
export const StyleToolBarDark = (theme: any) => ({
    activeButton: {
        color: theme.palette.common.selectedMenu,
    },
    badgeRoot: {
        top: 12,
        right: 12,
    },
    button: {
        "& $activeButton": {
            color: theme.palette.common.selectedMenu,
        },
        height: theme.sizing.appbarHeight,
        width: theme.sizing.appbarHeight,
        minWidth: theme.sizing.appbarHeight,
    },
    menuMarksDrawer: {
        marginTop: theme.sizing.appbarHeight,
        width: 42,
        backgroundColor: theme.palette.primary.main,
        boxShadow: "none",
        alignItems: "center",
        paddingTop: 8,
    },
    closeIcon: {
        top: 2,
        right: 2,
        position: "absolute",
        color: theme.palette.primary.main,
    },
    menuGridDrawer: {
        marginTop: theme.sizing.appbarHeight,
        width: 300,
        backgroundColor: theme.palette.primary.main,
        boxShadow: "none",
        height: `calc(100vh - ${theme.sizing.appbarHeight}px)`,
        overflowX: "hidden",
    },
    divider: {
        backgroundColor: theme.palette.common.white,
        height: 26,
        width: 1,
    },
    drawerBody: {
        height: "100%",
    },
    drawerBodyChildren: {
        height: "100%",
        width: "calc(100% - 10px)",
    },
    icon: {
        color: theme.palette.common.white,
    },
    indicator: {
        backgroundColor: theme.palette.transparent.main,
    },
    scroller: {
        overflow: "hidden",
        height: theme.sizing.appbarHeight,
    },
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
        borderLeft: `1px solid ${theme.palette.grey.main}`,
        borderBottom: `1px solid ${theme.palette.grey.main}`,
        height: theme.sizing.appbarHeight,
        padding: 0,
        minHeight: theme.sizing.appbarHeight,
        width: 160,
    },
    tabWrapper: {
        flexDirection: "row",
        textTransform: "none",
        color: theme.palette.primary.main,
    },
    tabsFlexContainer: {
        height: theme.sizing.appbarHeight,
    },
    tabsRoot: {
        backgroundColor: theme.palette.grey.light,
        flexGrow: 1,
        height: theme.sizing.appbarHeight,
        minHeight: theme.sizing.appbarHeight,
    },
    toolbar: {
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: theme.sizing.appbarHeight,
        minHeight: theme.sizing.appbarHeight,
        padding: 0,
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
    activeTabIcon: {
        color: theme.palette.grey.light,
    },
    popoverPaper: {
        width: 430,
    },
});
