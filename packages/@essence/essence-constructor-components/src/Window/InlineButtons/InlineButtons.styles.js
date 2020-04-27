import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme) => ({
        label:
            theme.palette.type === "dark"
                ? {
                      color: theme.palette.common.white,
                      width: 15,
                      wordWrap: "break-word",
                  }
                : {
                      alignSelf: "center",
                      color: theme.palette.text.primary,
                      position: "absolute",
                      right: 50,
                  },
    }),
    {name: "InlineButtons"},
);
