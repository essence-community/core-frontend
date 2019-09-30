import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    (theme) => ({
        menuItem: {
            // @ts-ignore
            borderBottom: `1px solid ${theme.palette.grey.main}`,
            height: 34,
            minHeight: 34,
            paddingBottom: 0,
            paddingTop: 0,
        },
        menuItemLabel: {
            display: "inline-block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
        },
        menuItemSelectedCheck: {
            display: "inline-block",
        },
        menuItemSelectedLabel: {
            fontWeight: 600,
        },
    }),
    {name: "EssenceFieldComboListItem"},
);
