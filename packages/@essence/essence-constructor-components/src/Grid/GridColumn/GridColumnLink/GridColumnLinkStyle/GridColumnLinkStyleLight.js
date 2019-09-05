export const GridColumnLinkStyleLight = (theme) => ({
    iconButtonOpentop: {
        "&$iconButtonOpenRoot": {
            borderBottomColor: theme.palette.primary.main,
            borderRadius: "0 0 4px 4px ",
            borderTopColor: "transparent",
        },
    },
    iconButtonRoot: {
        "&$iconButtonOpenRoot": {
            borderBottomColor: "transparent",
            borderColor: theme.palette.primary.main,
            borderRadius: "4px 4px 0 0",
        },
    },
    listItemRoot: {
        "&:hover: &:focus": {
            backgroundColor: theme.palette.grey.modal,
        },
        "&:last-child": {
            borderBottom: "none",
        },
        maxHeight: theme.sizing.gridRowHeight,
    },
    popoverRoot: {
        "&:before": {
            backgroundColor: theme.palette.primary.main,
            // eslint-disable-next-line quotes
            content: '""',
            height: 2,
            left: 28,
            position: "absolute",
            right: 0,
            top: 0,
        },
        backgroundColor: theme.palette.common.white,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "0 4px 4px 4px",
        paddingBottom: 0,
        paddingTop: 2,
    },
    popoverRootOpenTop: {
        "&:before": {
            backgroundColor: theme.palette.primary.main,
            bottom: 0,
            // eslint-disable-next-line quotes
            content: '""',
            height: 2,
            left: 28,
            position: "absolute",
            right: 10,
        },
        backgroundColor: theme.palette.common.white,
        border: `2px solid ${theme.palette.primary.main}`,
        borderBottom: "none",
        borderRadius: "4px 4px 4px 0",
        marginTop: 1,
        paddingBottom: 4,
        paddingTop: 0,
    },
});
