import {makeStyles} from "@material-ui/core/styles";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        popoverBackdrop: {
            bottom: 0,
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: theme.zIndex.modal,
        },
        popoverRoot: {
            bottom: "auto",
            height: "auto",
            left: "auto",
            position: "absolute",
            right: "auto",
            top: "auto",
            width: "auto",
            zIndex: theme.zIndex.modal,
        },
    }),
    {name: "EssencePopoverContent"},
);
