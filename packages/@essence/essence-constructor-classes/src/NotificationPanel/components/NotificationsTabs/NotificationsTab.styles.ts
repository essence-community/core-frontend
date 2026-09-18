import {IEssenceTheme, makeStyles} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        tabRoot: {
            minHeight: 20,
            minWidth: "inherit",
        },
        tabText: {
            "&.selected": {
                color: theme.essence.palette.common.selectedMenu,
            },
            color: `${theme.essence.palette.common.white} !important`,
            textTransform: "none",
        },
    }),
    {
        name: "EssenceNotificationsTab",
    },
);
