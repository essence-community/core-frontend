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
                backgroundColor: "#91c9c4",
                borderColor: theme.palette.primary.light,
                boxShadow: `inset 0 0 2px 2px ${theme.palette.primary.light}`,
            },
            backgroundColor: "#91c9c4",
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
        fab: {
            fontSize: 24,
        },
        mini: {
            height: 42,
            width: 42,
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
    MuiTableRow: {
        head: {
            height: theme.sizing.gridRowHeight,
        },
    },
});
