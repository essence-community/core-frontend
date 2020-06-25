import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        iconLeft: {
            borderLeft: `1px solid ${theme.essence.palette.grey.main}`,
            borderRadius: 0,
        },
        iconRoot: {
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
        iconRootSelected: {
            color: theme.palette.primary.main,
        },
    }),
    {name: "EssenceFieldCssMeasureContainer"},
);
