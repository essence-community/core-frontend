import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        content: {
            width: "100%",
        },
        paper: {
            backgroundColor: theme.palette.primary.main,
            overflow: "visible",
            padding: theme.spacing(1),
            width: 600,
        },
    }),
    {name: "EssenceFieldMultiContainer"},
);
