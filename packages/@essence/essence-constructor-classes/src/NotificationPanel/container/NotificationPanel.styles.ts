import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        bottomBar: {
            borderTop: `1px solid ${theme.essence.palette.grey.main}`,
            height: 48,
            overflow: "hidden",
        },
        btn: {
            padding: 12,
        },
        disabledBtn: {
            color: theme.essence.palette.grey.main,
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
