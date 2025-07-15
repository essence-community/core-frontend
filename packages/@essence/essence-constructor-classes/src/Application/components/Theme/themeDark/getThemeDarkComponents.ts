import {IEssenceTheme, ThemeComponents} from "@essence-community/constructor-share/types";

// eslint-disable-next-line max-lines-per-function
export const getThemeDarkComponents = (theme: IEssenceTheme): ThemeComponents => ({
    MuiButton: {
        styleOverrides: {
            contained: {
                "&.Mui-disabled": {
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
                "&.Mui-disabled": {
                    color: theme.essence.palette.common.disabled,
                    fill: theme.essence.palette.common.disabled,
                },
            },
        },
    },
    MuiCheckbox: {
        styleOverrides: {
            colorPrimary: {
                "&.Mui-checked": {
                    color: theme.palette.primary.main,
                },
                "&:hover": {
                    color: theme.essence.palette.primary.icon,
                },
                color: theme.palette.primary.main,
            },
            root: {
                "&:hover": {
                    color: theme.palette.primary.light,
                },
                color: theme.essence.palette.primary.icon,
                height: theme.essence.sizing.gridRowHeight,
                width: theme.essence.sizing.gridRowHeight,
            },
        },
    },
    MuiDialogActions: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.primary.main,
            },
        },
    },
    MuiDialogTitle: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
            },
        },
    },
    MuiFab: {
        styleOverrides: {
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
                "&.Mui-disabled": {
                    backgroundColor: undefined,
                },
            },
            sizeSmall: {
                fontSize: 24,
                height: 42,
                width: 42,
            },
        },
    },
    MuiIconButton: {
        styleOverrides: {
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
                "&.Mui-disabled": {
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
    },
    MuiPaper: {
        styleOverrides: {
            rounded: {
                borderRadius: 4,
            },
        },
    },
    MuiRadio: {
        styleOverrides: {
            colorPrimary: {
                "&.Mui-checked": {
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
    },
    MuiSwitch: {
        styleOverrides: {
            colorSecondary: {
                "&.Mui-checked": {
                    "& + .MuiSwitch-track": {
                        backgroundColor: theme.essence.palette.primary.icon,
                    },
                    color: theme.essence.palette.primary.icon,
                },
            },
        },
    },
    MuiTableCell: {
        styleOverrides: {
            root: {
                borderBottom: "none",
            },
        },
    },
    MuiTableRow: {
        styleOverrides: {
            head: {
                height: theme.essence.sizing.gridRowHeight,
            },
        },
    },
    MuiTableSortLabel: {
        styleOverrides: {
            root: {
                "&.Mui-active": {
                    "& .MuiTableSortLabel-icon": {
                        color: undefined,
                    },
                    color: undefined,
                },
            },
        },
    },
}); 