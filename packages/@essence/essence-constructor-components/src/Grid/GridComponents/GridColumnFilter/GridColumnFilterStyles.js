const GridColumnFilterStyles = (theme) => ({
    content: {
        alignItems: "center",
        display: "flex",
        padding: theme.spacing.unit / 2,
    },
    contentSearch: {
        color: theme.palette.primary.field,
        paddingRight: theme.spacing.unit,
    },
    popoverWrapper: {
        "&$popoverWrapperDisabled": {
            pointerEvents: "none",
            visibility: "hidden",
        },
        "&$popoverWrapperFilled": {
            backgroundColor: theme.palette.common.selectedRecord,
            visibility: "visible",
        },
        "&$popoverWrapperOpen": {
            backgroundColor: theme.palette.common.selectedRecord,
            visibility: "visible",
        },
        "&:hover": {
            backgroundColor: theme.palette.common.selectedRecord,
        },
        alignItems: "center",
        cursor: "pointer",
        display: "flex",
        height: "100%",
        padding: `0 ${theme.spacing.unit / 2}px`,
    },
    popoverWrapperDisabled: {},
    popoverWrapperFilled: {},
    popoverWrapperOpen: {},
});

export default GridColumnFilterStyles;
