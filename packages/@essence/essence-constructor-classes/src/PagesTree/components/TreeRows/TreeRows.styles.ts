import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    () => ({
        menuGridRows: {
            height: "100%",
            overflow: "hidden",
        },
        menuGridRowsWrapper: {
            padding: "10px 0",
        },
    }),
    {name: "EssencePageTreTreeRows"},
);
