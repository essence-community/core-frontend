import {IEssenceTheme} from "@essence/essence-constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    hbox: {
        backgroundColor: theme.palette.common.main,
        height: 34,
        margin: "0px 2px",
        width: 1,
    },
    vbox: {
        backgroundColor: theme.palette.common.main,
        height: 1,
        margin: "2px 0px",
        width: 34,
    },
}));
