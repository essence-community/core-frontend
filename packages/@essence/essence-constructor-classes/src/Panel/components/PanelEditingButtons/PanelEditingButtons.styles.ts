import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        editModeLabel:
            theme.essence.layoutTheme === 2
                ? {
                      color: theme.palette.common.white,
                      width: 15,
                      wordWrap: "break-word",
                  }
                : {
                      alignSelf: "center",
                      color: theme.palette.common.white,
                      position: "absolute",
                      right: 50,
                  },
        editingRoot: {
            position: "relative",
            zIndex: 3,
        },
    }),
    {name: "EssencePanelEditingButtons"},
);
