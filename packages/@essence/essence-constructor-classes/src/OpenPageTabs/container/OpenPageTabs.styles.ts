import {IEssenceTheme} from "@essence/essence-constructor-share";
import {makeStyles} from "@material-ui/core/styles";
import openPageTabsDark from "./OpenPageTabsDark.styles";
import openPageTabsLight from "./OpenPageTabsLight.styles";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    ...(theme.palette.type === "light" ? openPageTabsLight(theme) : openPageTabsDark(theme)),
}));
