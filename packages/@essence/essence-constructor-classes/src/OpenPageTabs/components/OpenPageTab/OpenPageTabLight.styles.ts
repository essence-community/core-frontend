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
        textAlign: "start",
    },
    tabIcon: {
        color: theme.essence.palette.common.black,
        fill: theme.essence.palette.common.black,
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
        "& $tabWrapped > *:first-child": {
            marginBottom: 0,
        },
        "& .Mui-activeTabWrapped > *:first-child": {
            marginBottom: 0,
        },
        "&:hover $tabIcon, &:hover $tabIcon::before, &:hover": {
            color: `${theme.palette.secondary.main} !important`,
            fill: `${theme.palette.secondary.main} !important`,
        },
        "&:hover": {
            borderBottom: `2px solid ${theme.palette.secondary.main} !important`,
        },
        "&.Mui-selected $tabIcon, &.Mui-selected $tabIcon::before": {
            color: `${theme.palette.primary.main} !important`,
            fill: `${theme.palette.primary.main} !important`,
        },
        "&.Mui-selected": {
            borderBottom: `2px solid ${theme.palette.secondary.main} !important`,
            color: `${theme.palette.primary.main} !important`,
            fill: `${theme.palette.primary.main} !important`,
        },
        border: `1px solid ${theme.palette.primary.main} !important`,
        padding: "0px !important",
        opacity: 1,
        height: `${theme.essence.sizing.appBarHeight}px !important`,
        minHeight: `${theme.essence.sizing.appBarHeight}px !important`,
        color: `${theme.essence.palette.common.black} !important`,
    },
    verticalTabRoot: {
        width: "100%",
        maxWidth: "100%",
    },
    horizontalTabRoot: {
        width: 160,
    },
    tabWrapped: {
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
