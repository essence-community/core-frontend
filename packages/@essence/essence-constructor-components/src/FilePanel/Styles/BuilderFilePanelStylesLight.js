// @flow
export const BuilderFilePanelStylesLight = (theme: any) => ({
    actionPanel: {
        paddingLeft: 4,
        paddingTop: 6,
    },
    addButton: {
        "&:hover": {
            backgroundColor: theme.palette.button.background.primary,
        },
        backgroundColor: theme.palette.button.background.primary,
        color: theme.palette.common.white,
    },
    addButtonIcon: {
        marginRight: 4,
    },
    adornment: {
        height: 30,
        width: 50,
        zIndex: 100,
    },
    fileItem: {
        border: `1px solid ${theme.palette.grey.main}`,
        height: 42,
    },
    paperRoot: {},
    srinkedDocLabel: {
        paddingLeft: 56,
    },
});
