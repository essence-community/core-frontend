import {makeStyles} from "@material-ui/core/styles";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        baseLabelGrid:
            theme.essence.layoutTheme === 1
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
            theme.essence.layoutTheme === 1
                ? {
                      border: "2px solid transparent",
                      borderRadius: 4,
                      color: theme.palette.primary.light,
                      fontSize: 24,
                      margin: "0 14px",
                      padding: "2px 4px",
                  }
                : {
                      color: theme.palette.common.white,
                      fontSize: 24,
                      margin: "0 15px",
                  },
        closedLabelGrid:
            theme.essence.layoutTheme === 1
                ? {
                      "&:before": {
                          borderTop: `5px solid ${theme.palette.secondary.light}`,
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
            theme.essence.layoutTheme === 1
                ? {
                      border: `1px solid ${theme.essence.palette.grey.main}`,
                      borderTop: "0 !important",
                      padding: "8px 0",
                      width: "100%",
                  }
                : {
                      padding: "12px 0 8px 0",
                      width: "100%",
                  },
        editCollapseContainer: {
            backgroundColor: theme.essence.palette.common.white,
            width: "100%",
            zIndex: 4,
        },
        labelBox:
            theme.essence.layoutTheme === 1
                ? {
                      backgroundColor: theme.palette.common.white,
                      zIndex: 1,
                  }
                : {},
        labelBoxText: {
            maxWidth: "calc(100% - 40px)",
            paddingRight: 10,
        },
        labelGrid:
            theme.essence.layoutTheme === 1
                ? {
                      "&:before": {
                          borderLeft: `1px solid ${theme.essence.palette.grey.main}`,
                          borderRight: `1px solid ${theme.essence.palette.grey.main}`,
                          borderTop: `5px solid ${theme.palette.secondary.light}`,
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
        labelParentBox:
            theme.essence.layoutTheme === 1
                ? {
                      width: `calc(100% - ${theme.spacing(4)}px)`,
                  }
                : {},
        labelTypography:
            theme.essence.layoutTheme === 1
                ? {
                      backgroundColor: theme.palette.common.white,
                      fontSize: 16,
                      overflow: "hidden",
                      paddingTop: 6,
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      zIndex: 1,
                  }
                : {
                      color: theme.palette.common.white,
                      fontSize: 16,
                      overflow: "hidden",
                      paddingTop: 3,
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                  },
        root: {
            width: "100%",
        },
    }),
    {name: "EssencePanelCollapsible"},
);
