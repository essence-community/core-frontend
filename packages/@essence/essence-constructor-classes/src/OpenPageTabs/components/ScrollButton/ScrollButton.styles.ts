import {makeStyles} from "@material-ui/core/styles";
import scrollButtonDark from "./ScrollButtonDark.style";
import scrollButtonLight from "./ScrollButtonLight.style";

export const useStyles = makeStyles((theme: any) => ({
    active: {
        color: theme.palette.primary.main,
    },
    disable: {
        color: theme.palette.grey.arrow,
    },
    ...(theme.palette.type === "light" ? scrollButtonLight(theme) : scrollButtonDark()),
}));
