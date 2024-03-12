import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    // eslint-disable-next-line no-unused-vars
    (theme: IEssenceTheme) => ({
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
        },
        srinkedDocLabel: {
            paddingLeft: 36,
        },
    }),
    {name: "EssenceFileRecord"},
);
