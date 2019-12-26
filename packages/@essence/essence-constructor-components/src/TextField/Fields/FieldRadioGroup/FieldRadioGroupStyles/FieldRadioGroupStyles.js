// @flow

// eslint-disable-next-line max-lines-per-function
const FieldRadioGroupStyles = (theme: any) => ({
    disabled: {},
    focused: {},
    formLabel: {
        paddingBottom: 0,
        paddingLeft: 5,
    },
    gridRoot: {
        border: `1px solid ${theme.palette.grey.main}`,
        borderRadius: 3,
        borderTopColor: "transparent",
        display: "flex",
        padding: "4px 0 0",
        position: "relative",
    },
    gridRootError: {
        "& $label": {
            color: theme.palette.error.main,
        },
        borderColor: theme.palette.error.main,
    },
    label: {
        color: theme.palette.text.secondary,
        fontSize: 12,
        left: -1,
        position: "absolute",
        top: -7,
        width: "calc(100% + 2px)",
    },
    labelText: {
        position: "relative",
    },
    labelTextEndAngle: {
        borderRadius: "0 3px 0 0",
        borderRight: `1px solid ${theme.palette.grey.main}`,
        borderTop: `1px solid ${theme.palette.grey.main}`,
        height: 6,
        marginTop: 6,
        minWidth: 16,
    },
    labelTextStartAngle: {
        borderLeft: `1px solid ${theme.palette.grey.main}`,
        borderRadius: "3px 0 0 0",
        borderTop: `1px solid ${theme.palette.grey.main}`,
        height: 6,
        marginTop: 6,
        width: 7,
    },
    labelTextWrapper: {
        overflow: "hidden",
        position: "relative",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    noLabelRender: {
        justifyContent: "center",
    },
    radioRoot: {},
    required: {
        color: theme.palette.error.main,
    },
    root: {
        "&$disabled": {
            backgroundColor: theme.palette.grey.checkbox,
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

export default FieldRadioGroupStyles;
