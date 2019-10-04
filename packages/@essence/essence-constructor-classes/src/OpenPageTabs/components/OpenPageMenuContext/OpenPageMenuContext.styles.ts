import {IEssenceTheme} from "@essence/essence-constructor-share";
import {makeStyles} from "@material-ui/core/styles";
import tabMenuContextStyleDark from "./OpenPageMenuContextDark.styles";
import tabMenuContextStyleLight from "./OpenPageMenuContextLight.styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) =>
        theme.palette.type === "light" ? tabMenuContextStyleLight(theme) : tabMenuContextStyleDark(theme),
);
