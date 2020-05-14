import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        search: {
            "&:focus": {
                backgroundColor: theme.essence.palette.grey.light,
                color: theme.essence.palette.icon.secondary,
            },
            "&:hover": {
                backgroundColor: theme.essence.palette.grey.light,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
            },
            backgroundColor: theme.essence.palette.grey.light,
            border: "1px solid transparent",
            borderRadius: "0 4px 4px 0",
            bottom: 0,
            height: "100%",
            position: "absolute",
            right: 0,
            top: 0,
            width: 50,
        },
    }),
    {name: "EssenceFieldTableInput"},
);
