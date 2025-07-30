import {makeStyles} from "@mui/styles";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        root: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            marginTop: theme.spacing(3),
            paddingBottom: theme.spacing(2),
            paddingTop: theme.spacing(2),
        },
    }),
    {name: "StaticPreferenceContainer"},
);
