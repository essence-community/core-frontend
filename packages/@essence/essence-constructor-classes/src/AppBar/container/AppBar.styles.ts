import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiAppBar-root": {
            minHeight: "inherit",
        },
        "& .MuiDivider-root": {
            backgroundColor: theme.palette.common.white,
        },
        "& .MuiIconButton-colorPrimary": {
            color: theme.palette.common.white,
        },
        "& .MuiIconButton-colorPrimary:hover": {
            color: theme.palette.common.selectedMenu,
        },
        "& .MuiToolbar-gutters": {
            paddingLeft: 0,
            paddingRight: 0,
        },
        "& .MuiToolbar-regular": {
            minHeight: "100%",
        },
        minHeight: "inherit",
    },
}));
