import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    (theme) => ({
        iconRoot: {
            // @ts-ignore
            height: theme.sizing.gridRowHeight,
            // @ts-ignore
            width: theme.sizing.gridRowHeight,
        },
    }),
    {name: "EssenceFieldComboInput"},
);
