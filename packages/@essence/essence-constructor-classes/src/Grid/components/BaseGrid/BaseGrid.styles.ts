import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        contentRoot: {},
        editActionsGrid:
            theme.essence.layoutTheme === 2
                ? {
                      minWidth: theme.essence.sizing.controlPanelWidth,
                      paddingTop: 4,
                      position: "relative",
                      width: theme.essence.sizing.controlPanelWidth,
                      zIndex: 3,
                  }
                : {
                      backgroundColor: theme.palette.common.white,
                      height: 48,
                      padding: "6px 4px",
                      position: "relative",
                      zIndex: 3,
                  },
        editableTable: {
            zIndex: 3,
        },
        maxWidth: {
            maxWidth: "100%",
            width: "100%",
        },
        root: {
            height: "100%",
            position: "relative",
        },
        rootActions:
            theme.essence.layoutTheme === 2
                ? {
                      "& $contentRoot": {
                          maxWidth: `calc(100% - ${theme.essence.sizing.controlPanelWidth}px)`,
                      },
                      "&:before": {
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: "4px 0 0 4px",
                          bottom: 0,
                          // eslint-disable-next-line prettier/prettier
                          content: "\"\"",
                          left: 0,
                          position: "absolute",
                          top: 0,
                          width: theme.essence.sizing.controlPanelWidth,
                      },
                  }
                : {},
        tableActions:
            theme.essence.layoutTheme === 2
                ? {
                      alignSelf: "flex-end",
                      bottom: 0,
                      color: theme.palette.common.white,
                      fill: theme.palette.common.white,
                      minWidth: theme.essence.sizing.controlPanelWidth,
                      paddingTop: 4,
                      position: "sticky",
                      transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      width: theme.essence.sizing.controlPanelWidth,
                  }
                : {
                      color: theme.palette.primary.main,
                      fill: theme.palette.primary.main,
                      minHeight: 48,
                      padding: "6px 4px",
                      position: "inherit",
                  },
        tableBodyItem:
            theme.essence.layoutTheme === 2
                ? {
                      backgroundColor: theme.palette.common.white,
                      flexBasis: 0,
                      transition: "margin-top 200ms linear 0s",
                  }
                : {
                      backgroundColor: theme.palette.common.white,
                  },
    }),
    {name: "EssenceBaseGrid"},
);
