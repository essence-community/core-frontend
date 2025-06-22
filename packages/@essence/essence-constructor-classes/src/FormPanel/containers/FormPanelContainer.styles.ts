import {makeStyles} from "@mui/styles";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(

    (theme: IEssenceTheme) => ({
        form: {
            width: "100%",
        },
        mask: {
            backgroundColor: theme.essence.palette.common.disabled,
            height: "100%",
            opacity: 0.5,
            position: "absolute",
            width: "100%",
            zIndex: 1,
        },
    }),
    {name: "EssenceFormPanel"},
);
