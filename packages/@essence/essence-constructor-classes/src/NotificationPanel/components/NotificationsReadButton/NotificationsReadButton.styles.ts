import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    badge: {
        borderColor: theme.essence.palette.common.white,
    },
    badgeDisabled: {
        backgroundColor: theme.essence.palette.grey.main,
    },
    btn: {
        padding: 12,
    },
    disabledBtn: {
        color: theme.essence.palette.grey.main,
    },
}));
