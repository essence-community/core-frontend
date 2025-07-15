/* eslint-disable sort-keys */
import {makeStyles} from "@mui/styles";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        actionButton: {
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
        hiddenButton: {
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
                "& $hiddenButton": {
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
