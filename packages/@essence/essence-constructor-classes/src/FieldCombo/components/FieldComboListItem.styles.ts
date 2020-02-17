import {makeStyles} from "@material-ui/core/styles";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        menuItem: {
            borderBottom: `1px solid ${theme.essence.palette.grey.main}`,
            height: 35,
            minHeight: 35,
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
