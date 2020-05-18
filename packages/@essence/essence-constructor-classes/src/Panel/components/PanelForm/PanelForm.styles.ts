import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        actionsBar:
            theme.palette.type === "dark"
                ? {
                      height: "100%",
                  }
                : {},
        content: {
            width: "100%",
        },
        contentRoot: {},
        formActions:
            theme.palette.type === "dark"
                ? {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.common.white,
                      fill: theme.palette.common.white,
                      minWidth: theme.essence.sizing.controlPanelWidth,
                      paddingTop: 4,
                      width: theme.essence.sizing.controlPanelWidth,
                  }
                : {
                      color: theme.palette.primary.main,
                      display: "flex",
                      fill: theme.palette.primary.main,
                      height: 48,
                      padding: "0 16px",
                  },
        formRoot: {
            backgroundColor: theme.palette.background.paper,
            position: "relative",
            zIndex: 3,
        },
        panelEditing: {},
        root:
            theme.palette.type === "dark"
                ? {}
                : {
                      position: "relative",
                  },
        rootActions:
            theme.palette.type === "dark"
                ? {
                      "& $contentRoot": {
                          maxWidth: `calc(100% - ${theme.essence.sizing.controlPanelWidth}px)`,
                      },
                  }
                : {},
        rootActionsHide: {},
    }),
    {name: "EssencePanelForm"},
);
