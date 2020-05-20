import {Theme} from "@material-ui/core";

export const getThemeIEOverrides = (): Theme["overrides"] => ({
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
        "grid-xs-12": {
            flexBasis: "auto",
        },
    },
    MuiIconButton: {
        root: {
            flexShrink: 1,
        },
    },
    MuiInput: {
        input: {
            flex: "0 1 auto",
        },
    },
});
