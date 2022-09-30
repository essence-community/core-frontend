import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        popoverContent: {
            display: "flex",
            flexDirection: "column",
            maxWidth: 500,
            minWidth: 0,
        },
        popoverRoot:
            theme.essence.layoutTheme === 2
                ? {
                      backgroundColor: theme.palette.primary.main,
                  }
                : {
                      "&:before": {
                          backgroundColor: theme.palette.primary.main,
                          // eslint-disable-next-line quotes
                          content: '""',
                          height: 2,
                          left: 30,
                          position: "absolute",
                          right: 2,
                          top: 0,
                      },
                      backgroundColor: theme.palette.common.white,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: "0 4px 4px 4px",
                      borderTop: "none",
                      paddingTop: 2,
                  },
    }),
    {name: "ColumnIconLink"},
);
