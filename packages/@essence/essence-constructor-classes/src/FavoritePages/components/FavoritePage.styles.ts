import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        iconRemove: {
            boxSizing: "content-box",
            display: "none",
            height: 23,
            textAlign: "center",
            width: 23,
        },
        iconRoot: {
            "&:empty": {
                display: "block",
            },
            boxSizing: "content-box",
            height: 23,
            textAlign: "center",
            width: 23,
        },
        linkMenu: {
            textDecoration: "none",
        },
        menuContainer: {
            height: 50,
        },
        menuRoot: {
            "&:hover": {
                "& $iconRemove": {
                    display: "block",
                },
                "& $iconRoot": {
                    display: "none",
                },
                backgroundColor: theme.essence.palette.common.selectedMenu,
            },
            color: theme.essence.palette.common.white,
            cursor: "pointer",
            padding: "0 10px",
        },
        nameTypography: {
            fontSize: 15,
        },
    }),
    {
        name: "FavoritePage",
    },
);
