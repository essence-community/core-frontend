import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    hbox: {
        // @ts-ignore
        backgroundColor: theme.palette.common.main,
        height: 34,
        margin: "0px 2px",
        width: 1,
    },
    vbox: {
        // @ts-ignore
        backgroundColor: theme.palette.common.main,
        height: 1,
        margin: "2px 0px",
        width: 34,
    },
}));
