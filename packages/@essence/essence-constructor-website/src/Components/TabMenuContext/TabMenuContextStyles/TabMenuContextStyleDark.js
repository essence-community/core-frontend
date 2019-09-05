// @flow
const TabMenuContextStyleDark = (theme: Object) => ({
    listItem: {
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
        "&:last-child": {
            borderBottom: "none",
        },
        borderBottom: `1px solid ${theme.palette.grey.light}`,
        color: theme.palette.text.light,
        cursor: "pointer",
        maxHeight: theme.sizing.gridRowHeight,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    listItemDivider: {
        borderBottomWidth: 2,
    },
    popoverRoot: {
        backgroundColor: theme.palette.primary.main,
    },
});

export default TabMenuContextStyleDark;
