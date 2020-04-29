import {makeStyles} from "@material-ui/core/styles";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        error: {},
        labelAsterisk: {
            "&$error": {
                color: theme.palette.error.main,
            },
            color: theme.palette.error.main,
        },
        labelCircle: {
            color: theme.palette.text.secondary,
            fill: theme.palette.text.secondary,
        },
        labelError: {},
        labelRoot: {
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
    }),
    {name: "EssenceTextFieldLabel"},
);
