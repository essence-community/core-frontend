import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        disabled: {
            height: "100%",
            position: "absolute",
            width: "100%",
        },
        loaderContainer: {
            alignItems: "center",
            background: theme.essence.palette.grey.backgroundInput,
            display: "flex",
            height: "100%",
            justifyContent: "center",
            width: "100%",
        },
        root: {
            alignItems: "center",
            backgroundColor: "inherit",
            display: "flex",
            justifyContent: "center",
            position: "relative",
        },
    }),
    {
        name: "EssenceIframeContainer",
    },
);
