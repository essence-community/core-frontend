export const GridColumnLinkStyleDark = (theme) => ({
    iconButtonOpentop: {
        "&$iconButtonOpenRoot": {
            borderBottom: "none",
            borderRadius: "0 0 4px 4px ",
            borderTop: `1px solid ${theme.palette.common.white}`,
            zIndex: 3,
        },
    },
    iconButtonRoot: {
        "&$iconButtonOpenRoot": {
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            },
            backgroundColor: theme.palette.primary.main,
            borderBottom: `1px solid ${theme.palette.common.white}`,
            borderRadius: "4px 4px 0 0",
            color: theme.palette.common.white,
            zIndex: 3,
        },
    },
    listItemRoot: {
        "&:hover, &:focus": {
            backgroundColor: theme.palette.primary.light,
        },
        "&:last-child": {
            borderBottom: "none",
        },
        borderBottom: `1px solid ${theme.palette.common.white}`,
        maxHeight: theme.sizing.gridRowHeight,
    },
    popoverRoot: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0 4px 4px 4px",
        color: theme.palette.common.white,
    },
    popoverRootOpenTop: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "4px 4px 4px 0",
        color: theme.palette.common.white,
        overflow: "hidden",
    },
});
