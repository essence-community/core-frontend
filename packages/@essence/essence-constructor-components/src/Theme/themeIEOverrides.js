// @flow

export const themeIEOverrides = {
    overrides: {
        MuiDialog: {
            paper: {
                overflow: "hidden",
            },
        },
        MuiDialogContent: {
            root: {
                overflowY: "visible",
            },
        },
        MuiDrawer: {
            paper: {
                display: "block",
            },
        },
        MuiFormControl: {
            root: {
                display: "flex",
                width: "100%",
            },
        },
        MuiGrid: {
            "grid-md": {
                flexBasis: "auto",
            },
            "grid-xs": {
                flexBasis: "auto",
            },
            "grid-xs-12": {
                flexBasis: "auto",
            },
            typeContainer: {
                width: "auto",
            },
        },
        MuiIconButton: {
            root: {
                flexShrink: "1",
            },
        },
        MuiInput: {
            input: {
                flex: "0 1 auto",
            },
        },
    },
};
