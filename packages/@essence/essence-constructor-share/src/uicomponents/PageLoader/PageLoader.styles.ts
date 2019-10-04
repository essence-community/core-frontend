import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "../../types/Theme";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    root: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        zIndex: theme.essence.zIndex.loader,
    },
}));
