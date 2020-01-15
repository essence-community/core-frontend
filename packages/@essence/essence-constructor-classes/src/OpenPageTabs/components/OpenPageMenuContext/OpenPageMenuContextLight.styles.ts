import {IEssenceTheme} from "@essence-community/constructor-share";

export default (theme: IEssenceTheme) => ({
    listItem: {
        "&:hover": {
            // @ts-ignore
            backgroundColor: theme.palette.grey.modal,
        },
        "&:last-child": {
            borderBottom: "none",
        },
        borderBottom: `1px solid ${theme.essence.palette.grey.light}`,
        cursor: "pointer",
        maxHeight: theme.essence.sizing.gridRowHeight,
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
