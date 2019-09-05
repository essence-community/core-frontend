const BuilderButtonCollectorStyleDark = (theme) => ({
    iconButtonOpenRoot: {},
    iconButtonRoot: {
        "&$iconButtonOpenRoot": {
            color: theme.palette.common.selectedMenu,
            fill: theme.palette.common.selectedMenu,
        },
    },
    iconButtonWindowOpenRoot: {},
    iconButtonWindowRoot: {
        "&$iconButtonWindowOpenRoot": {
            color: theme.palette.common.selectedMenu,
            fill: theme.palette.common.selectedMenu,
        },
        color: theme.palette.common.white,
        fill: theme.palette.common.white,
    },
    internalIcon: {
        textAlign: "center",
        width: 20,
    },
    listItem: {
        "&:hover, &:focus": {
            backgroundColor: theme.palette.primary.light,
            outline: "none",
        },
        "&:last-child": {
            borderBottom: "none",
        },
        borderBottom: `1px solid ${theme.palette.grey.light}`,
        color: theme.palette.text.light,
        cursor: "pointer",
        fill: theme.palette.text.light,
        maxHeight: theme.sizing.gridRowHeight,
        maxWidth: 500,
        minWidth: 0,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    popoverRoot: {
        backgroundColor: theme.palette.primary.main,
    },
});

export default BuilderButtonCollectorStyleDark;
