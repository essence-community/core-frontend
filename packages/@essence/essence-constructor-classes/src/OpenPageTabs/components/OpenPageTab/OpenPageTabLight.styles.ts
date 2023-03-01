import {IEssenceTheme} from "@essence-community/constructor-share";
/* eslint-disable sort-keys */
export default (theme: IEssenceTheme) => ({
    text: {
        color: theme.essence.palette.common.black,
        fontSize: 15,
        width: 120,
    },
    tabIcon: {
        color: theme.palette.secondary.main,
        fill: theme.palette.secondary.main,
        fontSize: 20,
        padding: "0 4px",
        width: 32,
        textAlign: "center",
    },
    tabLink: {
        color: "inherit",
        textDecoration: "none",
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
        opacity: 1,
        height: theme.essence.sizing.appBarHeight,
        minHeight: theme.essence.sizing.appBarHeight,
    },
    verticalTabRoot: {
        width: "100%",
        maxWidth: "100%",
    },
    horizontalTabRoot: {
        width: 160,
    },
    tabWrapper: {
        height: "100%",
        flexDirection: "row",
        textTransform: "none",
    },
    activeTab: {
        backgroundColor: theme.essence.palette.common.white,
        height: theme.essence.sizing.appBarHeight,
        borderBottom: `2px solid ${theme.essence.palette.common.white}`,
    },
    activeTabWrapper: {
        height: "100%",
        flexDirection: "row",
        textTransform: "none",
    },
    activeCloseIcon: {
        top: 0,
        right: 0,
        position: "absolute",
        color: theme.palette.primary.main,
        fill: theme.palette.primary.main,
    },
    closeIcon: {
        top: 0,
        right: 0,
        position: "absolute",
        color: theme.palette.primary.main,
        fill: theme.palette.primary.main,
    },
    activeTabIcon: {
        color: theme.palette.secondary.main,
        fill: theme.palette.secondary.main,
    },
});
