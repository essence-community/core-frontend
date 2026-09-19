import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {makeStyles} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        warning: {
            color: theme.palette.error.main,
            fontSize: "2rem",
            textAlign: "center",
        },
    }),
    {name: "EssenceGridWarning"},
);
