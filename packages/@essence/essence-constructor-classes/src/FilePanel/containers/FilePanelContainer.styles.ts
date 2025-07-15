import {makeStyles} from "@mui/styles";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(

    (_theme: IEssenceTheme) => ({
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
