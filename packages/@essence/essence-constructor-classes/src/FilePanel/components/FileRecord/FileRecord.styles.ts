/* eslint-disable sort-keys */
import {makeStyles} from "@mui/styles";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(

    (_theme: IEssenceTheme) => ({
        adornment: {
            width: 36,
            zIndex: 100,
            cursor: "pointer"
        },
        clearButton: {
            visibility: "hidden",
        },
        formLabelRoot: {
            display: "flex",
        },
        inputRoot: {
            "&:hover": {
                "& $clearButton": {
                    visibility: "visible",
                },
            },
            "& .MuiInputLabel-root": {
                marginTop: -8,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
            },
        },
        srinkedDocLabel: {
            paddingLeft: 36,
        },
        labelInfo: {

        },
    }),
    {name: "EssenceFileRecord"},
);
