import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        dynamicTitle:
            theme.palette.type === "dark"
                ? {
                      // Dark
                      backgroundColor: theme.palette.common.white,
                      paddingLeft: 16,
                      paddingRight: 16,
                  }
                : {
                      // Light
                      "&:before": {
                          borderRight: `2px solid ${theme.palette.primary.main}`,
                          borderTop: `2px solid ${theme.palette.primary.main}`,
                          borderTopRightRadius: 6,
                          bottom: 0,
                          // eslint-disable-next-line quotes
                          content: '""',
                          left: 0,
                          position: "absolute",
                          top: 0,
                          transform: "skewX(30deg)",
                          width: 24,
                      },
                      borderBottom: `2px solid ${theme.palette.primary.main}`,
                      paddingLeft: theme.spacing(5),
                      paddingRight: 16,
                      position: "relative",
                  },
        filterButtons:
            theme.palette.type === "dark"
                ? {
                      // Dark
                      alignItems: "center",
                      backgroundColor: theme.palette.primary.main,
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
        filterButtonsAbsolute:
            theme.palette.type === "dark"
                ? {
                      // Dark
                      background: "none",
                      left: 0,
                      position: "absolute",
                  }
                : {},
        filterFields: {
            // Dark
            backgroundColor:
                theme.palette.type === "dark" ? theme.palette.common.white : theme.essence.palette.grey.light,
            padding: 16,
        },
        maxWidth: {
            maxWidth: "100%",
            width: "100%",
        },
        titleTypography: {
            fontSize: theme.palette.type === "dark" ? 30 : 22,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
    }),
    {name: "FilterContainer"},
);
