import transitions from "@material-ui/core/styles/transitions";

export const themeOverridesDefault = (theme) => ({
    MuiBackdrop: {
        root: {
            position: "absolute",
        },
    },
    MuiBadge: {
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
            padding: "8px 4px",
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
            padding: "10px 15px",
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
            height: theme.sizing.gridRowHeight,
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
        disabled: {
            "&:before": {
                display: "none",
            },
            backgroundColor: "#e5e8f4",
            borderColor: "transparent",
            borderRadius: 4,
            color: theme.palette.text.disabled,
        },
        error: {
            border: "1px solid #fc5d40",
        },
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
            },
            color: theme.palette.text.dark,
            height: 16,
            padding: "11px 0 3px 0",
            width: "100%",
        },
        multiline: {
            height: "auto",
            "label + &": {
                paddingBottom: 0,
            },
        },
        root: {
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
            backgroundColor: theme.palette.grey.backgroundInput,
            borderRadius: "0 4px 4px 0",
            maxHeight: theme.sizing.gridRowHeight,
            zIndex: 1,
        },
    },
    MuiInputBase: {
        inputMultiline: {
            overflow: "hidden",
            resize: "vertical",
        },
        root: {
            height: theme.sizing.gridRowHeight,
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
        disabled: {
            pointerEvents: "none",
        },
    },
    MuiModal: {
        root: {
            position: "absolute",
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
        root: {
            "&:not($active) $icon": {
                display: "none",
            },
        },
    },
});
