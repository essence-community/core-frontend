/* eslint-disable sort-keys */
export default (theme: any) => ({
    scroller: {
        overflow: "hidden",
        height: theme.sizing.appbarHeight,
    },
    tabRoot: {
        "& $activeTabWrapper > *:first-child": {
            marginBottom: 0,
        },
        "& $tabWrapper > *:first-child": {
            marginBottom: 0,
        },
        border: `1px solid ${theme.palette.grey.main}`,
        height: theme.sizing.appbarHeight,
        minHeight: theme.sizing.appbarHeight,
        padding: 0,
    },
    tabsFlexContainer: {
        height: "100%",
        width: "100%",
    },
    tabsRoot: {
        backgroundColor: theme.palette.grey.light,
        flexGrow: 1,
    },
});
