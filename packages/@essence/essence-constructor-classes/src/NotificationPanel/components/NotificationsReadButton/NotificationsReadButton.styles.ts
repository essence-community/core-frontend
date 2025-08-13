import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        badge: {
            borderColor: theme.essence.palette.common.white,
            right: "8px !important",
            top: "10px !important",
        },
        badgeDisabled: {
            backgroundColor: theme.essence.palette.grey.main,
        },
        btn: {
            "&.MuiButtonBase-root": {
                color: theme.palette.primary.main,
                fill: theme.palette.primary.main,
                padding: 12,
            },
        },
        disabledBtn: {
            "&.MuiButtonBase-root.Mui-disabled": {
                color: theme.essence.palette.grey.main,
                fill: theme.essence.palette.grey.main,
            },
        },
    }),
    {
        name: "EssenceNotificationsReadButton",
    },
);
