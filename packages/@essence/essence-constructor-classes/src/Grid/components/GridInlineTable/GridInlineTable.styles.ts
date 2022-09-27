import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        hidden: {
            display: "none",
        },
        inlineRoot: {
            height: theme.essence.sizing.gridRowHeight,
            position: "absolute",
            width: "100%",
            zIndex: theme.zIndex.modal,
        },
        inlineTable: {
            tableLayout: "fixed",
        },
        row: {
            color: "inherit",
            display: "table-row",
            height: theme.essence.sizing.gridRowHeight,
            // We disable the focus ring for mouse, touch and keyboard users.
            outline: "none",
            verticalAlign: "middle",
        },
        tableCell:
            theme.essence.layoutTheme === 2
                ? {
                      "&:first-of-type": {
                          border: "none",
                      },
                      "&:last-child": {
                          borderRight: "none",
                          paddingRight: 4,
                      },
                      border: "none",
                      borderRight: `1px solid ${theme.essence.palette.grey.arrow}`,
                      padding: 0,
                      paddingLeft: 4,
                      paddingRight: 4,
                      width: "calc(100% - 1px)",
                  }
                : {
                      "&:last-child": {
                          paddingRight: 4,
                      },
                      border: "none",
                      padding: 0,
                      paddingLeft: 4,
                      paddingRight: 4,
                  },
    }),
    {name: "EssenceGridInlineTable"},
);
