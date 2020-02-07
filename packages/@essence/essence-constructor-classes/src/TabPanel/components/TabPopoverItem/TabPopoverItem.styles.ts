import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";
import {darkStyles} from "./TabPopoverItem.dark.styles";
import {lightStyles} from "./TabPopoverItem.light.styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        ...(theme.palette.type === "dark" ? darkStyles() : lightStyles()),
        label: {
            fontSize: 13,
            fontWeight: "bold",
            overflow: "hidden",
            padding: theme.spacing(0, 1),
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        root: {
            "&:first-child": {
                borderBottom: "none",
            },
            "&:hover, &:focus": {
                backgroundColor: theme.palette.primary.light,
                outline: "none",
            },
            alignItems: "center",
            backgroundColor: theme.palette.primary.main,
            color: theme.essence.palette.text.light,
            cursor: "pointer",
            display: "flex",
            fill: theme.essence.palette.text.light,
            height: theme.essence.sizing.gridRowHeight,
            maxHeight: theme.essence.sizing.gridRowHeight,
            maxWidth: 500,
            minWidth: 0,
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
    }),
    {
        name: "EssenceTabPanelTabPopoverItem",
    },
);
