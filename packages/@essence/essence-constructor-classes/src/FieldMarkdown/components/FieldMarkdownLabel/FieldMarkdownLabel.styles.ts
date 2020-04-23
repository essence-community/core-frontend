import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        button: {
            "&$selected": {
                backgroundColor: theme.palette.common.white,
            },
            borderRadius: "3px 3px 0 0",
            cursor: "pointer",
            padding: theme.spacing(0.5, 2),
        },
        header: {
            backgroundColor: theme.essence.palette.grey.light,
            padding: theme.spacing(0.5, 2, 0, 2),
        },
        labelAsterisk: {
            color: theme.palette.error.main,
        },
        selected: {},
    }),
    {name: "FieldMarkdownLabel"},
);
