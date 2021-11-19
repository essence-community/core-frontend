import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        baseFilter:
            theme.essence.layoutTheme === 2
                ? {
                      minHeight: 42 * 3,
                  }
                : {},
        dynamicTitle:
            theme.essence.layoutTheme === 2
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
        filterFields:
            theme.essence.layoutTheme === 2
                ? {
                      backgroundColor: theme.palette.common.white,
                      borderTopRightRadius: 4,
                      padding: 16,
                  }
                : {
                      backgroundColor: theme.essence.palette.grey.light,
                      padding: 16,
                  },
        maxWidth: {
            maxWidth: "100%",
            width: "100%",
        },
        titleTypography: {
            fontSize: theme.essence.layoutTheme === 2 ? 30 : 22,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
    }),
    {name: "EssenceFilterContainer"},
);
