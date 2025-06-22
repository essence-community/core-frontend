import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        btnReset: {
            cursor: "pointer",
            fontSize: theme.typography.fontSize,
            fontWeight: theme.typography.fontWeightRegular,
            width: 100,
        },
    }),
    {name: "GridSettingsContainer"},
);
