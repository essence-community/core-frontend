// @flow
export const BasePanelCollapsibleDark = (theme: any) => ({
    baseLabelGrid: {
        "&:focus": {
            "& $chevronIcon": {
                color: theme.palette.common.selectedMenu,
            },
            outline: "none",
        },
    },
    chevronIcon: {
        color: theme.palette.common.white,
        margin: "0 15px",
    },
    collapseContainer: {
        width: "100%",
    },
    collapseContent: {
        padding: "12px 0 8px 0",
    },
    editCollapseContainer: {
        backgroundColor: theme.palette.common.white,
        width: "100%",
        zIndex: 4,
    },
    labelGrid: {
        alignItems: "center",
        backgroundColor: theme.palette.primary.light,
        cursor: "pointer",
        display: "flex",
        height: 35,
    },
    labelTypography: {
        alignItems: "center",
        color: theme.palette.common.white,
        display: "flex",
        fontSize: 20,
    },
    root: {
        width: "100%",
    },
});
