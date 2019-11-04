// @flow
export const FieldTextareaInputStyles = (theme: any) => ({
    resizer: {
        "&::after": {
            borderRight: `2px solid ${theme.essence.palette.grey.main}`,
            bottom: 0,
            // eslint-disable-next-line quotes
            content: '""',
            left: 0,
            position: "absolute",
            right: 0,
            top: 10,
            transform: "skew(-45deg)",
        },
        "&::before": {
            borderRight: `2px solid ${theme.essence.palette.grey.main}`,
            bottom: 0,
            // eslint-disable-next-line quotes
            content: '""',
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
            transform: "skew(-45deg)",
        },
        backgroundColor: "transparent",
        border: "none",
        bottom: 0,
        height: 20,
        overflow: "hidden",
        position: "absolute",
        right: 0,
        width: 20,
    },
});
