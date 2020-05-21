import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    // eslint-disable-next-line no-unused-vars
    (theme: IEssenceTheme) => ({
        adornment: {
            height: 30,
            width: 50,
            zIndex: 100,
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
            paddingLeft: 46,
        },
    }),
    {name: "EssenceFileRecord"},
);
