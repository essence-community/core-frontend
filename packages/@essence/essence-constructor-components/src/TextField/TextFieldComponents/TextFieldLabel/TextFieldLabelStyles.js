const TextFieldLabelStyles = (theme) => ({
    error: {},
    labelAsterisk: {
        "&$error": {
            color: theme.palette.error.main,
        },
        color: theme.palette.error.main,
    },
    labelError: {},
    lableCircle: {
        color: theme.palette.text.secondary,
        fill: theme.palette.text.secondary,
    },
    lableRoot: {
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
});

export default TextFieldLabelStyles;
