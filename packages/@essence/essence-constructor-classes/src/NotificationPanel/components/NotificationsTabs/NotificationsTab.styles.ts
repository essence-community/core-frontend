import {IEssenceTheme} from "@essence/essence-constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    tabRoot: {
        minHeight: 20,
        minWidth: "inherit",
    },
    text: {
        "&.selected": {
            color: theme.essence.palette.common.selectedMenu,
        },
        color: theme.palette.common.white,
        textTransform: "none",
    },
}));
