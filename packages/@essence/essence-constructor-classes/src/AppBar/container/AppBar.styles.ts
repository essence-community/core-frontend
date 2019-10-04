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
            "&::focus": {
                color: theme.palette.common.selectedMenu,
            },
            color: theme.palette.common.white,
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
