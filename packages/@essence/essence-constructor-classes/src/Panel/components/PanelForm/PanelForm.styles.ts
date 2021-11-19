import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        actionsBar:
            theme.essence.layoutTheme === 2
                ? {
                      bottom: 0,
                      position: "sticky",
                  }
                : {},
        content: {
            width: "100%",
        },
        contentRoot: {},
        formActions:
            theme.essence.layoutTheme === 2
                ? {
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: "4px 0 0 4px",
                      color: theme.palette.common.white,
                      display: "flex",
                      fill: theme.palette.common.white,
                      flexDirection: "column",
                      justifyContent: "flex-end",
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
            borderBottomRightRadius: theme.essence.layoutTheme === 2 ? 4 : 0,
        },
        formRootEditing: {
            position: "relative",
            zIndex: 3,
        },
        panelEditing: {},
        root:
            theme.essence.layoutTheme === 2
                ? {}
                : {
                      position: "relative",
                  },
        rootActions:
            theme.essence.layoutTheme === 2
                ? {
                      "& $contentRoot": {
                          maxWidth: `calc(100% - ${theme.essence.sizing.controlPanelWidth}px)`,
                      },
                      position: "relative",
                  }
                : {},
        rootActionsHide: {},
    }),
    {name: "EssencePanelForm"},
);
