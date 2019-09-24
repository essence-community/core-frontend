import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    (theme) => ({
        content: {
            // @ts-ignore
            border: `1px solid ${theme.palette.grey.main}`,
            borderRadius: "0 0 3px 3px",
            borderTopColor: "transparent",
            padding: theme.spacing(1),
        },
        header: {
            color: theme.palette.text.primary,
            cursor: "pointer",
            /*
             * PaddingLeft: theme.spacing(1),
             * paddingRight: theme.spacing(1),
             */
        },
        headerLeft: {
            // @ts-ignore
            borderLeft: `1px solid ${theme.palette.grey.main}`,
            borderRadius: "3px 0 0 0",
            // @ts-ignore
            borderTop: `1px solid ${theme.palette.grey.main}`,
            margin: "10px 5px -10px 0",
        },
        headerRight: {
            borderRadius: "0 3px 0 0",
            // @ts-ignore
            borderRight: `1px solid ${theme.palette.grey.main}`,
            // @ts-ignore
            borderTop: `1px solid ${theme.palette.grey.main}`,
            margin: "10px 0 -10px 5px",
        },
        iconClear: {
            color: theme.palette.primary.main,
        },
        topLine: {
            // @ts-ignore
            borderTop: `1px solid ${theme.palette.grey.main}`,
            margin: "10px 5px -10px 5px",
        },
    }),
    {name: "EssenceFilterExtended"},
);
