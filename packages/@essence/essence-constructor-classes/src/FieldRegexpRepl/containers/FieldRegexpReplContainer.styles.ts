import {makeStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        example: {
            alignItems: "center",
            display: "flex",
            flexWrap: "nowrap",
            marginTop: theme.spacing(1),
        },
        exampleCheck: {
            color: theme.palette.error.main,
            fill: theme.palette.error.main,
        },
        exampleCheckSuccess: {
            color: green["400"],
            fill: green["400"],
        },
        exampleValue: {
            marginRight: theme.spacing(1),
        },
        iconLeft: {
            borderLeft: `1px solid ${theme.essence.palette.grey.main}`,
        },
        iconRoot: {
            borderRadius: 0,
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
        iconRootSelected: {
            "&:focus": {
                backgroundColor: theme.essence.palette.grey.main,
            },
            "&:hover": {
                backgroundColor: theme.essence.palette.grey.main,
            },
            backgroundColor: theme.essence.palette.grey.main,
            color: theme.palette.primary.main,
        },
        root: {
            display: "flex",
            flexDirection: "column",
        },
    }),
    {name: "EssenceFieldRegexpReplContainer"},
);
