import {makeStyles} from "@mui/styles";
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
