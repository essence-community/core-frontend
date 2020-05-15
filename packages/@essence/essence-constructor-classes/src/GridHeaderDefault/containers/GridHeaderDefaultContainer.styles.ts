import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        "align-center": {
            textAlign: "center",
        },
        "align-left": {},
        "align-right": {
            textAlign: "right",
        },
        filterIcon: {
            visibility: "hidden",
        },
        tableCell:
            theme.palette.type === "dark"
                ? {
                      "&:hover": {
                          "& $filterIcon": {
                              visibility: "visible",
                          },
                      },
                      "&:last-child": {
                          paddingRight: 0,
                      },
                      "&:not(:last-child)": {
                          borderRight: `1px solid ${theme.essence.palette.grey.arrow}`,
                      },
                      fontSize: 16,
                      overflow: "hidden",
                      padding: 0,
                  }
                : {
                      "&:hover": {
                          "& $filterIcon": {
                              visibility: "visible",
                          },
                          backgroundColor: theme.essence.palette.grey.light,
                      },
                      "&:last-child": {
                          paddingRight: 0,
                      },
                      borderBottom: `1px solid ${theme.palette.primary.main}`,
                      borderTop: `1px solid ${theme.palette.primary.main}`,
                      fontSize: 16,
                      height: theme.essence.sizing.gridRowHeight,
                      padding: 0,
                  },
        tableCellActive:
            theme.palette.type === "dark"
                ? {}
                : {
                      backgroundColor: theme.essence.palette.grey.light,
                  },
        tableCellContent: {
            display: "flex",
            height: "100%",
        },
        tableCellEllipsis: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        tableSortLabel:
            theme.palette.type === "dark"
                ? {
                      "&$activeSortLabel": {
                          color: theme.palette.common.white,
                      },
                      "&:focus": {
                          color: theme.palette.common.white,
                      },
                      "&:hover": {
                          color: theme.palette.common.white,
                      },
                      color: theme.essence.palette.grey.light,
                      flexGrow: 1,
                      overflow: "hidden",
                      paddingLeft: 12,
                  }
                : {
                      flexGrow: 1,
                      overflow: "hidden",
                      paddingLeft: 12,
                  },
    }),
    {name: "EssenceGridHeaderDefaultContainer"},
);
