// @flow

const FieldColorPickerStyles = (theme: any) => ({
    checkboxRoot: {},
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
        position: "relative",
        // For correct alignment with the text.
        verticalAlign: "middle",
        width: "100%",
    },
    setInline: {
        justifyContent: "center",
        paddingRight: 10,
    },
});

export default FieldColorPickerStyles;
