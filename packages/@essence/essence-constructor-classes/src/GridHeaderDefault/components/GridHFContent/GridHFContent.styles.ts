import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        content: {
            alignItems: "center",
            display: "flex",
            padding: theme.spacing(0.5),
        },
        contentSearch: {
            color: theme.essence.palette.primary.field,
            paddingRight: theme.spacing(1),
        },
    }),
    {name: "EssenceGridHFContent"},
);
