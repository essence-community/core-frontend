// @flow
const EmptyTitleStylesLight = (theme: any) => ({
    titleContainer: {
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
        "&:before": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
            borderTop: `2px solid ${theme.palette.primary.main}`,
            borderTopRightRadius: 6,
            bottom: 2,
            // eslint-disable-next-line quotes
            content: '""',
            height: 40,
            left: 10,
            position: "absolute",
            transform: "skewX(30deg)",
            width: 12,
        },
        height: 42,
        position: "relative",
    },
    titleTypography: {
        fontSize: 22,
        lineHeight: "42px",
        marginLeft: 35,
    },
});

export default EmptyTitleStylesLight;
