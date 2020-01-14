import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    tabRoot: {
        minHeight: 20,
        minWidth: "inherit",
    },
    tabText: {
        "&.selected": {
            color: theme.essence.palette.common.selectedMenu,
        },
        color: theme.essence.palette.common.white,
        textTransform: "none",
    },
}));
