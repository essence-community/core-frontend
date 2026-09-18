import {makeStyles} from "@essence-community/constructor-share";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        checkBoxSize: {
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
    }),
    {name: "EssenceGridHFBooleanContainer"},
);
