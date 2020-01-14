import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@material-ui/core/styles";
import openPageMenuContextDark from "./OpenPageMenuContextDark.styles";
import openPageMenuContextLight from "./OpenPageMenuContextLight.styles";

export const useStyles = makeStyles((theme: IEssenceTheme) =>
    theme.palette.type === "light" ? openPageMenuContextDark(theme) : openPageMenuContextLight(theme),
);
