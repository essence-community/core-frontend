import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        content: {
            backgroundColor: theme.palette.type === "dark" ? theme.palette.common.white : undefined,
            paddingBottom: 8,
            paddingLeft: 32,
            paddingRight: 44,
            paddingTop: 8,
        },
    }),
    {
        name: "EssenceGridDetail",
    },
);
