import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        backdrop: {
            backgroundColor: "rgba(0,0,0,0.7)",
            bottom: 0,
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: theme.essence.zIndex.backdrop,
        },
        hidden: {},
        paperTopMargin: {
            borderRadius: theme.essence.layoutTheme === 2 ? 4 : undefined,
            marginTop: 20,
        },
        root: {
            "&$hidden": {
                display: "none",
            },
            display: "flex",
            flexGrow: 1,
            height: "100%",
            outline: process.env.NODE_ENV === "production" ? "none" : undefined,
            position: "relative",
        },
        rootDialogContent: {},
        rootDialogWidthMd: {
            "& $rootDialogContent": {
                maxWidth: 900,
                minWidth: 150,
            },
            maxWidth: 1000,
            minWidth: 250,
        },
        rootPageContent: {
            height: "100%",
            minHeight: "100%",
            padding: theme.spacing(2),
            position: "relative",
        },
        rootPageDivContent: {
            height: "100%",
            minHeight: "100%",
        },
    }),
    {name: "PagerContainer"},
);
