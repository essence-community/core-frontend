import {ThemeComponents} from "@essence-community/constructor-share/types";

export const getThemeIEComponents = (): ThemeComponents => ({
    MuiDialog: {
        styleOverrides: {
            paper: {
                overflow: "hidden",
            },
        },
    },
    MuiDialogContent: {
        styleOverrides: {
            root: {
                overflowY: "visible",
            },
        },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                display: "block",
            },
        },
    },
    MuiFormControl: {
        styleOverrides: {
            root: {
                display: "flex",
                width: "100%",
            },
        },
    },
    MuiGrid: {
        styleOverrides: {
            // Removed invalid 'grid-xs-12' override - Grids are styled differently in MUI v7
        },
    },
    MuiIconButton: {
        styleOverrides: {
            root: {
                flexShrink: 1,
            },
        },
    },
    MuiInput: {
        styleOverrides: {
            input: {
                flex: "0 1 auto",
            },
        },
    },
}); 