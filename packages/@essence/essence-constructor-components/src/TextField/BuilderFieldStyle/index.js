// eslint-disable-next-line max-lines-per-function
const BuilderFieldStyle = (theme) => ({
    clearButton: {
        height: theme.sizing.gridRowHeight,
        visibility: "hidden",
        width: theme.sizing.gridRowHeight,
    },
    error: {},
    eyeButton: {
        "&:focus": {
            color: theme.palette.icon.secondary,
        },
        "&:hover": {
            color: theme.palette.primary.light,
        },
        height: theme.sizing.gridRowHeight,
        width: theme.sizing.gridRowHeight,
    },
    formLabelRoot: {
        display: "flex",
    },
    input: {},
    inputDisable: {},
    inputRoot: {
        "&:hover": {
            "& $clearButton": {
                visibility: "visible",
            },
        },
    },
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
    linkCursorPointer: {
        cursor: "pointer",
    },
    linkInputRoot: {
        "& $formLabelRoot": {
            cursor: "pointer",
        },
        "& $input": {
            cursor: "pointer",
            textDecoration: `underline ${theme.palette.common.link}`,
        },
        "& $inputDisable": {
            pointerEvents: "none",
        },
        cursor: "pointer",
    },
});

export default BuilderFieldStyle;
