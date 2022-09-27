import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        filterButtons:
            theme.essence.layoutTheme === 2
                ? {
                      // Dark
                      alignItems: "center",
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: "3px 0 0 3px",
                      color: theme.palette.common.white,
                      display: "flex",
                      fill: theme.palette.common.white,
                      flexDirection: "column",
                      width: theme.essence.sizing.controlPanelWidth,
                  }
                : {
                      // Light
                      "&:after": {
                          backgroundColor: theme.palette.primary.main,
                          bottom: 0,
                          // eslint-disable-next-line quotes
                          content: '""',
                          height: 2,
                          left: 0,
                          position: "absolute",
                          width: "100%",
                      },
                      alignItems: "center",
                      color: theme.palette.primary.main,
                      display: "flex",
                      fill: theme.palette.primary.main,
                      flexBasis: "auto",
                      height: 42,
                      position: "relative",
                  },
        filterButtonsCollapse:
            theme.essence.layoutTheme === 2
                ? {
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      width: theme.essence.sizing.controlPanelWidth,
                  }
                : {},
        filterButtonsCollect: {},
        filterButtonsContainer:
            theme.essence.layoutTheme === 2
                ? {
                      // Dark
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                  }
                : {
                      // Light
                      "&:before": {
                          borderRight: `2px solid ${theme.palette.primary.main}`,
                          borderTop: `2px solid ${theme.palette.primary.main}`,
                          borderTopRightRadius: 6,
                          bottom: -5,
                          // eslint-disable-next-line quotes
                          content: '""',
                          height: 40,
                          left: 10,
                          position: "absolute",
                          transform: "skewX(30deg)",
                          width: "100%",
                      },
                      display: "flex",
                      position: "relative",
                  },
        titleContainer:
            theme.essence.layoutTheme === 2
                ? {}
                : {
                      // Light
                      display: "inline-flex",
                      marginLeft: theme.spacing(3),
                      overflow: "hidden",
                  },
        titleTypography: {
            // Dark
            fontSize: theme.essence.layoutTheme === 2 ? 30 : 22,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
    }),
    {name: "EssenceFilterButtons"},
);
