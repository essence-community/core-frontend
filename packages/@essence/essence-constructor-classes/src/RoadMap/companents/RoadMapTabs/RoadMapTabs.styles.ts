/* eslint-disable sort-keys */
/* eslint-disable max-lines-per-function */
import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        activeTabRoot: {
            "& $cycleNum": {
                color: theme.essence.palette.common.selectedMenu,
            },
            "& $horizontalTabRootTheme $label": {
                color: theme.essence.palette.common.selectedMenu,
            },
        },
        rightSideTab: {
            width: 0,
            height: 0,
            border: "17px solid transparent",
            margin: 0,
            padding: 0,
            float: "right",
            transform: "rotate(270deg)",
            position: "absolute",
        },
        "$rightSideTab::after": {
            content: "",
            width: 0,
            height: 0,
            border: "17px solid transparent",
            borderTopColor: "transparent",
            display: "inline-block",
        },
        leftSideTab: {
            width: 0,
            height: 0,
            border: "17px solid transparent",
            margin: 0,
            padding: 0,
            float: "left",
            transform: "rotate(270deg)",
        },
        "$leftSideTab::after": {
            content: "",
            width: 0,
            height: 0,
            border: "17px solid transparent",
            borderTopColor: "transparent",
            display: "inline-block",
        },
        rightSideTabTheme: {
            "&&": {
                borderTopColor: theme.palette.primary.main,
            },
        },
        leftSideTabTheme: {
            "&&": {
                borderRightColor: theme.palette.primary.main,
                borderLeftColor: theme.palette.primary.main,
                borderBottomColor: theme.palette.primary.main,
            },
        },
        selectedTab: {
            opacity: 0.8,
        },
        tabWrapper: {
            width: "100%",
        },
        textNum: {
            marginRight: 20,
        },
        textColorInherit: {
            opacity: "1",
        },
        disabled: {
            "& $rightSideTab": {
                opacity: 0.5,
            },
            "& $leftSideTab": {
                opacity: 0.5,
            },
            "& $horizontalTabRootTheme $label": {
                color: theme.palette.common.white,
            },
        },
        cycleNum: {
            display: "inline-block",
            textAlign: "center",
            borderRadius: "50%",
            fontSize: 20,
            marginRight: 16,
            width: 36,
            height: 36,
        },
        fullWidth: {
            width: "100%",
            zIndex: 3,
        },
        tabsContainer: {
            outline: "none",
        },
        tabsIndicator: {
            height: 0,
        },
        horizontalTabsRoot: {
            height: 34,
            minHeight: 34,
        },
        horizontalTabRoot: {
            height: 34,
            minHeight: 34,
        },
        verticalTabRootTheme: {
            backgroundColor: "transparent",
            textAlign: "left",
        },
        horizontalTabRootTheme: {
            backgroundColor: theme.palette.primary.main,
            textAlign: "left",
            width: "100%",
        },
        horizontalContainerTab: {
            marginRight: 40,
        },
        label: {
            display: "inline-block",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: 15,
        },
        horizontalLabel: {
            color: theme.palette.common.white,
        },
        verticalLabel: {
            color: theme.essence.palette.common.black,
        },
        verticalLabelText: {
            verticalAlign: "text-bottom",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textTransform: "none",
        },
        horizontalLabelText: {
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textTransform: "none",
        },
        themeLabel: {
            "& $cycleNum": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
            },
        },
        tabLabelContainer: {
            fontSize: 13,
            fontWeight: "bold",
            padding: "0 16px",
            textTransform: "none",
            width: "100%",
        },
    }),
    {name: "EssenceRoadMapTabs"},
);
