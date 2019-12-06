import {IEssenceTheme} from "@essence/essence-constructor-share";
/* eslint-disable sort-keys */
export default (theme: IEssenceTheme) => ({
    scroller: {
        overflow: "hidden",
        height: theme.essence.sizing.appBarHeight,
    },
    tabsFlexContainer: {
        borderRight: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        height: "100%",
        width: "100%",
    },
    tabsRoot: {
        backgroundColor: theme.palette.grey.light,
        minHeight: "inherit",
    },
});
