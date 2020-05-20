import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {Theme} from "@material-ui/core";

// eslint-disable-next-line max-lines-per-function
export const getThemeLightOverrides = (theme: IEssenceTheme): Theme["overrides"] => ({
    MuiButton: {
        containedPrimary: {
            "&:focus": {
                backgroundColor: "#004781",
                borderColor: "#004781",
                boxShadow:
                    "#dee4ee 0 1px 0px 0 inset, #dee4ee 0 -1px 0px 0 inset, #dee4ee -1px 0 0px 0 inset," +
                    " #dee4ee 1px 0 0px 0 inset",
            },
            "&:hover": {
                backgroundColor: "#004781",
                borderColor: "#004781",
            },
            backgroundColor: "#5879a9",
            boxShadow: "1px 1px 5px rgb(51, 51, 51)",
            transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms," +
                "box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        },
        containedSecondary: {
            "&:focus": {
                borderColor: "#51a1b5",
            },
            "&:hover": {
                backgroundColor: "#f78f1e",
                borderColor: "#f78f1e",
                color: theme.palette.common.white,
            },
            borderColor: "#f78f1e",
            boxShadow: "rgba(0, 0, 0, 0.349019607843137) 1px 1px 5px",
            transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms," +
                "box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        },
    },
    MuiCheckbox: {
        root: {
            "&:hover$root": {
                color: theme.essence.palette.primary.icon,
            },
            color: theme.essence.palette.primary.field,
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
    },
    MuiDialogActions: {
        root: {
            backgroundColor: "rgba(204, 218, 230, 0.45)",
        },
    },
    MuiDialogTitle: {
        root: {
            backgroundColor: "rgba(204, 218, 230, 0.45)",
        },
    },
    MuiIconButton: {
        colorInherit: {
            "&:focus,&:hover": {
                backgroundColor: "transparent",
                borderColor: "#5879a9",
            },
            border: "2px solid transparent",
            borderRadius: 3,
        },
        colorPrimary: {
            "&:focus,&:hover": {
                backgroundColor: "transparent",
                borderColor: "#5879a9",
            },
            border: "2px solid transparent",
            borderRadius: 3,
            fill: "#5879a9",
        },
        colorSecondary: {
            "&:focus,&:hover": {
                backgroundColor: "transparent",
                color: "#5879a9",
            },
            color: theme.essence.palette.icon.secondary,
            fill: theme.essence.palette.icon.secondary,
        },
        root: {
            "&$disabled": {
                color: "rgba(0, 0, 0, 0.26)",
                fill: "rgba(0, 0, 0, 0.26)",
            },
            borderRadius: "initial",
            height: 32,
            padding: 3,
            width: 32,
        },
    },
    MuiPaper: {
        rounded: {
            borderRadius: 2,
        },
    },
    MuiRadio: {
        root: {
            color: theme.essence.palette.primary.icon,
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
    },
});
