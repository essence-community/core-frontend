import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {Theme} from "@material-ui/core";

// eslint-disable-next-line max-lines-per-function
export const getThemeDarkOverrides = (theme: IEssenceTheme): Theme["overrides"] => ({
    MuiButton: {
        contained: {
            "&$disabled": {
                backgroundColor: "",
            },
        },
        containedPrimary: {
            "&:focus": {
                borderColor: theme.palette.primary.light,
                color: theme.essence.palette.common.selectedMenu,
                fill: theme.essence.palette.common.selectedMenu,
            },
            "&:hover": {
                backgroundColor: theme.essence.palette.primary.icon,
                borderColor: theme.palette.primary.light,
                boxShadow: `inset 0 0 2px 2px ${theme.palette.primary.light}`,
            },
            backgroundColor: theme.essence.palette.primary.icon,
        },
        containedSecondary: {
            "&:focus": {
                borderColor: theme.palette.primary.light,
            },
            "&:hover": {
                backgroundColor: theme.palette.common.white,
                borderColor: theme.palette.primary.light,
                boxShadow: `inset 0 0 1px 2px ${theme.palette.primary.light}`,
            },
        },
        root: {
            "&$disabled": {
                color: theme.essence.palette.common.disabled,
                fill: theme.essence.palette.common.disabled,
            },
        },
    },
    MuiCheckbox: {
        colorPrimary: {
            "&$checked": {
                color: theme.palette.primary.main,
            },
            "&:hover$colorPrimary": {
                color: theme.essence.palette.primary.icon,
            },
            color: theme.palette.primary.main,
        },
        root: {
            "&:hover$root": {
                color: theme.palette.primary.light,
            },
            color: theme.essence.palette.primary.icon,
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
    },
    MuiDialogActions: {
        root: {
            backgroundColor: theme.palette.primary.main,
        },
    },
    MuiDialogTitle: {
        root: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
    },
    MuiFab: {
        primary: {
            "&:focus": {
                borderColor: theme.palette.primary.light,
                color: theme.essence.palette.common.selectedMenu,
                fill: theme.essence.palette.common.selectedMenu,
            },
            "&:hover": {
                backgroundColor: theme.essence.palette.primary.icon,
                borderColor: theme.palette.primary.light,
                boxShadow: `inset 0 0 2px 2px ${theme.palette.primary.light}`,
            },
            backgroundColor: theme.essence.palette.primary.icon,
        },
        root: {
            "&$disabled": {
                backgroundColor: undefined,
            },
        },
        sizeSmall: {
            fontSize: 24,
            height: 42,
            width: 42,
        },
    },
    MuiIconButton: {
        colorInherit: {
            "&:hover": {
                backgroundColor: "transparent",
            },
        },
        colorPrimary: {
            "&:hover": {
                backgroundColor: "transparent",
            },
        },
        colorSecondary: {
            "&:focus,&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.primary.main,
            },
            color: theme.essence.palette.icon.secondary,
            fill: theme.essence.palette.icon.secondary,
        },
        root: {
            "&$disabled": {
                color: theme.essence.palette.common.disabled,
                fill: theme.essence.palette.common.disabled,
            },
            "&:focus": {
                color: theme.essence.palette.common.selectedMenu,
                fill: theme.essence.palette.common.selectedMenu,
            },
            "&:hover": {
                backgroundColor: "transparent",
            },
            height: 42,
            width: 42,
        },
    },
    MuiPaper: {
        rounded: {
            borderRadius: 4,
        },
    },
    MuiRadio: {
        colorPrimary: {
            "&$checked": {
                color: theme.palette.primary.main,
            },
            color: theme.palette.primary.main,
        },
        root: {
            color: theme.essence.palette.primary.icon,
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
    },
    MuiSwitch: {
        colorSecondary: {
            "&$checked": {
                "& + $bar": {
                    backgroundColor: theme.essence.palette.primary.icon,
                },
                color: theme.essence.palette.primary.icon,
            },
        },
    },
    MuiTableCell: {
        root: {
            borderBottom: "none",
        },
    },
    MuiTableRow: {
        head: {
            height: theme.essence.sizing.gridRowHeight,
        },
    },
    MuiTableSortLabel: {
        root: {
            "&$active": {
                "&& $icon": {
                    color: undefined,
                },

                color: undefined,
            },
        },
    },
});
