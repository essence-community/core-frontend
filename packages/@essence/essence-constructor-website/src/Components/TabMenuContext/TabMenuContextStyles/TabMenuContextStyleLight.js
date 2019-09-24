// @flow
const TabMenuContextStyleLight = (theme: Object) => ({
    listItem: {
        "&:hover": {
            backgroundColor: theme.palette.grey.modal,
        },
        "&:last-child": {
            borderBottom: "none",
        },
        borderBottom: `1px solid ${theme.palette.grey.light}`,
        cursor: "pointer",
        maxHeight: theme.sizing.gridRowHeight,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    listItemDivider: {
        borderBottomWidth: 2,
    },
    popoverRoot: {
        backgroundColor: theme.palette.common.white,
    },
});

export default TabMenuContextStyleLight;
