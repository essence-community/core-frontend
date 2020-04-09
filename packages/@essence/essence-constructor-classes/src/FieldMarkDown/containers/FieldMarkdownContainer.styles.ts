import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

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
        editor: {
            margin: theme.spacing(1),
        },
        header: {
            backgroundColor: theme.essence.palette.grey.light,
            padding: theme.spacing(0.5, 2, 0, 2),
        },
        preview: {
            margin: theme.spacing(1),
        },
        root: {
            border: `1px solid ${theme.essence.palette.grey.main}`,
            borderRadius: 3,
        },
        selected: {},
    }),
    {name: "FieldMarkdownContainer"},
);
