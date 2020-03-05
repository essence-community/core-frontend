import transitions from "@material-ui/core/styles/transitions";

// eslint-disable-next-line max-lines-per-function
export const themeOverridesDefault = (theme) => ({
    MuiBackdrop: {
        root: {
            position: "absolute",
        },
    },
    MuiBadge: {
        anchorOriginTopRightRectangle: {
            right: 12,
            top: 12,
        },
        badge: {
            pointerEvents: "none",
        },
        colorPrimary: {
            backgroundColor: theme.palette.common.selectedMenu,
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: 5,
            color: theme.palette.common.white,
            height: 20,
            minWidth: 20,
            padding: "0 2px",
            right: 2,
            top: 2,
            width: "auto",
        },
    },
    MuiButton: {
        containedPrimary: {
            border: "2px solid transparent",
            color: theme.palette.common.white,
            fill: theme.palette.common.white,
            padding: "4px 12px",
        },
        containedSecondary: {
            backgroundColor: theme.palette.common.white,
            border: "2px solid transparent",
            color: "#666",
            fill: "#666",
            padding: "4px 12px",
        },
        root: {
            borderRadius: 4,
        },
    },
    MuiCheckbox: {
        colorSecondary: {
            "&$checked": {
                color: theme.palette.primary.field,
            },
        },
    },
    MuiCollapse: {
        entered: {
            overflow: undefined,
        },
    },
    MuiDialog: {
        paper: {
            margin: 32,
        },
    },
    MuiDialogActions: {
        root: {
            margin: 0,
            padding: "4px",
        },
    },
    MuiDialogContent: {
        root: {
            padding: 24,
        },
    },
    MuiDialogTitle: {
        root: {
            borderBottom: "1px solid #5879a9",
            fontSize: 16,
            fontWeight: "bold",
            padding: "4px 10px",
        },
    },
    MuiDrawer: {
        modal: {
            zIndex: theme.zIndex.drawer,
        },
    },
    MuiFormControl: {
        root: {
            borderRadius: 4,
            display: "flex",
            height: theme.essence.sizing.gridRowHeight,
        },
    },
    MuiFormLabel: {
        root: {
            "&$disabled": {
                color: undefined,
            },
            "&$focused": {
                color: "rgba(0, 0, 0, 0.57)",
            },
            fontSize: 17,
            lineHeight: 1.3,
            maxWidth: "100%",
            overflow: "hidden",
            paddingBottom: 0,
            paddingLeft: 5,
            paddingRight: 5,
            pointerEvents: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            zIndex: 1,
        },
    },
    MuiGrid: {
        item: {
            "&:empty": {
                display: "none",
            },
        },
    },
    MuiIconButton: {
        root: {
            boxSizing: "border-box",
            padding: 3,
        },
    },
    MuiInput: {
        formControl: {
            "&:after": {
                display: "none",
            },
            "&:before": {
                display: "none",
            },
            border: "1px solid #cbcaca",
            borderRadius: 4,
            "label + &": {
                marginTop: 0,
                paddingLeft: 5,
                paddingTop: 0,
            },
        },
        input: {
            "&$inputMultiline": {
                paddingBottom: 1,
                paddingTop: 0,
                resize: "none",
            },
            color: theme.palette.text.dark,
            height: 16,
            padding: "11px 0 3px 0",
            width: "100%",
        },
        multiline: {
            alignItems: "flex-start",
            height: "auto",
            "label + &": {
                paddingBottom: 0,
            },
        },
        root: {
            "&$disabled": {
                "&:before": {
                    display: "none",
                },
                backgroundColor: "#e5e8f4",
                borderColor: "transparent",
                borderRadius: 4,
                color: theme.palette.text.disabled,
            },
            "&$error": {
                border: "1px solid #fc5d40",
            },
            backgroundColor: "#fafafa",
            color: theme.palette.text.dark,
            fontSize: 14,
        },
    },
    MuiInputAdornment: {
        positionEnd: {
            marginLeft: 0,
        },
        root: {
            backgroundColor: "transparent",
            borderRadius: "0 4px 4px 0",
            height: theme.essence.sizing.gridRowHeight - 2,
            maxHeight: theme.essence.sizing.gridRowHeight,
            zIndex: 1,
        },
    },
    MuiInputBase: {
        inputMultiline: {
            overflow: "hidden",
            resize: "vertical",
        },
        root: {
            height: theme.essence.sizing.gridRowHeight,
        },
    },
    MuiInputLabel: {
        animated: {
            transition: transitions.create(["transform", "font-size"], {
                duration: transitions.duration.shorter,
                easing: transitions.easing.easeOut,
            }),
        },
        formControl: {
            transform: "translate(0, 4px)",
        },
        shrink: {
            fontSize: 12,
            paddingLeft: 5,
            paddingTop: 0,
            pointerEvents: "auto",
            transform: "translate(0, 0px)",
        },
    },
    MuiListItem: {
        root: {
            "&$disabled": {
                pointerEvents: "none",
            },
        },
    },
    MuiModal: {
        root: {
            position: "absolute",
        },
    },
    MuiSwitch: {
        colorPrimary: {
            "&$checked": {
                "&:hover": {
                    backgroundColor: "transparent",
                },
            },
        },
        colorSecondary: {
            "&$checked": {
                "&:hover": {
                    backgroundColor: "transparent",
                },
            },
        },
        root: {
            height: 30,
            padding: "8px 10px",
        },
        switchBase: {
            "&:hover": {
                backgroundColor: "transparent",
            },
            height: 30,
            width: "auto",
        },
        track: {
            backgroundColor: theme.palette.type === "light" ? theme.palette.common.black : theme.palette.secondary.main,
        },
    },
    MuiTab: {
        root: {
            textAlign: undefined,
        },
    },
    MuiTableCell: {
        root: {
            "&:last-child": {
                paddingRight: 12,
            },
        },
    },
    MuiTableSortLabel: {
        icon: {
            height: 16,
            width: 16,
        },
        root: {
            "&:not($active) $icon": {
                display: "none",
            },
        },
    },
});
