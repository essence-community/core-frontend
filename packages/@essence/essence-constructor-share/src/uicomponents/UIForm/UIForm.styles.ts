import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        form: {
            display: "flex",
            flexDirection: theme.essence.layoutTheme === 2 ? "row" : "column",
        },
    }),
    {name: "UIForm"},
);
