

import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {makeStyles} from "@mui/styles";

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
            zIndex: theme.zIndex.appBar,
        },
    }),
    {name: "ModuleFederationContainer"},
);
