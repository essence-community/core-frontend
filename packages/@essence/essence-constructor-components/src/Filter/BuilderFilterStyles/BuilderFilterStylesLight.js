// @flow
const BuilderFilterStylesLight = (theme: any) => ({
    filterButtons: {
        "&:after": {
            backgroundColor: theme.palette.primary.main,
            bottom: 0,
            // eslint-disable-next-line quotes
            content: '""',
            height: 2,
            left: 0,
            position: "absolute",
            width: "100%",
        },
        alignItems: "center",
        color: theme.palette.primary.main,
        display: "flex",
        fill: theme.palette.primary.main,
        flexBasis: "auto",
        height: 42,
        position: "relative",
    },
    filterButtonsContainer: {
        "&:before": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
            borderTop: `2px solid ${theme.palette.primary.main}`,
            borderTopRightRadius: 6,
            bottom: -5,
            // eslint-disable-next-line quotes
            content: '""',
            height: 40,
            left: 10,
            position: "absolute",
            transform: "skewX(30deg)",
            width: "100%",
        },
        display: "flex",
        position: "relative",
    },
    filterFields: {
        backgroundColor: theme.palette.grey.light,
    },
    hidden: {
        display: "none",
    },
    titleContainer: {
        display: "inline-flex",
        marginLeft: theme.spacing(3),
        overflow: "hidden",
    },
    titleTypography: {
        color: theme.palette.text.primary,
        fontSize: 22,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
});

export default BuilderFilterStylesLight;
