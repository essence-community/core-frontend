/* eslint-disable sort-keys */
import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        disabled: {
            display: "flex",
            zIndex: 1,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.paper,
            "-webkit-tap-highlight-color": "transparent",
            opacity: 0.5,
            width: "100%",
            height: "100%",
        },
    }),
    {name: "ModuleFederationContainer"},
);
