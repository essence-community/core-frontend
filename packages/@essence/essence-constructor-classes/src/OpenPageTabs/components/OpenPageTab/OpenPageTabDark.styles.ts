import {IEssenceTheme} from "@essence-community/constructor-share";
/* eslint-disable sort-keys */
export default (theme: IEssenceTheme) => ({
    text: {
        "&:hover": {
            color: "inherit !important",
        },
        color: "inherit !important",
        fontSize: "15px !important",
        width: 120,
        textTransform: "none !important",
    },
    tabIcon: {
        color: theme.palette.primary.main,
        fill: theme.palette.primary.main,
        fontSize: "20px !important",
        padding: "0 4px",
        width: 32,
        textAlign: "center",
    },
    tabLink: {
        color: "inherit",
        textDecoration: "none",
    },
    tabRoot: {
        "& .Mui-activeTabWrapped > *:first-child": {
            marginBottom: 0,
        },
        "& $tabWrapped > *:first-child": {
            marginBottom: 0,
        },
        "&:hover $tabIcon, &:hover $tabIcon::before, &:hover": {
            color: `${theme.essence.palette.common.white} !important`,
            fill: `${theme.essence.palette.common.white} !important`,
        },
        "&:hover": {
            borderBottom: `2px solid ${theme.essence.palette.common.white} !important`,
        },
        "&.Mui-selected $tabIcon, &.Mui-selected $tabIcon::before": {
            color: `${theme.essence.palette.common.white} !important`,
            fill: `${theme.essence.palette.common.white} !important`,
        },
        "&.Mui-selected": {
            borderBottom: `2px solid ${theme.essence.palette.common.white} !important`,
            color: `${theme.essence.palette.common.white} !important`,
            fill: `${theme.essence.palette.common.white} !important`,
        },
        border: `1px solid ${theme.essence.palette.grey.main} !important`,
        height: `${theme.essence.sizing.appBarHeight}px !important`,
        minHeight: `${theme.essence.sizing.appBarHeight}px !important`,
        opacity: 1,
        padding: 0,
        color: `${theme.palette.primary.main} !important`,
    },
    verticalTabRoot: {
        width: "100%",
    },
    horizontalTabRoot: {
        width: 160,
    },
    tabWrapped: {
        height: "100%",
        flexDirection: "row",
        textTransform: "none",
        color: theme.palette.primary.main,
    },
    activeTab: {
        "& > $tabWrapped > $tabIcon": {
            color: theme.essence.palette.grey.light,
            fill: theme.essence.palette.grey.light,
        },
        "& > $tabWrapped > $tabIcon::before": {
            color: theme.essence.palette.grey.light,
            fill: theme.essence.palette.grey.light,
        },
        "& > $tabWrapped": {
            color: theme.essence.palette.common.white,
        },
        borderBottom: "none",
        backgroundColor: `${theme.palette.primary.main} !important`,
        height: `${theme.essence.sizing.appBarHeight}px !important`,
        minHeight: `${theme.essence.sizing.appBarHeight}px !important`,
        color: `${theme.essence.palette.common.white} !important`,
    },
    activeTabWrapped: {
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
        color: theme.palette.primary.main,
        fill: theme.palette.primary.main,
    },
    activeTabIcon: {
        color: theme.essence.palette.grey.light,
        fill: theme.essence.palette.grey.light,
    },
});
