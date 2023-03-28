/* eslint-disable no-unused-vars */
/* eslint-disable sort-keys */
import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        fullScreen: {
            "& > iframe": {
                borderRadius: 0,
            },
            borderRadius: 0,
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 2,
        },
    }),
    {name: "ModuleFederationContainer"},
);
