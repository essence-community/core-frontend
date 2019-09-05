// @flow

const FieldCheckboxStyles = (theme: any) => ({
    checkboxRoot: {},
    defaultPointerEvents: {
        pointerEvents: "auto",
    },
    disabled: {},
    focused: {},
    formLabel: {
        paddingBottom: 0,
        paddingLeft: 5,
    },
    noLabelRender: {
        justifyContent: "center",
    },
    root: {
        "& $checkboxRoot": {
            height: theme.sizing.gridRowHeight,
            width: theme.sizing.gridRowHeight,
        },
        "&$disabled": {
            backgroundColor: "#e5e8f4",
            border: "none",
            borderRadius: 4,
            color: theme.palette.text.disabled,
            cursor: "default",
        },
        // Remove grey highlight
        WebkitTapHighlightColor: "transparent",
        alignItems: "center",
        backgroundColor: theme.palette.grey.backgroundInput,
        border: `1px solid ${theme.palette.grey.main}`,
        borderRadius: 4,
        cursor: "pointer",
        display: "inline-flex",
        height: theme.sizing.gridRowHeight,
        justifyContent: "space-between",
        // For correct alignment with the text.
        verticalAlign: "middle",
        width: "100%",
    },
    setInline: {
        justifyContent: "center",
        paddingRight: 10,
    },
});

export default FieldCheckboxStyles;
