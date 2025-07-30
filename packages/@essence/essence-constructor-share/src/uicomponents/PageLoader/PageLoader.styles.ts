/* eslint-disable sort-keys */
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(
    () => ({
        root: {
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            zIndex: 1600,
        },
    }),
    {name: "EssencePageLoader"},
);
