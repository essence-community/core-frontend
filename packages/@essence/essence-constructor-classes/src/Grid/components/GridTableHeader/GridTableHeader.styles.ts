import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        tableHead:
            theme.palette.type === "dark"
                ? {
                      backgroundColor: theme.essence.palette.primary.field,
                      height: theme.essence.sizing.gridRowHeight,
                      width: "100%",
                  }
                : {
                      borderBottom: `1px solid ${theme.palette.primary.main}`,
                      borderTop: `1px solid ${theme.palette.primary.main}`,
                      width: "100%",
                  },
        tableHeadButton:
            theme.palette.type === "dark"
                ? {}
                : {
                      borderBottom: `1px solid ${theme.palette.primary.main}`,
                  },
        tableRow:
            theme.palette.type === "dark"
                ? {}
                : {
                      backgroundColor: theme.palette.common.white,
                      height: theme.essence.sizing.gridRowHeight,
                  },
    }),
    {name: "EssenceGridTableHeader"},
);
