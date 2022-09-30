import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";
import {darkStyles} from "./TabPopoverContent.dark.styles";
import {lightStyles} from "./TabPopoverContent.light.styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        rootDefault: {
            display: "flex",
            flexDirection: "column",
            outline: "none",
        },
        ...(theme.essence.layoutTheme === 2 ? darkStyles() : lightStyles(theme)),
    }),
    {
        name: "EssenceTabPopoverContent",
    },
);
