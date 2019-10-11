import {IEssenceTheme} from "@essence/essence-constructor-share";
import {makeStyles} from "@material-ui/core/styles";
import openPageTabsDark from "./OpenPageTabsDark.styles";
import openPageTabsLight from "./OpenPageTabsLight.styles";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    tabRoot: {
        position: "absolute",
        transition: "All 300ms linear 0s",
    },
    ...(theme.palette.type === "light" ? openPageTabsLight(theme) : openPageTabsDark(theme)),
}));
