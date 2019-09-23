// @flow
export const BuilderFilePanelStylesDark = (theme: any) => ({
    actionPanel: {
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
        paddingTop: 4,
        width: theme.sizing.controlPanelWidth,
    },
    addButton: {
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    adornment: {
        height: 30,
        width: 50,
        zIndex: 100,
    },
    fileGridItem: {
        padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    },
    fileItem: {
        border: `1px solid ${theme.palette.grey.main}`,
        height: 42,
    },
    paperRoot: {
        overflow: "hidden",
    },
    srinkedDocLabel: {
        paddingLeft: 56,
    },
});
