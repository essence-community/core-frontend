const BuilderButtonCollectorStyleLight = (theme) => ({
    iconButtonOpenRoot: {},
    iconButtonRoot: {
        "&$iconButtonOpenRoot": {
            borderBottomColor: "transparent",
            borderColor: theme.palette.primary.main,
            borderRadius: "4px 4px 0 0",
        },
        color: theme.palette.primary.main,
        height: 30,
        transition: "background-color 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        width: 30,
    },
    iconButtonWindowOpenRoot: {},
    iconButtonWindowRoot: {
        "&$iconButtonWindowOpenRoot": {
            borderColor: theme.palette.primary.main,
            borderRadius: "0 0 4px 4px",
            borderTopColor: "transparent",
        },
        color: theme.palette.primary.main,
        height: 30,
        transition: "background-color 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        width: 30,
    },
    internalIcon: {
        textAlign: "center",
        width: 20,
    },
    listItem: {
        "&:hover, &:focus": {
            backgroundColor: theme.palette.grey.modal,
            outline: "none",
        },
        "&:last-child": {
            borderBottom: "none",
        },
        borderBottom: `1px solid ${theme.palette.grey.light}`,
        cursor: "pointer",
        maxHeight: theme.sizing.gridRowHeight,
        maxWidth: 500,
        minWidth: 0,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    popoverRoot: {
        "&:before": {
            backgroundColor: theme.palette.primary.main,
            // eslint-disable-next-line quotes
            content: '""',
            height: 2,
            left: 28,
            position: "absolute",
            right: 2,
            top: 0,
        },
        backgroundColor: theme.palette.common.white,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "0 4px 4px 4px",
        borderTop: "none",
        paddingTop: 2,
    },
    popoverWindowRoot: {
        "&:before": {
            bottom: 0,
            top: "auto",
        },
        border: `2px solid ${theme.palette.primary.main}`,
        borderBottom: "none",
        borderRadius: "4px 4px 4px 0",
        borderTop: `2px solid ${theme.palette.primary.main}`,
        boxShadow: "none",
        paddingBottom: 2,
        paddingTop: 0,
    },
});

export default BuilderButtonCollectorStyleLight;
