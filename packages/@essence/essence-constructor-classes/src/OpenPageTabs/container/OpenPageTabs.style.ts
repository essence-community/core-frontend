import { getThemeStyles } from "@essence/essence-constructor-components";
import { makeStyles } from "@material-ui/core/styles";
import { OpenPageTabsDark } from "./OpenPageTabsDark.style";
import { OpenPageTabsLight } from "./OpenPageTabsLIght.style";

export const useStyles = makeStyles(getThemeStyles({
    dark: OpenPageTabsDark,
    light: OpenPageTabsLight,
},
{
    tabRoot: {
        position: "absolute",
        transition: "All 300ms linear 0s",
    },
    })
);

export default useStyles;