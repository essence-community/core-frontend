import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@material-ui/core/styles";
import scrollButtonDark from "./ScrollButtonDark.style";
import scrollButtonLight from "./ScrollButtonLight.style";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        active: {
            color: theme.palette.primary.main,
        },
        disable: {
            color: theme.essence.palette.grey.arrow,
        },
        ...(theme.essence.layoutTheme === 1 ? scrollButtonLight(theme) : scrollButtonDark()),
    }),
    {
        name: "EssenceScrollButton",
    },
);
