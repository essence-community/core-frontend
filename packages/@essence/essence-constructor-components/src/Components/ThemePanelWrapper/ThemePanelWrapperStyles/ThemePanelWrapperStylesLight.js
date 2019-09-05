// @flow
const ThemePanelWrapperStylesLight = (theme: Object) => ({
    actionsBar: {
        color: theme.palette.primary.main,
        display: "flex",
        fill: theme.palette.primary.main,
        height: 48,
        padding: "0 16px",
    },
    panelEditing: {
        "& $actionsBar": {
            backgroundColor: theme.palette.primary.light,
            borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
        backgroundColor: theme.palette.common.white,
    },
});

export default ThemePanelWrapperStylesLight;
