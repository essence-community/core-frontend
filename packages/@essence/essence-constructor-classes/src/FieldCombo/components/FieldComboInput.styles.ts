import {makeStyles} from "@mui/styles";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        iconRoot: {
            "&.MuiButtonBase-root.MuiIconButton-root": {
                height: theme.essence.sizing.gridRowHeight,
                width: theme.essence.sizing.gridRowHeight,
            },
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
    }),
    {name: "EssenceFieldComboInput"},
);
