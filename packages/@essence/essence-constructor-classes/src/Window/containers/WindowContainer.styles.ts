import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        addMoreLabelColor:
            theme.palette.type === "dark"
                ? {
                      color: theme.palette.common.white,
                  }
                : {
                      color: theme.palette.text.primary,
                  },
        "align-left": {
            justifyContent: "flex-start",
        },
        "align-right": {
            justifyContent: "flex-end",
        },
        container: {
            alignItems: "center",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            outline: 0,
        },
        content: {},
        contentScrollableParent: {
            display: "flex",
        },
        dialogButtonActions: {},
        focusable: {
            width: "100%",
        },
        form: {},
        iconColor:
            theme.palette.type === "dark"
                ? {
                      color: theme.palette.common.white,
                  }
                : {
                      color: theme.essence.palette.primary.field,
                  },
        paper: {
            width: "calc(100% - 64px)",
        },
        paperFullScreen: {
            "& $contentScrollableParent": {
                margin: 0,
                maxWidth: "100%",
            },
            "& $focusable": {
                display: "flex",
                flexDirection: "column",
                height: "100%",
            },
            "& $form": {
                height: "100%",
            },
            borderRadius: 0,
            height: "100%",
            margin: 0,
            maxHeight: "none",
            maxWidth: "100%",
            width: "100%",
        },
        "winsize-base": {
            maxWidth: 800,
        },
        "winsize-default": {
            maxWidth: 800,
        },
        "winsize-fullscreen": {
            "& $contentScrollableParent": {
                flexGrow: 1,
            },

            "& $dialogButtonActions": {
                justifyContent: "center",
            },
        },
        "winsize-narrow": {
            maxWidth: 500,
        },
        "winsize-wide": {
            maxWidth: 1000,
        },
        "winsize-xlwide": {
            maxWidth: 1600,
        },
        "winsize-xwide": {
            maxWidth: 1200,
        },
    }),
    {name: "EssenceWindowContainer"},
);
