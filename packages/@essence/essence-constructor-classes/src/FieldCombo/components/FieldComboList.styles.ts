import {makeStyles} from "@material-ui/core/styles";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        loader: {
            left: "calc(50% - 20px)",
            position: "absolute",
            top: "calc(50% - 20px)",
        },
        paginationMenuItem: {
            "&:hover": {
                backgroundColor: "inherit",
            },
            alignItems: "center",
            display: "flex",
            height: 30,
            justifyContent: "center",
        },
        paper: {
            borderBottom: `1px solid ${theme.essence.palette.grey.main}`,
            borderLeft: `1px solid ${theme.essence.palette.grey.main}`,
            borderRight: `1px solid ${theme.essence.palette.grey.main}`,
        },
    }),
    {name: "EssenceFieldComboList"},
);
