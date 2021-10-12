import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";
import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        mask: {
            backgroundColor: theme.essence.palette.common.disabled,
            height: "100%",
            opacity: 0.5,
            position: "absolute",
            width: "100%",
        },
    }),
    {name: "GridInlineContainer"},
);
