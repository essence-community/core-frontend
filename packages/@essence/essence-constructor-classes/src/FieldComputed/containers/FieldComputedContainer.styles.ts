import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        textarea: {
            marginTop: 11,
        },
        textareaRoot: {
            minHeight: theme.essence.sizing.gridRowHeight,
        },
    }),
    {
        name: "FieldComputedContainer",
    },
);
