import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        bottomBar: {
            borderTop: `1px solid ${theme.essence.palette.grey.main}`,
            height: 48,
            overflow: "hidden",
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
        root: {
            backgroundColor: theme.essence.palette.common.white,
            height: "calc(100% - 24px)",
        },
        tabsRoot: {
            backgroundColor: theme.palette.primary.main,
            minHeight: 24,
        },
    }),
    {
        name: "EssenceNotificationPanel",
    },
);
