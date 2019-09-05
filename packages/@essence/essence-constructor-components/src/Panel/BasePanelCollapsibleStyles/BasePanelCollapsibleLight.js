// @flow
export const BasePanelCollapsibleLight = (theme: any) => ({
    baseLabelGrid: {
        "&:focus": {
            "& $chevronIcon": {
                borderColor: theme.palette.primary.icon,
            },
            outline: "none",
        },
    },
    chevronIcon: {
        border: "2px solid transparent",
        borderRadius: 4,
        color: theme.palette.primary.light,
        margin: "0 14px",
        padding: "2px 4px",
    },
    closedLabelGrid: {
        "&:before": {
            borderTop: `5px solid ${theme.palette.secondary.light}`,
            bottom: 0,
            content: "''",
            height: 23,
            left: 0,
            position: "absolute",
            right: 0,
            top: "45%",
        },
        alignItems: "center",
        cursor: "pointer",
        display: "flex",
        height: 35,
        paddingLeft: `${theme.spacing.unit * 4}px !important`,
        position: "relative",
    },
    collapseContent: {
        border: `1px solid ${theme.palette.grey.main}`,
        borderTop: "0 !important",
        padding: "8px 0",
    },
    editCollapseContainer: {
        backgroundColor: theme.palette.common.white,
        zIndex: 4,
    },
    labelGrid: {
        "&:before": {
            borderLeft: `1px solid ${theme.palette.grey.main}`,
            borderRight: `1px solid ${theme.palette.grey.main}`,
            borderTop: `5px solid ${theme.palette.secondary.light}`,
            bottom: 0,
            content: "''",
            height: 23,
            left: 0,
            position: "absolute",
            right: 0,
            top: "45%",
        },
        alignItems: "center",
        cursor: "pointer",
        display: "flex",
        height: 35,
        paddingLeft: `${theme.spacing.unit * 4}px !important`,
        position: "relative",
    },
    labelTypography: {
        alignItems: "center",
        backgroundColor: theme.palette.common.white,
        display: "flex",
        fontSize: 14,
        paddingRight: 16,
        zIndex: 1,
    },
});
