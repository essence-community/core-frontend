import {IEssenceTheme} from "@essence-community/constructor-share";
/* eslint-disable sort-keys */
export default (theme: IEssenceTheme) => ({
    text: {
        fontSize: 15,
        width: 120,
    },
    tabIcon: {
        color: theme.palette.primary.main,
        fill: theme.palette.primary.main,
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
        "& $activeTabWrapper > *:first-child": {
            marginBottom: 0,
        },
        "& $tabWrapper > *:first-child": {
            marginBottom: 0,
        },
        border: `1px solid ${theme.essence.palette.grey.main}`,
        height: theme.essence.sizing.appBarHeight,
        opacity: 1,
        minHeight: theme.essence.sizing.appBarHeight,
        padding: 0,
    },
    verticalTabRoot: {
        width: "100%",
    },
    horizontalTabRoot: {
        width: 160,
    },
    tabWrapper: {
        height: "100%",
        flexDirection: "row",
        textTransform: "none",
        color: theme.palette.primary.main,
    },
    activeTab: {
        "& > $tabWrapper > $tabIcon": {
            color: theme.essence.palette.grey.light,
            fill: theme.essence.palette.grey.light,
        },
        "& > $tabWrapper > $tabIcon::before": {
            color: theme.essence.palette.grey.light,
            fill: theme.essence.palette.grey.light,
        },
        "& > $tabWrapper": {
            color: theme.essence.palette.common.white,
        },
        borderBottom: "none",
        backgroundColor: theme.palette.primary.main,
        height: theme.essence.sizing.appBarHeight,
        color: theme.essence.palette.common.white,
    },
    activeTabWrapper: {
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        flexDirection: "row",
        textTransform: "none",
        color: theme.essence.palette.common.white,
    },
    activeCloseIcon: {
        top: 0,
        right: 0,
        position: "absolute",
        color: theme.essence.palette.grey.light,
        fill: theme.essence.palette.grey.light,
    },
    closeIcon: {
        top: 0,
        right: 0,
        position: "absolute",
        color: theme.essence.palette.grey.light,
        fill: theme.essence.palette.grey.light,
    },
    activeTabIcon: {
        color: theme.essence.palette.grey.light,
        fill: theme.essence.palette.grey.light,
    },
});
