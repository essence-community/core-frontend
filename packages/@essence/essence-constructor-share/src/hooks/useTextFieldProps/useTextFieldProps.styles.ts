import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        clearButton: {
            height: theme.essence.sizing.gridRowHeight,
            visibility: "hidden",
            width: theme.essence.sizing.gridRowHeight,
        },
        formLabelRoot: {
            display: "flex",
        },
        input: {},
        inputDisable: {},
        inputRoot: {
            "&:hover": {
                "& $clearButton": {
                    visibility: "visible",
                },
            },
        },
        linkInputRoot: {
            "& $formLabelRoot": {
                cursor: "pointer",
            },
            "& $input": {
                cursor: "pointer",
                textDecoration: `underline ${theme.essence.palette.common.link}`,
            },
            "& $inputDisable": {
                pointerEvents: "none",
            },
            cursor: "pointer",
        },
    }),
    {name: "useTextFieldProps"},
);
