import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        actionsBar:
            theme.palette.type === "dark"
                ? {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.common.white,
                      fill: theme.palette.common.white,
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
        contentEditing: {
            backgroundColor: theme.palette.common.white,
        },
        panelEditing:
            theme.palette.type === "dark"
                ? {
                      position: "relative",
                      zIndex: 3,
                  }
                : {
                      "& $actionsBar": {
                          backgroundColor: theme.palette.primary.light,
                          borderBottom: `2px solid ${theme.palette.primary.main}`,
                      },
                      backgroundColor: theme.palette.common.white,
                  },
        topPanel:
            theme.palette.type === "dark"
                ? {
                      backgroundColor: theme.palette.common.white,
                      transition: "margin-top 200ms linear 0s",
                      zIndex: 2,
                  }
                : {},
    }),
    {name: "EssencePanelWrapper"},
);
