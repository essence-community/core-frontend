import {makeStyles} from "@material-ui/core/styles";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        iconRoot: {
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
    }),
    {name: "EssenceFieldComboInput"},
);
