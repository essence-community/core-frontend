import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        "color-primary": {
            border: `1 px solid ${theme.palette.primary.main}`,
        },
        "color-secondary": {
            border: `1 px solid ${theme.palette.primary.main}`,
        },
    }),
    {
        name: "EssenceExampleBox",
    },
);
