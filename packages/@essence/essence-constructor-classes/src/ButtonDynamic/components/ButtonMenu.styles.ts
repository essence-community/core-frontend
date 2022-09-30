import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        iconButtonOpenRoot: {},
        iconButtonRoot:
            theme.essence.layoutTheme === 2
                ? {
                      "&$iconButtonOpenRoot": {
                          color: theme.essence.palette.common.selectedMenu,
                          fill: theme.essence.palette.common.selectedMenu,
                      },
                  }
                : {
                      "&$iconButtonOpenRoot": {
                          borderBottomColor: "transparent",
                          borderColor: theme.palette.primary.main,
                          borderRadius: "4px 4px 0 0",
                      },
                      transition: "background-color 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  },
        iconButtonWindowOpenRoot: {},
        iconButtonWindowRoot:
            theme.essence.layoutTheme === 2
                ? {
                      "&$iconButtonWindowOpenRoot": {
                          color: theme.essence.palette.common.selectedMenu,
                          fill: theme.essence.palette.common.selectedMenu,
                      },
                      color: theme.palette.common.white,
                      fill: theme.palette.common.white,
                  }
                : {
                      "&$iconButtonWindowOpenRoot": {
                          borderColor: theme.palette.primary.main,
                          borderRadius: "0 0 4px 4px",
                          borderTopColor: "transparent",
                      },
                      color: theme.palette.primary.main,
                      transition: "background-color 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  },

        popoverContent: {
            display: "flex",
            flexDirection: "column",
            maxWidth: 500,
            minWidth: 0,
        },
        popoverRoot:
            theme.essence.layoutTheme === 2
                ? {
                      backgroundColor: theme.palette.primary.main,
                  }
                : {
                      "&:before": {
                          backgroundColor: theme.palette.primary.main,
                          // eslint-disable-next-line quotes
                          content: '""',
                          height: 2,
                          left: 30,
                          position: "absolute",
                          right: 2,
                          top: 0,
                      },
                      backgroundColor: theme.palette.common.white,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: "0 4px 4px 4px",
                      borderTop: "none",
                      paddingTop: 2,
                  },

        popoverWindowRoot:
            theme.essence.layoutTheme === 2
                ? {}
                : {
                      "&:before": {
                          bottom: 0,
                          top: "auto",
                      },
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderBottom: "none",
                      borderRadius: "4px 4px 4px 0",
                      borderTop: `2px solid ${theme.palette.primary.main}`,
                      boxShadow: "none",
                      paddingBottom: 2,
                      paddingTop: 0,
                  },
    }),
    {name: "ButtonMenu"},
);
