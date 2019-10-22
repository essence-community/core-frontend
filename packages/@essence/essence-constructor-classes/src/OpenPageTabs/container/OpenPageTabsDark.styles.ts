import {IEssenceTheme} from "@essence/essence-constructor-share";
/* eslint-disable sort-keys */
export default (theme: IEssenceTheme) => ({
    scroller: {
        overflow: "hidden",
        height: theme.essence.sizing.appBarHeight,
    },
    tabsFlexContainer: {
        height: "100%",
        width: "100%",
    },
    tabsRoot: {
        backgroundColor: theme.palette.grey.light,
        minHeight: "inherit",
    },
});
