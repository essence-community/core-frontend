// @flow
export const GridCellStyles = (theme: any) => ({
    "align-center": {
        textAlign: "center",
    },
    "align-right": {
        textAlign: "right",
    },
    body: {
        color: theme.palette.text.primary,
        // eslint-disable-next-line no-magic-numbers
        fontSize: theme.typography.pxToRem(13),
        fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        "& $child": {
            width: 30,
        },
        border: "none",
    },
    child: {
        height: theme.sizing.gridRowHeight,
        width: "inherit",
    },
    "padding-checkbox": {
        "&:last-child": {
            paddingRight: 12,
        },
        padding: "0 12px",
    },
    "padding-dense": {
        paddingRight: 24,
    },
    "padding-none": {
        "&:last-child": {
            padding: 0,
        },
        padding: 0,
    },
    root: {
        "&:last-child": {
            paddingRight: 24,
        },
        overflow: "hidden",
        padding: "4px 56px 4px 24px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
});
