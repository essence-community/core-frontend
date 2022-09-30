import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        label:
            theme.essence.layoutTheme === 2
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
    {name: "EssenceGridInlineButtons"},
);
