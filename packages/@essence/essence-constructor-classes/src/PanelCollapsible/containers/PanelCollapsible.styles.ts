import {makeStyles} from "@material-ui/core/styles";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        baseLabelGrid:
            theme.palette.type === "light"
                ? {
                      "&:focus": {
                          "& $chevronIcon": {
                              borderColor: theme.essence.palette.icon.primary,
                          },
                          outline: "none",
                      },
                  }
                : {
                      "&:focus": {
                          "& $chevronIcon": {
                              color: theme.essence.palette.common.selectedMenu,
                          },
                          outline: "none",
                      },
                  },
        chevronIcon:
            theme.palette.type === "light"
                ? {
                      border: "2px solid transparent",
                      borderRadius: 4,
                      color: theme.palette.primary.light,
                      margin: "0 14px",
                      padding: "2px 4px",
                  }
                : {
                      color: theme.palette.common.white,
                      margin: "0 15px",
                  },
        closedLabelGrid:
            theme.palette.type === "light"
                ? {
                      "&:before": {
                          borderTop: `5px solid ${theme.palette.secondary.main}`,
                          bottom: 0,
                          content: "''",
                          height: 23,
                          left: 0,
                          position: "absolute",
                          right: 0,
                          top: "45%",
                      },
                      alignItems: "center",
                      cursor: "pointer",
                      display: "flex",
                      height: 35,
                      paddingLeft: `${theme.spacing(4)}px !important`,
                      position: "relative",
                  }
                : {},
        collapseContainer: {
            width: "100%",
        },
        collapseContent:
            theme.palette.type === "light"
                ? {
                      border: `1px solid ${theme.essence.palette.grey.main}`,
                      borderTop: "0 !important",
                      padding: "8px 0",
                  }
                : {
                      padding: "12px 0 8px 0",
                  },
        editCollapseContainer: {
            backgroundColor: theme.essence.palette.common.white,
            width: "100%",
            zIndex: 4,
        },
        labelGrid:
            theme.palette.type === "light"
                ? {
                      "&:before": {
                          borderLeft: `1px solid ${theme.essence.palette.grey.main}`,
                          borderRight: `1px solid ${theme.essence.palette.grey.main}`,
                          borderTop: `5px solid ${theme.palette.secondary.main}`,
                          bottom: 0,
                          content: "''",
                          height: 23,
                          left: 0,
                          position: "absolute",
                          right: 0,
                          top: "45%",
                      },
                      alignItems: "center",
                      cursor: "pointer",
                      display: "flex",
                      height: 35,
                      paddingLeft: `${theme.spacing(4)}px !important`,
                      position: "relative",
                  }
                : {
                      alignItems: "center",
                      backgroundColor: theme.palette.primary.light,
                      cursor: "pointer",
                      display: "flex",
                      height: 35,
                  },
        labelTypography:
            theme.palette.type === "light"
                ? {
                      alignItems: "center",
                      backgroundColor: theme.palette.common.white,
                      display: "flex",
                      fontSize: 14,
                      paddingRight: 16,
                      zIndex: 1,
                  }
                : {
                      alignItems: "center",
                      color: theme.palette.common.white,
                      display: "flex",
                      fontSize: 20,
                  },
        root: {
            width: "100%",
        },
    }),
    {name: "EssencePanelCollapsible"},
);
