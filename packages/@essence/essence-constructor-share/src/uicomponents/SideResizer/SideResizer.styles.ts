import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    btnResizer: {
        marginTop: -10,
        position: "absolute",
        top: "50%",
    },
    sideResizer: {
        backgroundColor: theme.palette.common.white,
        cursor: "col-resize",
        height: "100%",
        position: "relative",
        width: 10,
    },
    textResizer: {
        "&:after": {
            content: "'...'",
            display: "inline-block",
            fontSize: 20,
            fontWeight: 600,
            transform: "rotate(270deg)",
        },
        marginLeft: -8,
    },
}));
