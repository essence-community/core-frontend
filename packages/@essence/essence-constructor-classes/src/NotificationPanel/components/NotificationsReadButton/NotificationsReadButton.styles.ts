import {IEssenceTheme} from "@essence/essence-constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    badge: {
        borderColor: theme.palette.common.white,
    },
    badgeDisabled: {
        backgroundColor: theme.palette.grey.main,
    },
    btn: {
        padding: 12,
    },
    disabledBtn: {
        color: theme.palette.grey.main,
    },
}));
