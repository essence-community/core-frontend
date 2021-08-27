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
        actionsContent: {
            height: "100%",
        },
        panelEditing: {
            position: "relative",
            zIndex: 3,
        },
    }),
    {name: "EssencePanelWrapper"},
);
