import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        form: {
            width: "calc(100% - 104px)",
        },
        paper: {
            alignItems: "center",
            backgroundColor: `${theme.palette.primary.main} !important`,
            display: "flex",
            flexDirection: "column",
            height: 308,
            justifyContent: "space-between",
            paddingBottom: 30,
            paddingTop: 15,
            width: 429,
        },
        typography: {
            color: `${theme.palette.common.white} !important`,
            fontSize: "30px !important",
            textAlign: "center",
            width: "100%",
        },
    }),
    {name: "AuthFormContainer"},
);
