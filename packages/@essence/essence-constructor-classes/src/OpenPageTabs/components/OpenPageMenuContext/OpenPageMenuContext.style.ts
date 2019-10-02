import {getThemeStyles} from "@essence/essence-constructor-components";
import {makeStyles} from "@material-ui/core/styles";
import TabMenuContextStyleDark from "./OpenPageMenuContextDark.style";
import TabMenuContextStyleLight from "./OpenPageMenuContextLight.style";


export const useStyles = makeStyles(getThemeStyles({
    dark: TabMenuContextStyleDark,
    light: TabMenuContextStyleLight,
}));

export default useStyles;