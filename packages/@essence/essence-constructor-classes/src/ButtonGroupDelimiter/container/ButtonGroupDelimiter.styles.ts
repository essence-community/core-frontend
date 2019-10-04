import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    hbox: {
        backgroundColor: theme.palette.common.main,
        height: 34,
        width: 2,
    },
    vbox: {
        backgroundColor: theme.palette.common.main,
        height: 2,
        width: 34,
    },
}));
