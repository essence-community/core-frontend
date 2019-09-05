// @flow
export const BaseGridRowStyles = (theme: Object) => ({
    autoStripe: {
        "&:nth-of-type(even)": {
            backgroundColor: theme.palette.common.stripeRecord,
        },
    },
    indexStripe: {
        backgroundColor: theme.palette.common.stripeRecord,
    },
    root: {
        color: "inherit",
        display: "table-row",
        height: theme.sizing.gridRowHeight,
        // We disable the focus ring for mouse, touch and keyboard users.
        outline: "none",
        verticalAlign: "middle",
    },
    /* Styles applied to the root element if `selected={true}`. */
    selected: {},
    selectedDetail: {},
    selectedDetailExpanded: {},
});
