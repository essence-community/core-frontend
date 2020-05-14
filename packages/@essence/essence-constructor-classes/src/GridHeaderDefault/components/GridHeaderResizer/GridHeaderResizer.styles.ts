import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        tableHeadResizer: {
            cursor: "col-resize",
            height: theme.essence.sizing.gridRowHeight,
            width: 4,
        },
    }),
    {
        name: "EssenceGridHeaderResizer",
    },
);
