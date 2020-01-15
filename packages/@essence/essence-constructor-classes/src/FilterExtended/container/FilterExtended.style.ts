import {makeStyles} from "@material-ui/core/styles";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        content: {
            border: `1px solid ${theme.essence.palette.grey.main}`,
            borderRadius: "0 0 3px 3px",
            borderTopColor: "transparent",
            padding: theme.spacing(1),
            paddingTop: 0,
        },
        header: {
            color: theme.palette.text.primary,
            cursor: "pointer",
            height: theme.essence.sizing.gridRowHeight,
        },
        headerClose: {
            height: 1,
        },
        headerLeft: {
            borderLeft: `1px solid ${theme.essence.palette.grey.main}`,
            borderRadius: "3px 0 0 0",
            borderTop: `1px solid ${theme.essence.palette.grey.main}`,
            margin: "10px 5px -10px 0",
        },
        headerRight: {
            borderRadius: "0 3px 0 0",
            borderRight: `1px solid ${theme.essence.palette.grey.main}`,
            borderTop: `1px solid ${theme.essence.palette.grey.main}`,
            margin: "10px 0 -10px 5px",
        },
        iconClear: {
            "&:hover": {
                color: theme.palette.primary.main,
            },
            color: theme.essence.palette.icon.secondary,
        },
        topLine: {
            borderTop: `1px solid ${theme.essence.palette.grey.main}`,
            margin: "10px 5px -10px 5px",
        },
    }),
    {name: "EssenceFilterExtended"},
);
