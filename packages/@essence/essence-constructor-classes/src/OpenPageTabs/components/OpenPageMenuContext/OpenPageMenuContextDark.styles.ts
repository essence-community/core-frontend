import {IEssenceTheme} from "@essence-community/constructor-share";

export default (theme: IEssenceTheme) => ({
    listItem: {
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
        "&:last-child": {
            borderBottom: "none",
        },
        borderBottom: `1px solid ${theme.essence.palette.grey.light}`,
        color: theme.essence.palette.text.light,
        cursor: "pointer",
        maxHeight: theme.essence.sizing.gridRowHeight,
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
