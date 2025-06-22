import {IEssenceTheme, ThemeComponents} from "@essence-community/constructor-share/types";

// eslint-disable-next-line max-lines-per-function
export const getThemeComponentsDefault = (theme: IEssenceTheme): ThemeComponents => ({
    MuiBackdrop: {
        styleOverrides: {
            root: {
                position: "absolute",
            },
        },
    },
    MuiBadge: {
        styleOverrides: {
            anchorOriginTopRightRectangular: {
                right: 12,
                top: 12,
            },
            badge: {
                pointerEvents: "none",
            },
            colorPrimary: {
                backgroundColor: theme.essence.palette.common.selectedMenu,
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
    },
    MuiButton: {
        styleOverrides: {
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
    },
    MuiCheckbox: {
        styleOverrides: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: theme.essence.palette.primary.field,
                },
            },
        },
    },
    MuiCollapse: {
        styleOverrides: {
            entered: {
                overflow: undefined,
            },
        },
    },
    MuiDialog: {
        styleOverrides: {
            paper: {
                margin: 32,
            },
        },
    },
    MuiDialogActions: {
        styleOverrides: {
            root: {
                margin: 0,
                padding: "4px",
            },
        },
    },
    MuiDialogContent: {
        styleOverrides: {
            root: {
                padding: 24,
            },
        },
    },
    MuiDialogTitle: {
        styleOverrides: {
            root: {
                borderBottom: "1px solid #5879a9",
                fontSize: 16,
                fontWeight: "bold",
                padding: "4px 10px",
            },
        },
    },
    MuiDrawer: {
        styleOverrides: {
            modal: {
                zIndex: theme.zIndex.drawer,
            },
        },
    },
    MuiFormControl: {
        styleOverrides: {
            root: {
                borderRadius: 4,
                display: "flex",
                height: theme.essence.sizing.gridRowHeight,
            },
        },
    },
    MuiFormLabel: {
        styleOverrides: {
            root: {
                "&.Mui-disabled": {
                    color: undefined,
                },
                "&.Mui-focused": {
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
    },
    MuiGrid: {
        styleOverrides: {
            // Removed invalid 'item' override - Grids are styled differently in MUI v7
        },
    },
    MuiIconButton: {
        styleOverrides: {
            root: {
                boxSizing: "border-box",
                padding: 3,
            },
        },
    },
    MuiInput: {
        styleOverrides: {
            formControl: {
                "&:after": {
                    display: "none",
                },
                "&:before": {
                    display: "none",
                },
                border: `1px solid ${theme.essence.palette.grey.main}`,
                borderRadius: 4,
                "label + &": {
                    marginTop: 0,
                    paddingLeft: 5,
                    paddingTop: 0,
                },
            },
            input: {
                "&.MuiInputBase-inputMultiline": {
                    paddingBottom: 1,
                    paddingTop: 0,
                    resize: "none",
                },
                color: theme.essence.palette.text.dark,
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
                "&.Mui-disabled": {
                    "&:before": {
                        display: "none",
                    },
                    backgroundColor: "#e5e8f4",
                    borderColor: "transparent",
                    borderRadius: 4,
                    color: theme.palette.text.disabled,
                },
                "&.Mui-error": {
                    border: "1px solid #fc5d40",
                },
                backgroundColor: "#fafafa",
                color: theme.essence.palette.text.dark,
                fontSize: 14,
            },
        },
    },
    MuiInputAdornment: {
        styleOverrides: {
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
    },
    MuiInputBase: {
        styleOverrides: {
            inputMultiline: {
                overflow: "hidden",
                resize: "vertical",
            },
            root: {
                height: theme.essence.sizing.gridRowHeight,
            },
        },
    },
    MuiInputLabel: {
        styleOverrides: {
            animated: {
                transition: theme.transitions.create(["transform", "font-size"], {
                    duration: theme.transitions.duration.shorter,
                    easing: theme.transitions.easing.easeOut,
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
    },
    MuiListItem: {
        styleOverrides: {
            root: {
                "&.Mui-disabled": {
                    pointerEvents: "none",
                },
            },
        },
    },
    MuiSwitch: {
        styleOverrides: {
            colorPrimary: {
                "&.Mui-checked": {
                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                },
            },
            colorSecondary: {
                "&.Mui-checked": {
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
                backgroundColor:
                    theme.essence.layoutTheme === 1 ? theme.palette.common.black : theme.palette.secondary.main,
            },
        },
    },
    MuiTab: {
        styleOverrides: {
            root: {
                textAlign: undefined,
            },
        },
    },
    MuiTableCell: {
        styleOverrides: {
            root: {
                "&:last-child": {
                    paddingRight: 12,
                },
            },
        },
    },
    MuiTableSortLabel: {
        styleOverrides: {
            icon: {
                height: 16,
                width: 16,
            },
            root: {
                "&:not(.Mui-active) .MuiTableSortLabel-icon": {
                    display: "none",
                },
            },
        },
    },
}); 