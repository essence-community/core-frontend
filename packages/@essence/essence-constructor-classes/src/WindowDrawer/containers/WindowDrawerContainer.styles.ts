import {makeStyles} from "@mui/styles";
import {IEssenceTheme, IClassProps} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        container: {
            height: "100%",
            overflow: "hidden",
        },
        content: {
            "&:empty": {
                display: "flex",
            },
            display: "flex",
            flexDirection: "column",
        },
        drawerPaper: {
            "&.MuiPaper-root": {
                color: theme.palette.mode === "dark" ? theme.essence.palette.common.white : theme.essence.palette.grey.light,
            },
            alignItems: "center",
            backgroundColor: `${theme.palette.primary.main} !important`,
            backgroundImage: "none !important",
            color: theme.palette.mode === "dark" ? theme.essence.palette.common.white : theme.essence.palette.grey.light,
            top: (props: IClassProps) => `${props.bc.top}px !important`,
        },
    }),
    {
        name: "EssenceWindowDrawerContainer",
    },
);
