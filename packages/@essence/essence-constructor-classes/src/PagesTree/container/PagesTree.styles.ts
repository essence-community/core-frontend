import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        "uitype-1": {
            backgroundColor: theme.palette.primary.main,
        },
        "uitype-3": {},
    }),
    {name: "EssencePagesTree"},
);
