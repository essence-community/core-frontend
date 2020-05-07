import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";
import {darkStyles} from "./TabPopoverItem.dark.styles";
import {lightStyles} from "./TabPopoverItem.light.styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        disabled: {},
        hidden: {},
        label: {
            fontSize: 13,
            overflow: "hidden",
            padding: theme.spacing(0, 1),
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        rootDefault: {
            "&$disabled": {
                opacity: 0.5,
            },
            "&$hidden": {
                display: "none",
            },
            alignItems: "center",
            cursor: "pointer",
            display: "flex",
            height: theme.essence.sizing.gridRowHeight,
            maxHeight: theme.essence.sizing.gridRowHeight,
            maxWidth: 500,
            minWidth: 0,
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
        ...(theme.palette.type === "dark" ? darkStyles(theme) : lightStyles(theme)),
    }),
    {
        name: "EssenceTabPanelTabPopoverItem",
    },
);
