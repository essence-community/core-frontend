import {makeStyles} from "@material-ui/core";
import {SCROLL_WEIGHT} from "../../constants";

export const useStyles = makeStyles(
    () => ({
        headerItem: {
            flexGrow: 0,
        },
        headerScroll: {
            overflow: "hidden",
        },
        tableBodyRoot: {
            marginBottom: SCROLL_WEIGHT - 2,
            tableLayout: "fixed",
        },
        tableHeader: {
            tableLayout: "fixed",
        },
    }),
    {name: "EssenceGridTable"},
);
