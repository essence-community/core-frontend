import { getThemeStyles } from "@essence/essence-constructor-components";
import { makeStyles } from "@material-ui/core/styles";
import { ScrollButtonDark } from "./ScrollButtonDark.style";
import { ScrollButtonLight } from "./ScrollButtonLight.style";

export const useStyles = makeStyles(getThemeStyles({
    dark: ScrollButtonDark,
    light: ScrollButtonLight,
},
(theme) => ({
    active: {
        color: theme.palette.primary.main,
    },
    disable: {
        color: theme.palette.grey.arrow,
    },
    })
));

export default useStyles;