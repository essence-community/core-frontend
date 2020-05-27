import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    // eslint-disable-next-line no-unused-vars
    (theme: IEssenceTheme) => ({
        actionsContent: {
            height: "100%",
        },
        contentPanel: {
            padding: 16,
            width: "100%",
        },
    }),
    {name: "EssencePanelWrapper"},
);
