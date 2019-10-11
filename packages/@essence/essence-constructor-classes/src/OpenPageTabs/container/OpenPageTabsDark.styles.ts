import {IEssenceTheme} from "@essence/essence-constructor-share";
/* eslint-disable sort-keys */
export default (theme: IEssenceTheme) => ({
    scroller: {
        overflow: "hidden",
        height: theme.essence.sizing.appBarHeight,
    },
    tabRoot: {
        "& $activeTabWrapper > *:first-child": {
            marginBottom: 0,
        },
        "& $tabWrapper > *:first-child": {
            marginBottom: 0,
        },
        border: `1px solid ${theme.palette.grey.main}`,
        height: theme.essence.sizing.appBarHeight,
        minHeight: theme.essence.sizing.appBarHeight,
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
