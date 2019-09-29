import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    (theme) => ({
        loader: {
            left: "calc(50% - 20px)",
            position: "absolute",
            top: "calc(50% - 20px)",
        },
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
        paginationMenuItem: {
            "&:hover": {
                backgroundColor: "inherit",
            },
            alignItems: "center",
            display: "flex",
            height: 10,
            justifyContent: "center",
        },
        paper: {
            // @ts-ignore
            borderBottom: `1px solid ${theme.palette.grey.main}`,
            // @ts-ignore
            borderLeft: `1px solid ${theme.palette.grey.main}`,
            // @ts-ignore
            borderRight: `1px solid ${theme.palette.grey.main}`,
        },
    }),
    {name: "EssenceFieldComboList"},
);
