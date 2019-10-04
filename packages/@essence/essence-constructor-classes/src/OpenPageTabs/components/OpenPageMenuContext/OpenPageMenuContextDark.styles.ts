import {IEssenceTheme} from "@essence/essence-constructor-share";

export default (theme: IEssenceTheme) => ({
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
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    listItemDivider: {
        borderBottomWidth: 2,
    },
    popoverRoot: {
        backgroundColor: theme.palette.primary.main,
    },
});
