// eslint-disable-next-line max-lines-per-function
export const themeDarkOverrides = (theme) => ({
    EssenceFieldCheckbox: {
        focused: {
            "& $checkboxRoot": {
                color: theme.palette.primary.main,
            },
        },
        root: {
            "&:not($disabled):hover $checkboxRoot": {
                color: theme.palette.primary.light,
            },
        },
    },
    MuiButton: {
        contained: {
            "&$disabled": {
                backgroundColor: "",
            },
        },
        containedPrimary: {
            "&:focus": {
                borderColor: theme.palette.primary.light,
                color: theme.palette.common.selectedMenu,
                fill: theme.palette.common.selectedMenu,
            },
            "&:hover": {
                backgroundColor: theme.palette.primary.icon,
                borderColor: theme.palette.primary.light,
                boxShadow: `inset 0 0 2px 2px ${theme.palette.primary.light}`,
            },
            backgroundColor: theme.palette.primary.icon,
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
    },
    MuiCheckbox: {
        colorPrimary: {
            "&$checked": {
                color: theme.palette.primary.main,
            },
            "&:hover$colorPrimary": {
                color: theme.palette.primary.icon,
            },
            color: theme.palette.primary.main,
        },
        root: {
            "&:hover$root": {
                color: theme.palette.primary.light,
            },
            color: theme.palette.primary.icon,
            height: theme.sizing.gridRowHeight,
            width: theme.sizing.gridRowHeight,
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
                color: theme.palette.common.selectedMenu,
                fill: theme.palette.common.selectedMenu,
            },
            "&:hover": {
                backgroundColor: theme.palette.primary.icon,
                borderColor: theme.palette.primary.light,
                boxShadow: `inset 0 0 2px 2px ${theme.palette.primary.light}`,
            },
            backgroundColor: theme.palette.primary.icon,
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
            color: theme.palette.icon.secondary,
            fill: theme.palette.icon.secondary,
        },
        root: {
            "&$disabled": {
                color: "#7f828d",
                fill: "#7f828d",
            },
            "&:focus": {
                color: theme.palette.common.selectedMenu,
                fill: theme.palette.common.selectedMenu,
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
    MuiPickersModal: {
        dialogAction: {
            color: theme.palette.primary.light,
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
            color: theme.palette.primary.icon,
            height: theme.sizing.gridRowHeight,
            width: theme.sizing.gridRowHeight,
        },
    },
    MuiSwitch: {
        colorSecondary: {
            "&$checked": {
                "& + $bar": {
                    backgroundColor: theme.palette.primary.icon,
                },
                color: theme.palette.primary.icon,
            },
        },
        iconChecked: {
            color: theme.palette.primary.icon,
        },
    },
    MuiTableCell: {
        root: {
            borderBottom: "none",
        },
    },
    MuiTableRow: {
        head: {
            height: theme.sizing.gridRowHeight,
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
