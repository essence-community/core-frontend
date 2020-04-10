import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        editor: {
            margin: theme.spacing(1),
        },
        error: {},
        inputWrapper: {
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
        },
        label: {
            "&$error": {
                color: theme.palette.error.main,
            },
        },
        preview: {
            margin: theme.spacing(1),
            position: "relative",
        },
        resizer: {
            "&::after": {
                borderLeft: `2px solid ${theme.essence.palette.grey.main}`,
                bottom: 0,
                // eslint-disable-next-line quotes
                content: '""',
                left: 0,
                position: "absolute",
                right: 0,
                top: 2,
            },
            "&::before": {
                borderLeft: `2px solid ${theme.essence.palette.grey.main}`,
                bottom: 0,
                // eslint-disable-next-line quotes
                content: '""',
                left: 6,
                position: "absolute",
                right: 0,
                top: 0,
            },
            backgroundColor: "transparent",
            border: "none",
            bottom: 0,
            height: 16,
            position: "absolute",
            right: -10,
            transform: "skew(-45deg)",
            width: 16,
            zIndex: 2,
        },
        resizerWrapper: {
            bottom: 0,
            height: 16,
            overflow: "hidden",
            position: "absolute",
            right: 0,
            width: 16,
        },
        root: {
            "&$error": {
                borderColor: theme.palette.error.main,
            },
            border: `1px solid ${theme.essence.palette.grey.main}`,
            borderRadius: 3,
            position: "relative",
        },
        scrollContent: {
            display: "flex",
            height: "100%",
            padding: theme.spacing(1, 0),
        },
    }),
    {name: "FieldMarkdownContainer"},
);
